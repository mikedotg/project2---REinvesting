const router = require('express').Router();
// const { User } = require('../../models');

// create a user 
router.post('/', async (req, res) => {
  try{
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    req.session.save(() => {
      req.session.loggedIn = true

      res.status(200).json(userData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
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
  }
})

// if user is loggedIn, send to homepage, if not, send to login 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

module.exports = router;