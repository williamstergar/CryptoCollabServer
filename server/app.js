require("dotenv").config()
const Express = require("express")
const app = Express()
const dbConnection = require("./db")
app.use(require("./middleware/header"))
const controllers = require("./controllers")
app.use(Express.json())

app.use("/user", controllers.userController)
app.use("/collab", controllers.collabController)
app.use("/crypto", controllers.cryptoController)
app.use("/comment", controllers.commentController)

try {
dbConnection
    .authenticate()
    .then( async () => await dbConnection.sync())
    // .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
} catch (err) {
    console.log("[SERVER]: Server crashed")
    console.log(err)
}