package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/database"
	"backend/graph/generated"
	"backend/graph/model"
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	gomail "gopkg.in/gomail.v2"
	"gorm.io/gorm"
)

// CreateComment is the resolver for the createComment field.
func (r *mutationResolver) CreateComment(ctx context.Context, input model.NewComment) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented: CreateComment - createComment"))
}

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model.Post, error) {

	var post *model.Post
	post = &model.Post{
		ID:     uuid.NewString(),
		Userid: input.Userid,
		Text:   input.Text,
		Link:   input.Link,
	}
	err := r.DB.Create(post).Error
	return post, err

}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := database.Getdb()
	var user *model.User
	err1 := db.Model(user).Where("email LIKE ?", input.Email).Take(&user).Error
	if err1 == gorm.ErrRecordNotFound {
		user = &model.User{
			ID:                 uuid.NewString(),
			Email:              input.Email,
			Firstname:          input.Firstname,
			Lastname:           input.Lastname,
			Password:           input.Password,
			Profilephotourl:    "",
			Backgroundphotourl: "",
			Headline:           "",
			Pronouns:           "",
			Profilelink:        "",
			About:              "",
			Location:           "",
			Isactive:           false,
		}

		err := r.DB.Create(user).Error
		// panic(user.ID)
		msg := gomail.NewMessage()
		msg.SetHeader("From", "senvionny@gmail.com")
		msg.SetHeader("To", input.Email)
		msg.SetHeader("Subject", "LinkHEdIn Activation Email")
		msg.SetBody("text/html", "Please activate your email here http://127.0.0.1:5173/activate-account/"+user.ID)

		n := gomail.NewDialer("smtp.gmail.com", 587, "senvionny@gmail.com", "tbtycpogxgqrygce")

		// Send the email
		if err := n.DialAndSend(msg); err != nil {
			return user, err
		}

		// panic(fmt.Errorf("not implemented: CreateUser - createUser"))
		return user, err
	}

	return nil, gqlerror.Errorf("Email has been registered")
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.NewUser, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateUser - updateUser"))
}

// InputLike is the resolver for the inputLike field.
func (r *mutationResolver) InputLike(ctx context.Context, input model.PostLiked) (*model.LikedPost, error) {
	panic(fmt.Errorf("not implemented: InputLike - inputLike"))
}

// ActivateAccount is the resolver for the activateAccount field.
func (r *mutationResolver) ActivateAccount(ctx context.Context, id string) (*model.User, error) {
	db := database.Getdb()
	user := &model.User{}
	err1 := db.Model(user).Where("id LIKE ?", id).Take(&user).Error
	if err1 != nil {
		return nil, gqlerror.Errorf("not found")
	}

	err := db.Model(&user).Where("id = ?", id).Update("isactive", true).Error

	return user, err
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: DeleteUser - deleteUser"))
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.User, error) {
	// panic(fmt.Errorf("not implemented: Login - login"))
	db := database.Getdb()
	var user *model.User

	err := db.Where("email = ?", email).Where("password=?", password).Find(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	err := r.DB.Find(&users).Error

	return users, err
}

// GetCurrentUser is the resolver for the getCurrentUser field.
func (r *queryResolver) GetCurrentUser(ctx context.Context, id string) (*model.User, error) {
	db := database.Getdb()
	var user *model.User

	err := db.Where("id = ?", id).Find(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) GetCurrentUser(ctx context.Context, id string) (*model.User, error) {
	db := database.Getdb()
	var user *model.User

	err := db.Where("id = ?", id).Find(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}
