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
	"gorm.io/gorm"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := database.Getdb()
	var user *model.User
	err1 := db.Model(user).Where("email LIKE ?", input.Email).Take(&user).Error
	if err1 == gorm.ErrRecordNotFound {
		user = &model.User{
			ID:                 uuid.NewString(),
			Email:              input.Email,
			Firstname:          "",
			Lastname:           "",
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

		// panic(fmt.Errorf("not implemented: CreateUser - createUser"))
		return user, err
	}

	return nil, gqlerror.Errorf("Email has been registered")
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.NewUser, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateUser - updateUser"))
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
	panic(fmt.Errorf("not implemented: Users - users"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
