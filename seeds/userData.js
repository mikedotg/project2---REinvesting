const { User } = require('../models');

const userData = [
    {
        username: 'charlii',
        email: 'charlii@charlii.com', 
        password: 'alsocharlii'
    },
    {
        username: 'mike',
        email: 'mike@mike.com', 
        password: 'alsomike'
    },
    {
        username: 'nashbi',
        email: 'nashbi@nashbi.com', 
        password: 'alsonashbi'
    },
    {
        username: 'michael',
        email: 'michael@michael.com', 
        password: 'alsomichael'
    },
]

const seedUsers = () => {
    User.bulkCreate(userData)
}

module.exports = seedUsers