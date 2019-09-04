const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    index: (request, response) => {
        db.Event.find({})
            .populate('posts')
            .exec((error, events) => {
                if (error) return response.json(error);
                response.json(events);
            });
    },
    show: (request, response) => {
        db.Event.findById(request.params.event_id, (error, foundEvent) => {
            if (error) return response.status(500).json({
                status: 500,
                error,
                message: 'Something went wrong, please try again'
            });
            return response.json({ status: 200, message: foundEvent });
        });
    },
    create: (request, response) => {
        const newEvent = request.body;
        db.Event.create(newEvent, (error, createdEvent) => {
            if (error) return response.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });

            return response.status(200).json({
                status: 201, 
                message: createdEvent, 
                requestedAt: getTime()
            });
        });
    },
    delete: (request, response) => {
        db.Event.findByIdAndDelete( request.params.event_id, (error, deletedEvent) => {
            if (error) return response.status(500).json({ status: 500, error, message: 'Something went wrong. Please try again'});
            return response.status(200).json({
                status: 200, 
                data: `Successfully deleted Event ${deletedEvent.title}`,
                requestedAt: getTime()
            });
        });
    },
    edit: (request, response) => {
        db.Event.findByIdAndUpdate(request.params.event_id, request.body, { new: true }, (error, editedEvent) => {
            if (error) return response.status(400).json({ status: 400, message: 'Something went wrong. Please try again'});
            return response.status(202).json({
                status: 202,
                data: editedEvent,
                requestedAt: getTime()
            });
        });
    }
}