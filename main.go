package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nathan-osman/quicksend/db"
	"github.com/nathan-osman/quicksend/server"
	"github.com/urfave/cli/v2"
	"golang.org/x/term"
)

type contextVal string

const contextDB contextVal = "db"

func main() {
	app := &cli.App{
		Name:  "quicksend",
		Usage: "Simple web-based application for sending test emails",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "data-dir",
				EnvVars: []string{"DATA_DIR"},
				Usage:   "path to data directory",
			},
			&cli.StringFlag{
				Name:    "secret-key",
				EnvVars: []string{"SECRET_KEY"},
				Usage:   "secret key for encoding cookies",
			},
			&cli.StringFlag{
				Name:    "server-addr",
				Value:   ":8000",
				EnvVars: []string{"SERVER_ADDR"},
				Usage:   "HTTP address to listen on",
			},
			&cli.StringFlag{
				Name:    "smtp-addr",
				Value:   "localhost:25",
				EnvVars: []string{"SMTP_ADDR"},
				Usage:   "address of SMTP server to use for sending mail",
			},
		},
		Before: func(c *cli.Context) error {
			conn, err := db.New(c.String("data-dir"))
			c.Context = context.WithValue(c.Context, contextDB, conn)
			return err
		},
		After: func(c *cli.Context) error {
			c.Context.Value(contextDB).(*db.Conn).Close()
			return nil
		},
		Commands: []*cli.Command{
			{
				Name:  "createuser",
				Usage: "create a new user account",
				Action: func(c *cli.Context) error {

					// Grab the database and prepare to create a new user
					var (
						conn = c.Context.Value(contextDB).(*db.Conn)
						u    = &db.User{}
					)

					// Prompt for the email
					fmt.Print("Email? ")
					fmt.Scanln(&u.Email)

					// Prompt for the password, hiding the input
					fmt.Print("Password? ")
					p, err := term.ReadPassword(int(syscall.Stdin))
					if err != nil {
						return err
					}
					if err := u.SetPassword(string(p)); err != nil {
						return err
					}

					// Create the user
					if err := conn.Save(u).Error; err != nil {
						return err
					}

					fmt.Println()
					fmt.Println("New user created successfully!")

					return nil
				},
			},
		},
		Action: func(c *cli.Context) error {

			// Grab the database
			conn := c.Context.Value(contextDB).(*db.Conn)

			// Create the server
			s, err := server.New(
				c.String("secret-key"),
				c.String("server-addr"),
				c.String("smtp-addr"),
				conn,
			)
			if err != nil {
				return err
			}
			defer s.Close()

			// Wait for SIGINT or SIGTERM
			sigChan := make(chan os.Signal, 1)
			signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
			<-sigChan

			return nil
		},
	}
	if err := app.Run(os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "fatal: %s\n", err.Error())
	}
}
