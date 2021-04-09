const Person = require('../models/Person');

exports.index = async (request, response, next) => {
    try {
        const people = await Person.find();
        response.status(200).json(people);
    } catch (error) {
        next(error);
    }
};

exports.create = async (request, response, next) => {
    try {
        const { 
            name,
            age,
            job
        } = request.body;

        const person = await Person.create({
            name,
            age,
            job
        });

        response.status(200).json({
            message: "Person created successfully",
            status: "success",
            person
        });
    } catch (error) {
        next(error);
    }
};