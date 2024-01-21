const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let databaseCompletePath = path.join(
  path.resolve(__dirname),
  "./GCPBillingDataBase.db"
);

const db = new sqlite3.Database(databaseCompletePath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

async function createAlertTable() {
  const createAlertTableQuery = `CREATE TABLE IF NOT EXISTS Alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alertName varchar (255),
    description varchar (255),
    recipientsList varchar (255),
    ownerId INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  try {
    await new Promise((resolve, reject) => {
      db.run(createAlertTableQuery, (err) => {
        if (err) {
          console.log("could not create Alert table", err);
          reject();
        } else {
          console.log("Alert table is created successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.log("Unhandled error while creating Alert table: ", error);
  }
}

async function createAlertPropsTable() {
  const dropTableQuery = "DROP TABLE IF EXISTS AlertProps";
  const createAlertPropsTableQuery = `CREATE TABLE IF NOT EXISTS AlertProps (
    componentNameId INTEGER ,
    resourceType INTEGER,
    resourceId INTEGER,
    budget INTEGER,
    lastChecked timestamp,
    lastTriggered timestamp
  )`;
  try {
    await new Promise((resolve, reject) => {
      db.run(dropTableQuery, (err) => {
        if (err) {
          console.error("Error dropping AlertProps table:", err.message);
        } else {
          console.log("AlertProps Table dropped (if it existed)");
          db.run(createAlertPropsTableQuery, (err) => {
            if (err) {
              console.log("could not create AlertPropstable", err);
              reject();
            } else {
              console.log("AlertProps table is created successfully");
              resolve();
            }
          });
        }
      });
    });
  } catch (error) {
    console.log("Unhandled error while creating AlertProps table: ", error);
  }
}

async function createActionTemplatesTable() {
  const dropTableQuery = "DROP TABLE IF EXISTS ActionTemplates";
  const createTemplatesTable = `CREATE TABLE IF NOT EXISTS ActionTemplates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    templateName varchar (255),
    resourceType varchar
  )`;
  try {
    await new Promise((resolve, reject) => {
      db.run(dropTableQuery, (err) => {
        if (err) {
          console.error("Error dropping table:", err.message);
        } else {
          console.log("ActionTemplates Table dropped (if it existed)");
          db.run(createTemplatesTable, (err) => {
            if (err) {
              console.log("could not create ActionTemplates Table", err);
              reject();
            } else {
              console.log("ActionTemplate table is created successfully");
              populateActionTemplatesTable();
              resolve();
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(
      "Unhandled error while creating ActionTemplates table: ",
      error
    );
  }
}

async function populateActionTemplatesTable() {
  const dataToInsert = [
    ["Delete Instance", "1"],
    ["Power off Instance", "1"],
    ["Deattach Disk", "2"],
    ["Delete Disk", "2"],
    ["Delete Snapshot", "3"],
  ];
  const query =
    "INSERT INTO ActionTemplates (templateName, resourceType) values (?, ?)";
  for (const values of dataToInsert) {
    await new Promise((resolve, reject) => {
      db.run(query, values, (err) => {
        if (err) {
          console.log(
            `could not insert row [${values}] to ActionTemplates table`,
            err
          );
          reject();
          return;
        }
        console.log(
          `Successfully inserted row ${values} in ActionTemplates table`
        );
        resolve();
      });
    });
  }
}

async function createActionsTable() {
  const dropTableQuery = "DROP TABLE IF EXISTS Actions";
  const createActionsTableQuery = `CREATE TABLE IF NOT EXISTS Actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actionName varchar (255),
    description varchar (255),
    templateId INTEGER,
    resourceType INTEGER,
    resourceId INTEGER,
    budget INTEGER
  )`;

  try {
    await new Promise((resolve, reject) => {
      db.run(dropTableQuery, (err) => {
        if (err) {
          console.error("Error dropping table:", err.message);
        } else {
          console.log("Actions Table dropped (if it existed)");
          db.run(createActionsTableQuery, (err) => {
            if (err) {
              console.log("could not create Actions Table", err);
            } else {
              console.log("Actions table is created successfully");
            }
          });
        }
      });
    });
  } catch (error) {
    console.log("Unhandled error while creating Actions table: ", error);
  }
}

const createUsersTable = async () => {
  const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS Users (
    fullName varchar (255),
    email varchar (255) PRIMARY KEY,
    password varchar (255)
  )`;

  try {
    // db.run("DROP TABLE IF EXISTS Users");
    await new Promise((resolve, reject) => {
      db.run(createUsersTableQuery, (err) => {
        if (err) {
          console.log("could not create Users Table", err);
        } else {
          console.log("Users table is created successfully");
        }
      });
    });
  } catch (error) {
    console.log("Unhandled error while creating Users table: ", error);
  }
};

createAlertTable();
createAlertPropsTable();
createActionTemplatesTable();
createActionsTable();
createUsersTable();

module.exports = db;
