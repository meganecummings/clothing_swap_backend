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
        const errors = [];
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
            db.User.findOneAndUpdate({  })
        })
    }
}