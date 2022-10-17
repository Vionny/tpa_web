// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Comment struct {
	ID        string `json:"id"`
	Userid    string `json:"userid"`
	Postid    string `json:"postid"`
	Repliedto string `json:"repliedto"`
	Text      string `json:"text"`
}

type Education struct {
	ID          string  `json:"id"`
	UserID      string  `json:"userID"`
	Institution string  `json:"institution"`
	Degree      string  `json:"degree"`
	Field       string  `json:"field"`
	Grade       float64 `json:"grade"`
	IsActive    bool    `json:"isActive"`
	StartYear   int     `json:"startYear"`
	EndYear     int     `json:"endYear"`
	Activities  string  `json:"activities"`
	Desc        string  `json:"desc"`
}

type Experience struct {
	ID        string `json:"id"`
	UserID    string `json:"userID"`
	Title     string `json:"title"`
	Type      string `json:"type"`
	Company   string `json:"company"`
	Country   string `json:"country"`
	IsActive  bool   `json:"isActive"`
	StartYear int    `json:"startYear"`
	EndYear   int    `json:"endYear"`
}

type InputEducation struct {
	UserID      string  `json:"userID"`
	Institution string  `json:"institution"`
	Degree      string  `json:"degree"`
	Field       string  `json:"field"`
	Grade       float64 `json:"grade"`
	IsActive    bool    `json:"isActive"`
	StartYear   int     `json:"startYear"`
	EndYear     int     `json:"endYear"`
	Activities  string  `json:"activities"`
	Desc        string  `json:"desc"`
}

type InputExperience struct {
	UserID    string `json:"userID"`
	Title     string `json:"title"`
	Type      string `json:"type"`
	Company   string `json:"company"`
	Country   string `json:"country"`
	IsActive  bool   `json:"isActive"`
	StartYear int    `json:"startYear"`
	EndYear   int    `json:"endYear"`
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
	Type   string `json:"type"`
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

type PostLiked struct {
	Postid string `json:"postid"`
	Userid string `json:"userid"`
}

type Search struct {
	Users []*User `json:"Users"`
	Posts []*Post `json:"Posts"`
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
	ResetID            string `json:"reset_id"`
}
