const express = require('express');
const posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  posts
    .get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  res.json(req.post)
});

router.delete('/:id', validatePostId(), (req, res) => {
  posts
  .remove(req.post.id)
  .then(post =>{
      res.status(200).json(post)
  })
  .catch(() => {
      res.status(500).json({ errorMessage: "The post could not be removed" })
  })
});

router.put('/:id', validatePostId(), (req, res) => {
  posts
    .update(req.post.id, req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: "The post information could not be modified." })
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post
          next()
        } else {
          res.status(404).json({ message: "invalid post id" })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: "Error retrieving the post",
        })
      })
  }
}

module.exports = router;
