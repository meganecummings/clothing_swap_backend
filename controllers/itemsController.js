const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    index: (request, response) => {
        db.Item.find({})
        .populate('posts')
        .exec((error, items) => {
            if (error) return response.json(error);
            response.json(items);
        })
    },
    show: (request, response) => {
        db.Item.findById(request.params.event_id, (error, foundEvent) => {
            if (error) return response.status(500).json({
                status: 500,
                error,
                message: 'Something went wrong. Please try again'
            });
            return response.status(200).json({ status: 200, message: foundEvent, requestedAt: getTime() })
        })
    },
    create: (request, response) => {
        const newItem = request.body;
        db.Item.create(newItem, (error, createdItem) => {
            if (error) return response.status(400).json({
                status: 400,
                error,
                message: 'Something went wrong, please try again'
            });
            return response.status(201).json({
                status: 201, 
                message: createdItem,
                requestedAt: getTime()
            });

            // // find user that this item belongs to and adds it to that model
            // db.User.findByIdAndUpdate(newItem.user_id, { new: true }, (error, foundUser) => {
            //     if (error) return console.log(error);
            //     foundUser.items.push(createdItem);
            //     foundUser.save()
            // })
            //     .populate('items')
            //     .exec((error, user) => {
            //         if (error) return console.log(error);
            //         console.log(user);
            //     });
        });
    },
    delete: (request, response) => {
        db.Item.findByIdAndDelete(request.params.item_id, (error, deletedItem) => {
            if (error) return response.status(500).json({ status: 500, error, message: 'Something went wrong. Please try again'});
            return response.status(200).json({
                status: 200,
                data: `Successfully deleted ${deletedItem.name}`,
                requestedAt: getTime()
            });
        });
    },
    update: (request, response) => {
        db.Item.findByIdAndUpdate(request.params.item_id, request.body, { new: true }, (error, editedUser) => {
            if (error) return response.status(400).json({ status: 400, error, message: 'Something went wrong. Please try again' });
            return response.status(202).json({
                status: 202, 
                data: editedUser,
                requestedAt: getTime()
            });
        });
    }
}