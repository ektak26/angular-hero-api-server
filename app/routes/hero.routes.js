module.exports = (app) => {
    const hero = require('../controllers/hero.controller.js');
    // Create a new Hero
    app.post('/heroes', hero.create);

    // Retrieve all Heros
    app.get('/heroes', hero.findAll);

    // Retrieve a single Hero with HeroId
    app.get('/heroes/:heroId', hero.findOne);

    // Update a Hero with HeroId
    app.put('/heroes/:heroId', hero.update);

    // Delete a Hero with HeroId
    app.delete('/heroes/:heroId', hero.delete);
}