package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/database"
	"backend/graph/generated"
	"backend/graph/model"
	"context"
	"fmt"
	"log"

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
		Type:   input.Type,
		Share:  0,
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

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, input model.InputExperience) (*model.Experience, error) {
	expe := &model.Experience{
		ID:        uuid.NewString(),
		UserID:    input.UserID,
		Title:     input.Title,
		Type:      input.Type,
		Company:   input.Company,
		Country:   input.Country,
		IsActive:  input.IsActive,
		StartYear: input.StartYear,
		EndYear:   input.EndYear,
	}
	err := r.DB.Create(expe).Error
	if err != nil {
		return nil, err
	}
	return expe, nil
}

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.InputEducation) (*model.Education, error) {
	edu := &model.Education{
		ID:          uuid.NewString(),
		UserID:      input.UserID,
		Institution: input.Institution,
		Degree:      input.Degree,
		Field:       input.Field,
		Grade:       input.Grade,
		IsActive:    input.IsActive,
		StartYear:   input.StartYear,
		EndYear:     input.EndYear,
		Activities:  input.Activities,
		Desc:        input.Desc,
	}
	err := r.DB.Create(edu).Error
	if err != nil {
		return nil, err
	}
	return edu, nil
}

// GoogleUser is the resolver for the googleUser field.
func (r *mutationResolver) GoogleUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := database.Getdb()
	var user *model.User
	log.Println(input.Email)
	err1 := db.Model(user).Where("email LIKE ?", input.Email).First(&user).Error
	log.Println(user)
	if err1 == gorm.ErrRecordNotFound {
		user = &model.User{
			ID:                 uuid.NewString(),
			Email:              input.Email,
			Firstname:          input.Firstname,
			Lastname:           input.Lastname,
			Password:           input.Password,
			Profilephotourl:    input.Profilephotourl,
			Backgroundphotourl: "",
			Headline:           "",
			Pronouns:           "",
			Profilelink:        "",
			About:              "",
			Location:           "",
			Isactive:           true,
		}
		err := r.DB.Create(user).Error
		if err != nil {
			return nil, err
		}
		return user, nil
	}

	return user, err1
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.NewUser, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateUser - updateUser"))
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, input model.InputExperience, id string) (*model.Experience, error) {
	panic(fmt.Errorf("not implemented: UpdateExperience - updateExperience"))
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, input model.InputEducation, id string) (*model.Education, error) {
	panic(fmt.Errorf("not implemented: UpdateEducation - updateEducation"))
}

// ChangePassword is the resolver for the changePassword field.
func (r *mutationResolver) ChangePassword(ctx context.Context, id string, password string) (*model.User, error) {
	db := database.Getdb()
	user := &model.User{}
	err1 := db.Model(user).Where("id LIKE ?", id).Take(&user).Error
	if err1 != nil {
		return nil, gqlerror.Errorf("Not found")
	}

	err := db.Model(&user).Where("id = ?", id).Update("reset_id", "").Update("password", password).Error
	if err != nil {
		return nil, err
	}
	return user, err
}

// SetProfilePic is the resolver for the setProfilePic field.
func (r *mutationResolver) SetProfilePic(ctx context.Context, id string, url string) (*model.User, error) {
	fmt.Print("Masuk")
	db := database.Getdb()
	user := &model.User{}
	err := db.Model(&user).Where("id = ?", id).Update("profilephotourl", url).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// SetBackgroundPic is the resolver for the setBackgroundPic field.
func (r *mutationResolver) SetBackgroundPic(ctx context.Context, id string, url string) (*model.User, error) {
	db := database.Getdb()
	user := &model.User{}
	err := db.Model(&user).Where("id = ?", id).Update("backgroundphotourl", url).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// InputLike is the resolver for the inputLike field.
func (r *mutationResolver) InputLike(ctx context.Context, input model.PostLiked) (*model.LikedPost, error) {
	panic(fmt.Errorf("not implemented: InputLike - inputLike"))
}

// SendActivateEmail is the resolver for the sendActivateEmail field.
func (r *mutationResolver) SendActivateEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.Getdb()
	var user *model.User
	err1 := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	msg := gomail.NewMessage()
	msg.SetHeader("From", "senvionny@gmail.com")
	msg.SetHeader("To", email)
	msg.SetHeader("Subject", "LinkHEdIn Activation Email")
	msg.SetBody("text/html", "Please activate your email here http://127.0.0.1:5173/activate-account/"+user.ID)

	n := gomail.NewDialer("smtp.gmail.com", 587, "senvionny@gmail.com", "tbtycpogxgqrygce")

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		return user, err
	}

	// panic(fmt.Errorf("not implemented: CreateUser - createUser"))
	return user, err1
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

// ForgotPassword is the resolver for the forgotPassword field.
func (r *mutationResolver) ForgotPassword(ctx context.Context, email string) (*model.User, error) {
	db := database.Getdb()
	var user model.User
	err1 := db.Model(user).Where("email LIKE ?", email).Where("password NOT LIKE ?", "").Take(&user).Error
	if err1 != nil {
		return nil, err1
	}
	//if user is found
	var resid string = uuid.NewString()
	err2 := db.Model(user).Where("email LIKE ?", email).Update("reset_id", resid).Error
	if err2 != nil {
		//if error is found, return nil & err1
		return nil, err1
	}
	msg := gomail.NewMessage()
	msg.SetHeader("From", "senvionny@gmail.com")
	msg.SetHeader("To", email)
	msg.SetHeader("Subject", "LinkHEdIn Forgot Password")
	msg.SetBody("text/html", "Please activate your email here <a>http://127.0.0.1:5173/reset-password/"+resid+"</a>")

	n := gomail.NewDialer("smtp.gmail.com", 587, "senvionny@gmail.com", "tbtycpogxgqrygce")
	if err := n.DialAndSend(msg); err != nil {
		return nil, err
	}

	return &user, nil
}

// Like is the resolver for the like field.
func (r *postResolver) Like(ctx context.Context, obj *model.Post) (int, error) {
	var model *model.LikedPost
	var count int64

	r.DB.First(&model, "postid = ?", obj.ID).Count(&count)
	return int(count), nil
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

// GetResetID is the resolver for the getResetID field.
func (r *queryResolver) GetResetID(ctx context.Context, resetID string) (*model.User, error) {
	db := database.Getdb()
	var user *model.User

	err := db.Where("reset_id = ?", resetID).First(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}

// GetUserEducation is the resolver for the getUserEducation field.
func (r *queryResolver) GetUserEducation(ctx context.Context, id string) ([]*model.Education, error) {
	var educations []*model.Education
	err := r.DB.Where("user_id LIKE ?", id).Find(&educations).Error
	if err != nil {
		return nil, err
		// gorm.ErrRecordNotFound
	}
	return educations, nil
}

// GetUserExperience is the resolver for the getUserExperience field.
func (r *queryResolver) GetUserExperience(ctx context.Context, id string) ([]*model.Experience, error) {
	var experiences []*model.Experience
	err := r.DB.Where("user_id LIKE ?", id).Find(&experiences).Error
	if err != nil {
		return nil, err
		// gorm.ErrRecordNotFound
	}
	return experiences, nil
}

// GetAllPosts is the resolver for the getAllPosts field.
func (r *queryResolver) GetAllPosts(ctx context.Context, limit int, offset int) ([]*model.Post, error) {
	var posts []*model.Post

	err := r.DB.Limit(limit).Offset(offset).Find(&posts).Error

	if err != nil {
		return nil, err
	}
	return posts, nil
}

// SearchPosts is the resolver for the searchPosts field.
func (r *queryResolver) SearchPosts(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	panic(fmt.Errorf("not implemented: SearchPosts - searchPosts"))
}

// Users is the resolver for the Users field.
func (r *searchResolver) Users(ctx context.Context, obj *model.Search) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented: Users - Users"))
}

// Posts is the resolver for the Posts field.
func (r *searchResolver) Posts(ctx context.Context, obj *model.Search) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented: Posts - Posts"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Search returns generated.SearchResolver implementation.
func (r *Resolver) Search() generated.SearchResolver { return &searchResolver{r} }

type mutationResolver struct{ *Resolver }
type postResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type searchResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) GetAllPosts(ctx context.Context) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented: GetAllPosts - getAllPosts"))
}
func (r *postResolver) Share(ctx context.Context, obj *model.Post) (int, error) {
	panic(fmt.Errorf("not implemented: Share - share"))
}
func (r *mutationResolver) GetResetID(ctx context.Context, email string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: GetResetID - getResetID"))
}
func (r *mutationResolver) GetCurrentUser(ctx context.Context, id string) (*model.User, error) {
	db := database.Getdb()
	var user *model.User

	err := db.Where("id = ?", id).Find(&user).Error
	if err != nil {
		return nil, err
	}
	return user, err
}
