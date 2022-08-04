const { Sequelize } = require('sequelize');
const { request } = require('express');
const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const usersData = await User.findAll();
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a user 
router.post('/', async (req, res) => {
  try{
    const userData =  
    await User.create(req.body);
    req.session.save(() => {
      req.session.loggedIn = true

      res.status(200).json(userData)
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body)

    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (!userData) {
      res.status(400).json({message: 'Incorrect email or password. Please try again!'})
      return
    }

    const correctPassword = await userData.checkPassword(req.body.password)

    if (!correctPassword) {
      res.status.json({ message: 'Incorrect email or password. Please try again!'})
      return
    }

    req.session.save(() => {
      req.session.loggedIn = true
      res.status(200).json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router;