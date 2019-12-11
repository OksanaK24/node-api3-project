const express = require("express")
const helmet = require("helmet")

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express()

server.use(helmet())
// server.use(logger())

server.use(express.json())

server.use("/api/users", userRouter);
server.use("/api/users/:id/posts", postRouter);


server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "An internal error occurred, please try again later",
	})
})

// function logger(){
//     return (req, res, next) => {
//         console.log(`${req.method} - ${req.url} - ${req.get(Date.now())}`)
//         // request method, request url, and a timestamp
//         next()
//     }
// }

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})