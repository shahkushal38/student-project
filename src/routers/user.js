const express = require("express");
const login = require("../models/Login");
const sql = require("../sql");
const router = express.Router();

router.use(sql);
// const middleware = function (req,res,next){
//    //code
// }

// router.use(/* middleware */)

router.post("/login", (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    console.log(" data  - ", data);

    if (!login.isValidEmail(email)) {
      throw "Invalid Email";
    }

    if (data.password != "abc@123") {
      throw "This is Invalid Password";
    }

    res.status(200).send({ message: "Login Successful" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/register", (req, res) => {
  try {
    const { name, email, password, mobile, address } = req.body;
    const query =
      "INSERT INTO regForm(Name, email, password, mobileno, address) VALUES (?, ?, ?, ?, ?)";
    req.db.query(
      query,
      [name, email, password, mobile, address],
      (err, result) => {
        console.log("err - ", err);
        if (err) return res.status(500).send("Registration failed");
        res.send("User registered successfully");
      }
    );
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/getAllUsers", (req, res) => {
  const query = "select * from regForm";
  req.db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("result - ", results);
    res.status(200).json(results);
  });
});

router.put("/updateEmail", async (req, res) => {
  const { name, email } = req.body;
  try {
    if (name && email) {
      const query = "UPDATE regForm SET email = ? WHERE Name = ?";

      await req.db
        .query(query, [email, name])
        .then(([result]) => {
          console.log("Result - ", result);
          if (result == undefined || result.affectedRows === 0) {
            throw "User not found";
          }
          res.status(200).json({ message: "User updated successfully" });
        })
        .catch((err) => {
          console.log("In error -  ");
          throw err;
        });
    }
  } catch (err) {
    console.log("Error in try catch - ", err);
    res.status(500).json({
      mmssage: "Error from try catch",
      error: JSON.stringify(err),
      errMessage: err.message,
    });
  }
});

router.delete("/deleteUser/:name", (req, res) => {
  const name = req.params.name;
  console.log("name -", name);
  const sql = "DELETE FROM regForm WHERE Name = ?";

  req.db.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});

module.exports = router;
