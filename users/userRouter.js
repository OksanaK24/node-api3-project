const express = require('express');
const users = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser(),  (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  
  const body = {
    text: req.body.text,
    user_id: req.user.id,
  }

  posts
    .insert(body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/', (req, res) => {
  users
    .get()
    .then(user => {
        res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  users
    .getUserPosts(req.user.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  users
    .remove(req.user.id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  users
    .update(req.user.id, req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
})
   

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
        .catch((error) => {
          next(error)
        })
    }
  
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing user data" })
    }
    if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" })
    }
    next()
  }
}

function validatePost() {
  
  return (req, res, next) => {

    if (!req.body) {
      return res.status(400).json({ message: "missing post data" })
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" })
    }
    next()
  }
}

module.exports = router;
