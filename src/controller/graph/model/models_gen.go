// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Comment struct {
	ID        string `json:"id"`
	Userid    string `json:"userid"`
	Postid    string `json:"postid"`
	Repliedto string `json:"repliedto"`
	Text      string `json:"text"`
}

type LikedPost struct {
	Postid string `json:"postid"`
	Userid string `json:"userid"`
}

type NewComment struct {
	Userid    string `json:"userid"`
	Postid    string `json:"postid"`
	Repliedto string `json:"repliedto"`
	Text      string `json:"text"`
}

type NewPost struct {
	Userid string `json:"userid"`
	Text   string `json:"text"`
	Link   string `json:"link"`
}

type NewUser struct {
	Email              string `json:"email"`
	Firstname          string `json:"firstname"`
	Lastname           string `json:"lastname"`
	Password           string `json:"password"`
	Profilephotourl    string `json:"profilephotourl"`
	Backgroundphotourl string `json:"backgroundphotourl"`
	Headline           string `json:"headline"`
	Pronouns           string `json:"pronouns"`
	Profilelink        string `json:"profilelink"`
	About              string `json:"about"`
	Location           string `json:"location"`
	Isactive           bool   `json:"isactive"`
}

type Post struct {
	ID     string `json:"id"`
	Userid string `json:"userid"`
	Text   string `json:"text"`
	Link   string `json:"link"`
}

type PostLiked struct {
	Postid string `json:"postid"`
	Userid string `json:"userid"`
}

type User struct {
	ID                 string `json:"id"`
	Email              string `json:"email"`
	Firstname          string `json:"firstname"`
	Lastname           string `json:"lastname"`
	Password           string `json:"password"`
	Profilephotourl    string `json:"profilephotourl"`
	Backgroundphotourl string `json:"backgroundphotourl"`
	Headline           string `json:"headline"`
	Pronouns           string `json:"pronouns"`
	Profilelink        string `json:"profilelink"`
	About              string `json:"about"`
	Location           string `json:"location"`
	Isactive           bool   `json:"isactive"`
}
