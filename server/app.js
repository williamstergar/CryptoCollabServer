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

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error =${err}`);
    })