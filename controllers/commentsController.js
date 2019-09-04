const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    index: (request, response) => {
        db.Post.findByIdAndDelete(request.params.post_id, (error, foundPost) => {
            if (error) return response.status(400).json({
                status: 400,
                message: 'Something went wrong, Please try again'
            });
            const allComments = foundPost.comments;
            response.status(200).json({
                status: 200,
                numberOfResults: allComments.length,
                data: allComments,
                requestedAt: getTime()
            });
        });
    },
    show: (request, response) => {
        db.Post.findById(request.params.post_id, (error, foundPost) => {
            if (error) return response.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            const foundComment = foundPost.comments.id(request.params.comment_id);
            response.status(200).json({
                status: 200,
                data: foundPost, 
                rquestedAt: getTime()
            });
        });
    },
    delete: (request, response) => {
        db.Post.findById(request.params.post_id, (error, foundPost)=> {
            if (error) return response.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            foundPost.comments.id(request.params.comment_id).remove(),
            foundPost.save((error, savedPost) => {
                if (error) return response.status(400).json({
                    status: 400, 
                    message: 'Something went wrong, Please try again'
                });
                response.status(200).json({
                    status: 200,
                    data: savedPost, 
                    requestedAt: getTime(),  
                });
            });
        });
    },
    create: (request, response) => {
        db.Post.findById(request.params.post_id, (error, foundPost) => {
            if (error) response.status(400).json({
                status: 400,
                error,
                message: 'Somethign went wrong. Please Try again'
            });
            db.Comment.create(request.body, (error, createdComment) => {
                if (error) return response.status(400).json({
                    status: 400,
                    error, 
                    message: 'Something went wrong. Please try again'
                });
                foundPost.comments.push(createdComment);
                foundPost.save((error, savedPost) => {
                    if (error) return response.status(400).json({
                        status: 400, 
                        error, 
                        message: 'Something went wrong, Please try again'
                    });
                    return response.status(200).json({
                        status: 200, 
                        data: savedPost, 
                        requestedAt: getTime()
                    });
                });
            });
        });
    }
};