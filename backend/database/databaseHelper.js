let db = require("./databaseConnection.js");
const { verifyPassword, createToken } = require("../utils.js");

const executeQuery = async (
  sqlQuery,
  res,
  params = [],
  returnResult = false
) => {
  const rows = await new Promise((resolve, reject) => {
    db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.log("excuteQuery err: ", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  if (returnResult) {
    return rows;
  } else {
    res.json({
      message: "success",
      data: rows,
    });
  }
};

async function insertIntoAlert(res, body) {
  const insertIntoAlert = `INSERT INTO Alerts (alertName, description, recipientsList, ownerId, created) Values (?, ?, ?, ?, ?)`;

  const sql =
    "INSERT INTO Alerts (alertName, description, recipientsList, ownerId, created) VALUES (?, ?, ?, ?, ?)";
  const values = [body.alertName, body.description, body.recipientsList, 0, 0];

  await db.run(insertIntoAlert, values, (err) => {
    if (err) {
      console.log("could not insert into Alert table", err);
      return;
    }
    db.all("SELECT LAST_INSERT_ROWID()", (err, rows) => {
      if (err) {
        console.log("could not get last inserted id of alert");
        return;
      }
      console.log(rows);
      //   [ { 'LAST_INSERT_ROWID()': 7 } ]
      const lastInsertRowID = rows[0]["LAST_INSERT_ROWID()"];
      console.log(
        `alert inserted successfully with alertId ${lastInsertRowID}`
      );

      const insertToAlertProp = `INSERT INTO AlertProps (componentNameId, resourceType, resourceId, budget, 
        lastChecked, lastTriggered) values(?, ?, ?, ?, ?, ?)`;
      const values = [
        lastInsertRowID,
        body.resourceType,
        body.resourceId,
        body.budget,
        0,
        0,
      ];

      db.run(insertToAlertProp, values, (err) => {
        if (err) {
          console.log("could not insert to alert props table", err);
          return;
        }
        console.log(
          `Successfully inserted in AlertProps table for  alertId ${lastInsertRowID}`
        );
        res.json({
          errorStr: "success",
          id: lastInsertRowID,
        });
      });
    });
  });
}

async function insertIntoActions(res, body) {
  const insertIntoActionsQuery = `INSERT INTO Actions (actionName, description, templateId, resourceType, resourceId, budget) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    body.actionName,
    body.description,
    body.templateId,
    body.resourceType,
    body.resourceId,
    body.budget,
  ];

  await db.run(insertIntoActionsQuery, values, (err) => {
    if (err) {
      console.log("could not insert into Actions table", err);
      return;
    }
    console.log(`Action inserted successfully`);
    res.json({ errorStr: "success", message: "Action inserted Successfully" });
  });
}

const insertIntoUsers = async (res, body) => {
  const insertIntoUsersQuery =
    "INSERT INTO Users (email, password, fullName) VALUES (?, ?, ?)";
  const values = [body.email, body.password, body.fullName];

  await db.run(insertIntoUsersQuery, values, (err) => {
    if (err) {
      console.log("could not insert into Users table", err);
      return res.status(400).json({
        message: err.message.includes("UNIQUE constraint failed")
          ? "Email already exists"
          : "Unable to create user. Try again later",
      });
    }
    console.log(`Action inserted successfully`);
    const token = createToken(body);
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  });
};

const loginHelper = async (res, email, password) => {
  const selectFromUsersQuery = `SELECT * FROM Users WHERE email LIKE '${email}'`;

  db.all(selectFromUsersQuery, async (err, rows) => {
    if (err) {
      console.log("executeQuery err:", err);
      return res.json({ message: "Unable to login" });
    } else {
      if (!rows?.length) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = rows[0];

      const passwordVerified = await verifyPassword(password, user.password);
      if (!passwordVerified) {
        return res.status(401).json({ message: "Incorrect password" });
      } else {
        const token = createToken(user);
        return res.status(202).json({ message: "Logged in", token });
      }
    }
  });
};

module.exports = {
  executeQuery,
  insertIntoAlert,
  insertIntoActions,
  insertIntoUsers,
  loginHelper,
};
