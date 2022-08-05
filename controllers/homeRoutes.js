const router = require('express').Router();
// const { User } = require('../../models');

// router.get('/', (req, res) => {
//     res.render('landing')
// });


router.get('/createpoststable', (req, res) =>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCAR(255), body VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log(result);
    // res.send('Posts table created...');
    res.status(200).json(result);
    res.render('landing');
    })
    });
// router.get('/', async (req, res) => {
//   try {
//     // Get all users, sorted by name
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     // Serialize user data so templates can read it
//     const users = userData.map((project) => project.get({ plain: true }));

//     // Pass serialized data into Handlebars.js template
//     res.render('homepage', { users });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', async (req, res) => {
//   try {
//     // Get all users, sorted by name
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     // Serialize user data so templates can read it
//     const users = userData.map((project) => project.get({ plain: true }));

//     // Pass serialized data into Handlebars.js template
//     res.render('homepage', { users });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// if user is loggedIn, send to homepage, if not, send to login 
// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/')
//       return
//     }
//     res.render('login')
// })  

module.exports = router;