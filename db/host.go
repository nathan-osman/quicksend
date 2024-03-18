package db

// Host represents an SMTP server that can send email.
type Host struct {
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null" json:"name"`
	Addr string `gorm:"not null" json:"addr"`
}
