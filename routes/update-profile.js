

const express = require('express');
const router = express.Router();
const userInfoQueries = require('../db/queries/user-info');

router.get('/', (req, res) => {

  userInfoQueries.getInfo()
  .then(info => {
    res.render('update-profile',{ info });
    // console.log ({users});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

router.post("/", (req, res) => {
  const newName = req.body.name;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newProfile = {
    name: newName,
    email: newEmail,
    password: newPassword,
  };
  userInfoQueries
    .updateInfo(newProfile)
    .then((info) => {
      res.redirect('/update');
      res.send(info);
      //update form
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});
module.exports = router;
