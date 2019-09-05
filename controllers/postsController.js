const db = require('../models');

function getTime() {
    return new Date().toLocaletring();
};

module.exports = {
    show: (request, response) => {
        db.Post.findById(request.params.post_id, (error, foundPost) => {
            if (error) return response.status(400).json({
                status: 400,
                error,
                message: 'Something went wrong, please try again'
            });
            response.status(200).json({ 
                status: 200,
                data: foundPost,
                requestedAt: getTime()
            });
        });
    },
    index: (request, response) => {
        db.Post.find({}, (error, allPosts) => {
            if (error) return response.status(400).json({ 
                status: 400,
                error,
                message: 'Something went wrong. Please try again.'
            });
            response.status(200).json({
                status: 200,
                numberOfResults: allPosts.length,
                data: allPosts,
                requestedAt: getTime()
            });
        });
    },
    create: (request, response) => {
        const newPost = request.body;

        db.Post.create(newPost, (error, createdPost) => {
            if (error) return response.status(400).json({
                status: 400,
                error, 
                message: 'Something went wrong. Please try again'
            });
            response.status(201).json({
                status: 201,
                data: createdPost, 
                requestedAt: getTime()
            });

            // Add Post to User/Author
            db.User.findOneAndUpdate({ username: newPost.username }, { new: true }, (error, foundUser) => {
                if (error) return foundUser.posts.push(createdPost);
                foundUser.save()
            })
                .populate('posts')
                .exec((error, user) => {
                    if (error) return console.log(error);
                    console.log(user)
                })
            // Add Post to Relevant Event 
            db.Event.findOneAndUpdate({ slug: newPost.event_slug }, { new: true }, (error, foundEvent) => {
                if (error) return console.log(error);
                foundEvent.posts.push(createdPost);
                foundEvent.save()
            })
            .populate('posts')
            .exec((error, event) => {
                if (error) return console.log(error)
                console.log(event)
            })
        });
    },
    edit: (request, response) => {
        db.Post.findByIdAndUpdate(request.params.post_id, request.body, { new: true }, (error, updatedPost) => {
            if (error) return request.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            response.status(202).json({
                status: 202, 
                data: updatedPost, 
                requestedAt: getTime()
            });
        });
    },
    delete: (request, response) => {
        db.Post.findByIdAndDelete(request.params.post_id, (error, deletedPost) => {
            if (error) return response.status(400).json({
                status: 400,
                message: 'Something went wrong. Please try again.'
            });
            response.status(200).json({
                status: 200, 
                message: `Success! You've deleted ${deletedPost.title}`
            });
        });
    }
};
