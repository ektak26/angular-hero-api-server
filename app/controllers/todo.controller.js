const Todo = require('../models/todo.model.js');
var multer = require('multer');
var upload    = require('./upload');
// Create and Save a new Hero
// Create and Save a new Hero
exports.create = (req, res) => {
    upload(req, res,(error) => {
        if(error){
          console.log("error",error);
        }else{
            let photo = '';
            if(req.file && req.file.path){
                photo = req.file.path;
            }
            // Create a Hero
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const hero = new Hero({
                name: req.body.name, 
                superPowers: req.body.superPowers, 
                gender:req.body.gender || 'Male',
                galaxy:req.body.galaxy || 1,
                photo:photo,
                ip:ip
            });

            // Save Hero in the database
            hero.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Hero."
                });
            });
        }
    });

};

// Retrieve and return all Heros from the database.
exports.findAll = (req, res) => {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    Hero.find({ip:ip})
    .then(heroes => {
        res.send(heroes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Heros."
        });
    });
};

exports.findOne = (req, res) => {
    Hero.findById(req.params.heroId)
    .then(hero => {
        if(!hero) {
            return res.status(404).send({
                message: "Hero not found with id " + req.params.heroId
            });            
        }
        res.send(hero);
    }).catch(err => {
        console.log("err",err)

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Hero not found with id " + req.params.heroId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Hero with id " + req.params.heroId
        });
    });
};

// Update a Hero identified by the HeroId in the request
exports.update = (req, res) => {

    upload(req, res,(error) => {
        if(error){
          console.log("error",error);
        }else{
            let photo = '';
            if(req.file && req.file.path){
                photo = req.file.path;
            }
            // Create a Hero
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // Find Hero and update it with the request body
            Hero.findByIdAndUpdate(req.params.heroId, {
                name: req.body.name, 
                superPowers: req.body.superPowers   , 
                gender:req.body.gender,
                galaxy:req.body.galaxy,
                photo:photo
            }, {new: true})
            .then(hero => {
                if(!hero) {
                    return res.status(404).send({
                        message: "Hero not found with id " + req.params.heroId
                    });
                }
                res.send(hero);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Hero not found with id " + req.params.heroId
                    });                
                }
                return res.status(500).send({
                    message: "Error updating hero with id " + req.params.heroId
                });
            });
        }
    });
};

// Delete a Hero with the specified HeroId in the request
exports.delete = (req, res) => {
    Hero.findByIdAndRemove(req.params.heroId)
    .then(hero => {
        if(!hero) {
            return res.status(404).send({
                message: "Hero not found with id " + req.params.heroId
            });
        }
        res.send({message: "Hero deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Hero not found with id " + req.params.heroId
            });                
        }
        return res.status(500).send({
            message: "Could not delete hero with id " + req.params.heroId
        });
    });
};