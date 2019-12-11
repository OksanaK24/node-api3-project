const express = require('express');
const users = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  users
    .get()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
    return (req, res, next) => {
      users.getById(req.params.id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(404).json({ message: "invalid user id" })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            message: "Error retrieving the user",
          })
        })
    }
  
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
