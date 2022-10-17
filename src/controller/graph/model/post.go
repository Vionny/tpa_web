package model

type Post struct {
	ID     string `json:"id"`
	Userid string `json:"userid"`
	Text   string `json:"text"`
	Link   string `json:"link"`
	Type   string `json:"type"`
	Share  int    `json:"share"`
}
