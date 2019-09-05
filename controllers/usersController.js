const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    show: (request, response) => {
        db.User.findById(request.params.user_id, { password: 0, _v: 0 }, (error, foundUser) => {
            if (error) return response.status(500).json({ 
                status: 500, 
                error,
                message: 'Something went wrong, please try again'
            });
            response.status(200).json({ 
                status: 200,
                data: foundUser,
                requestedAt: getTime(),
            });
        });
    },
    index: (request, response) => {
        db.User.find({}, { password: 0, _v: 0 }, (error, allUsers) => {
            if (error) return response.status(500).json({ 
                status: 500,
                error,
                message: 'Something went wrong. Please try again'
             });
             response.status(200).json({ 
                status: 200,
                numberOfResults: allUsers.length,
                data: allUsers,
                requestedAt: getTime()
             });
        });
    },
    delete: (request, response) => {
        db.User.findByIdAndDelete(request.params.user_id, (error, deletedUser) => {
            if (error) return response.status(500).json({ status: 500, error, message: 'Something went wrong, Please try again.' });
            response.status(200).json({
                status: 200,
                data: `Success! Deleted ${deletedUser.username}`,
                requestedAt: getTime()
            });
        });
    },
    edit: (request, response) => {
        db.User.findByIdAndUpdate(request.paramas.user_id, request.body, { new: true }, (error, editedUser) => {
            if (error) return response.status(400).json({
                status: 400, error, message: 'Something went wrong. Please try again'
            });
            response.status(202).json({
                status: 202, 
                data: editedUser,
                requestedAt: getTime()
            });
        });
    },
    create: (request, response) => {
        const newUser = request.body;
        db.User.create(newUser, (error, createdUser) => {
            if (error) return response.status(400).json({ 
                status: 400, error, message: 'Something went wrong. Please try again!'
            });
            response.status(201).json({
                status: 201,
                data: createdUser,
                requeestedAt: getTime()
            });
        });
    }
};