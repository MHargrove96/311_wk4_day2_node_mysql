const mysql = require("mysql");
const pool = require("../sql/connection");
// POOL is what we get when you have a succsesful connection to MySQL.
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};
//DONE

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const { id } = req.params;
  console.log(id);
  let sql = `SELECT * FROM ?? WHERE ?? = ?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};
//DONE

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = "INSERT INTO ?? SET ?";
  let values = {
    ...req.body,
  };
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", values]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const { id } = req.params;
  console.log(id, "IM THE ID IN THE UPDATE USER BY ID FUNCTION");
  const { first_name, last_name } = req.body;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
  console.log(sql);
  sql = mysql.format(sql, [
    "users",
    "first_name",
    first_name,
    "last_name",
    last_name,
    "id",
    id,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.status(204).json();
  });
};

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let { firstname } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", firstname]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName,
};
