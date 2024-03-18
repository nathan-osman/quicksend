package server

import (
	"net"
	"net/http"
	"strconv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/nathan-osman/quicksend/db"

	mail "github.com/xhit/go-simple-mail/v2"
)

func (s *Server) apiTest(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

type apiLoginParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *Server) apiLogin(c *gin.Context) {
	v := &apiLoginParams{}
	if err := c.ShouldBindJSON(v); err != nil {
		panic(err)
	}
	u := &db.User{}
	if err := s.conn.Where("email = ?", v.Email).First(u).Error; err != nil {
		panic(err)
	}
	if err := u.Authenticate(v.Password); err != nil {
		panic(err)
	}
	session := sessions.Default(c)
	session.Set(sessionKeyUserID, u.ID)
	if err := session.Save(); err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

func (s *Server) apiLogout(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete(sessionKeyUserID)
	if err := session.Save(); err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

func (s *Server) apiHosts(c *gin.Context) {
	v := []*db.Host{}
	if err := s.conn.Find(&v).Error; err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, v)
}

type apiHostsCreateParams struct {
	Name string `json:"name"`
	Addr string `json:"addr"`
}

func (s *Server) apiHostsCreate(c *gin.Context) {
	v := &apiHostsCreateParams{}
	if err := c.ShouldBindJSON(v); err != nil {
		panic(err)
	}
	h := &db.Host{
		Name: v.Name,
		Addr: v.Addr,
	}
	if err := s.conn.Save(h).Error; err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}

type apiSendParams struct {
	To      []string `json:"to"`
	From    string   `json:"from"`
	Subject string   `json:"subject"`
	Text    string   `json:"text"`
	Html    string   `json:"html"`
}

func (s *Server) apiSend(c *gin.Context) {
	v := &apiSendParams{}
	if err := c.ShouldBindJSON(v); err != nil {
		panic(err)
	}
	host, portStr, err := net.SplitHostPort(s.smtpAddr)
	if err != nil {
		panic(err)
	}
	port, err := strconv.Atoi(portStr)
	if err != nil {
		panic(err)
	}
	server := mail.NewSMTPClient()
	server.Host = host
	server.Port = port
	smtpClient, err := server.Connect()
	if err != nil {
		panic(err)
	}
	defer smtpClient.Close()
	email := mail.NewMSG()
	email.
		AddTo(v.To...).
		SetFrom(v.From).
		SetSubject(v.Subject).
		SetBody(mail.TextPlain, v.Text).
		AddAlternative(mail.TextHTML, v.Html)
	if email.Error != nil {
		panic(email.Error)
	}
	if err := email.Send(smtpClient); err != nil {
		panic(err)
	}
	c.Status(http.StatusNoContent)
}
