var _ = require('lodash');

var todoArr = [];
var count = 0;

exports.create = (req, res) => {
    count++;
    let todo = {
        task: req.body.task,
        isCompleted:req.body.isCompleted || false,
        updatedDate: new Date(),
        id: count
    }

    todoArr.push(todo);

    res.send(todo);
};

// Retrieve and return all todo list from the database.
exports.findAll = (req, res) => {

    res.send(todoArr);

};

// Get one todo task
exports.findOne = (req, res) => {

    var task = _.find(todoArr, { id: parseInt(req.params.todoId) });

    console.log("herrrrrrrr", todoArr, task, req.params.todoId)

    res.send(task);

};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {

    let sendObj = {};
    _.forEach(todoArr, (val, key) => {
        if (val.id == req.params.todoId) {
            val.task = req.body.task;
            val.isCompleted=req.body.isCompleted || false,
            sendObj = val;
        }
    });

    if (!sendObj.task) {
        return res.status(404).send({
            message: "Task not found with id " + req.params.todoId
        });
    } else {
        res.send(sendObj);
    }
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {

    _.remove(todoArr, (val) => {
        return val.id == req.params.todoId
    })

    res.send('success');

};