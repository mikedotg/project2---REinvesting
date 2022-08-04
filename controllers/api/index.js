const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/api/users', userRoutes);

module.exports = router;