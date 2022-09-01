package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db_gorm *gorm.DB

func Getdb() *gorm.DB {

	if db_gorm == nil {
		dsn := "host=localhost user=postgres password=postgres dbname=linkhedin port=5000 sslmode=disable TimeZone=Asia/Shanghai"
		db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

		if err != nil {
			panic(err)
		} else {
			db_gorm = db
		}
	}
	return db_gorm
}
