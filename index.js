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

// // if no route handlers send our response, this middleware
// // function will get called at the end of the stack.
// server.use((req, res) => {
// 	res.status(404).json({
// 		message: "Route was not found",
// 	})
// })

// // any time `next` gets called with a parameter,
// // as in next("some error"), it treats it as an
// // error and the middleware stack comes directly
// // to this handler.
// server.use((err, req, res, next) => {
// 	console.log(err)
// 	res.status(500).json({
// 		message: "An internal error occurred, please try again later",
// 	})
// })

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