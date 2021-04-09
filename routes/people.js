const { index, create } = require('../controllers/people');

module.exports = router => {
    router.get('/people', index);
    router.post('/people', create);

    return router;
}