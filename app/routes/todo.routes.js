module.exports = (app) => {
    const todo = require('../controllers/todo.controller.js');
    // Create a new Hero
    app.post('/todos', todo.create);

    // Retrieve all Heros
    app.get('/todos', todo.findAll);

    // Retrieve a single Hero with HeroId
    app.get('/todos/:todoId', todo.findOne);

    // Update a Hero with HeroId
    app.put('/todos/:todoId', todo.update);

    // Delete a Hero with HeroId
    app.delete('/todos/:todoId', todo.delete);
}