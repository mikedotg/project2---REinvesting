const { User } = require('../models');

const userData = [
    {   
        id: 1,
        username: 'charlii',
        email: 'charlii@charlii.com', 
        password: 'alsocharlii'
    },
    {
        id: 2,
        username: 'mike',
        email: 'mike@mike.com', 
        password: 'alsomike'
    },
    {
        id: 3,
        username: 'nashbi',
        email: 'nashbi@nashbi.com', 
        password: 'alsonashbi'
    },
    {
        id: 4,
        username: 'michael',
        email: 'michael@michael.com', 
        password: 'alsomichael'
    },
]

const seedUsers = () => {
    User.bulkCreate(userData)
}

module.exports = seedUsers