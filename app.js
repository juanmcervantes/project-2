const env = require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { validatorRegister, validatorLogin } = require("./validators/auth");
const { loginCtrl, registerCtrl } = require("./controllers/auth");
const { dbConnectMysql } = require("./config/mysql");


//Configuración
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({ type: "*/*" }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/controllers"));

//Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/login.html"));
});

app.get("/notes",(req, res) => {
  res.sendFile(path.join(__dirname, "./pages/todolist.html"));
}
);
app.post("/api/auth/register", validatorRegister, registerCtrl);
app.post("/api/auth/login", validatorLogin, loginCtrl);


//Server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log("Tu app está lista por http://localhost:4040");
});

dbConnectMysql();
