package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nathan-osman/quicksend/server"
	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "quicksend",
		Usage: "Simple web-based application for sending test emails",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "secret-key",
				EnvVars: []string{"SECRET_KEY"},
				Usage:   "secret key for encoding cookies",
			},
			&cli.StringFlag{
				Name:    "server-addr",
				Value:   ":http",
				EnvVars: []string{"SERVER_ADDR"},
				Usage:   "HTTP address to listen on",
			},
			&cli.StringFlag{
				Name:    "smtp-addr",
				Value:   ":smtp",
				EnvVars: []string{"SMTP_ADDR"},
				Usage:   "address of SMTP server to use for sending mail",
			},
		},
		Action: func(c *cli.Context) error {

			// Create the server
			s, err := server.New(
				c.String("secret-key"),
				c.String("server-addr"),
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
