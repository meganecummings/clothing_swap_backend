const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

const register = (request, response) => {
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




}