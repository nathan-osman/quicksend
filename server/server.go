package server

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/nathan-osman/quicksend/db"
	"github.com/nathan-osman/quicksend/server/ui"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type Server struct {
	server   http.Server
	logger   zerolog.Logger
	smtpAddr string
	conn     *db.Conn
}

func init() {
	// Switch Gin to release mode
	gin.SetMode(gin.ReleaseMode)
}

func New(secretKey, serverAddr, smtpAddr string, conn *db.Conn) (*Server, error) {

	// Initialize the server
	var (
		r = gin.New()
		s = &Server{
			server: http.Server{
				Addr:    serverAddr,
				Handler: r,
			},
			logger:   log.With().Str("package", "server").Logger(),
			smtpAddr: smtpAddr,
			conn:     conn,
		}
		store = cookie.NewStore([]byte(secretKey))
	)

	// Prepare to use cookies for session
	store.Options(sessions.Options{
		Path:     "/",
		HttpOnly: true,
	})

	// Serve the static files from /admin
	r.StaticFS("/", ui.EmbedFileSystem{
		FileSystem: http.FS(ui.Content),
	})

	// Listen for connections in a separate goroutine
	go func() {
		defer s.logger.Info().Msg("server stopped")
		s.logger.Info().Msg("server started")
		if err := s.server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			s.logger.Error().Msg(err.Error())
		}
	}()

	return s, nil
}

func (s *Server) Close() {
	s.server.Shutdown(context.Background())
}
