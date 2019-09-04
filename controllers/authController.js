const bcrypt = require('bcryptjs');

// Database
const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    register: (request, response) => {
        const errors = [];

        if (!request.body.username) {
            errors.push({ field: 'Username', message: 'Please enter a username' });
        };
        if (db.User.findOne({ username: request.body.username }), (error, foundUser) => { 
            if (error) return response.status(500).json({ status: 500, message: 'Something went wrong' })
            if (foundUser) errors.push({ field: 'Username', message: 'Username already exists' });
        });

        if (!request.body.email) {
            errors.push({ field: 'Email', message:'Please enter an email' });
        };
        if (db.User.findOne({ email: request.body.email }), (error, foundEmaiil) => {
            if (error) return response.status(500).json({ status: 500, message: 'Something went wrong.' });
            if (foundEmaiil) errors.push({ field: 'Email', message: 'Email already exists' });
        });

        if (!request.body.password) {
            errors.push({ field: 'Password', message: 'Please enter a password' });
        };
        if (!request.body.password2) {
            errors.push({ filed: 'Password Confirmation', message: 'Please confirm your password' });
        };
        if (request.body.password !== request.body.password) {
            errors.push({ field: 'Password Match', message: 'Passwords do not Match. Please try again' });
        };

        if (errors.length) {
            return response.status(500).json({ status: 500, message: errors });
        };

        bcrypt.genSalt(10, (error, salt) => {
            if (error) return response.status(500).json({ 
                status: 500,
                error,
                message: 'genSalt. Something went wrong. Please try again'
            });

            bcrypt.hash(request.body.password, salt, (error, hash) => {
                if (error) return response.status(500).json({ 
                    status: 500, 
                    error,
                    message: 'hash. Something went wrong, please try again'
                });

                const newUser = { 
                    username: request.body.username, 
                    email: request.body.email,
                    first_name: request.body.first_name,
                    password: hash
                };

                db.User.create(newUser, (error, savedUser) => {
                    if (error) return response.status(500).json({ 
                        status: 500,
                        error,
                        message: error
                    });
                    response.status(200).json({ 
                        status: 201, 
                        data: savedUser, 
                        message: 'Successfully created a new user!', 
                        requestedAt: getTime() 
                    });
                    console.log(savedUser)
                });
            });
        });
    },
    login: (request, response) => {
        if (!request.body.email || !request.body.password ) {
            return response.status(400).json({ status: 400, message: 'Please enter your email and password' });
        };
        db.User.findOne({ email: request.body.email }, (error, foundUser) => {
            if (error) return response.status(500).json({
                status: 500, 
                error,
                message: 'Something went wronng, please try again.'
            });

            if (!foundUser) {
                return response.status(400).json({
                    status: 400,
                    error, 
                    message: 'Email or password is incorrect'
                });
            };

            bcrypt.compare(request.body.password, foundUser.password, (error, isMatch) => {
                if (error) return response.status(500).json({ 
                    status: 500, 
                    error,
                    message: 'Something went wrong. Please try again'
                 });

                 if (isMatch) {
                     request.session.loggedIn = true,
                     request.session.currentUser = { id: foundUser._id };
                     return response.status(200).json({ 
                        status: 200, 
                        data: isMatch,
                        message: 'Success', 
                        id: foundUser._id,
                        requestedAt: getTime()
                     });
                 } else {
                     return response.status(400).json({ 
                         status: 400,
                         error,
                         message: 'Email or password is incorrect'
                     });
                 }
            });
        });
    },

    logout: (request, response) => {
        request.session.destroy(error => {
            if (error) return response.status(500).json({ 
                status: 500, 
                error, 
                message: 'Something went wrong. Please try again.'
            });
            response.sendStatus(200);
        });
    },
    verify: (request, response) => {
        if (!request.session.currentUser) return response.status(401).json({ 
            status: 401, 
            error,
            message: 'Unauthorized. Please try again'
         });
        response.status(200).json({ 
            status: 200, 
            data: response,
            message: 'Current User Verified.'
         });
    }
};
