const express = require("express");
const  mysql = require("mysql");
const login = require("./models/Login")
const user = require('./routers/user');
const sql = require("./sql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //middlewares
app.use(sql)
app.use('/user', user);
const PORT = 3000;

const myLogger = function (req, res, next) {
  console.log('LOGGED')

  next()
}

app.use(myLogger)
//HTTP
app.get("/", (req, res) => {
  console.log("This is a get request");
  
  res.send("<h2>Hello World</h2>");
});

app.get("/student", (req, res) => {
  console.log("This is students get request");
  res.send("<h2>Hello Students</h2>");
});

app.post("/marks", (req, res) => {
  try {
    const data = req.body;
    let marks = 0
    if(data.subject1 &&  data.subject2){
      marks = data.subject1 + data.subject2;
    }else{
      throw "Invalid information"
    }

    res.status(200).send({ marks: marks });
  } catch (error) {
    res.status(400).send({ error: error, errorMessage: "Details are invalid" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
