//const Hero = require('../models/hero.model.js');
var multer = require('multer');
var upload    = require('./upload');
var _ = require('lodash');

var heroArr = [{
    name:"hero1",
    canFly:true,
    gender:'female',
    location:'Earth',
    photo:"",
    id:1
},{
    name:"hero2",
    canFly:true,
    gender:'male',
    location:'Earth',
    photo:"",
    id:2
},{
    name:"hero3",
    canFly:true,
    gender:'male',
    location:'Earth',
    photo:"",
    id:3
}];
var count = 3;
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
            /* const hero = new Hero({
                name: req.body.name, 
                canFly: req.body.canFly, 
                gender:req.body.gender || 'Male',
                location:req.body.location || 1,
                photo:photo,
                ip:ip
            });
 */
            count++;
            let hero = {
                name: req.body.name, 
                canFly: req.body.canFly, 
                gender:req.body.gender || 'Male',
                location:req.body.location || 1,
                photo:photo,
                ip:ip,
                id :count
            }

            heroArr.push(hero);

            res.send(hero);

            
            // Save Hero in the database
           /*  hero.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Hero."
                });
            }); */
        }
    });

};

// Retrieve and return all Heros from the database.
exports.findAll = (req, res) => {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.send(heroArr);

    /* Hero.find()
    .then(heroes => {
        res.send(heroes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Heros."
        });
    }); */
};

exports.findOne = (req, res) => {

        var hero = _.find(heroArr,{id:parseInt(req.params.heroId)});

        console.log("herrrrrrrr",heroArr,hero,req.params.heroId)

        res.send(hero);
    
    
    /* Hero.findById(req.params.heroId)
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
    }); */
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
            let sendObj = {};
            _.forEach(heroArr,(val,key)=>{
                if(val.id == req.params.heroId){
                    val.name= req.body.name, 
                    val.canFly= req.body.canFly,
                    val.gender=req.body.gender,
                    val.location=req.body.location,
                    val.photo=photo
                    sendObj = val;
                }
            });

            if(!sendObj.name){
                return res.status(404).send({
                    message: "Hero not found with id " + req.params.heroId
                });
            }else{
                res.send(sendObj);
            }
           

           /*  Hero.findByIdAndUpdate(req.params.heroId, {
                name: req.body.name, 
                canFly: req.body.canFly,
                gender:req.body.gender,
                location:req.body.location,
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
            }); */
        }
    });
};

// Delete a Hero with the specified HeroId in the request
exports.delete = (req, res) => {

    _.remove(heroArr,(val)=>{
        return val.id == req.params.heroId
    })

    res.send('success');

    /* Hero.findByIdAndRemove(req.params.heroId)
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
    }); */
};