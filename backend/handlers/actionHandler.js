const {
  executeQuery,
  insertIntoActions,
} = require("../database/databaseHelper");

function getActionTemplates(res, resourceType) {
  const sqlQuery = `select id, templateName, resourceType from ActionTemplates where resourceType = ${resourceType}`;
  console.log(sqlQuery);
  executeQuery(sqlQuery, res);
}

function getAllActions(res) {
  const sqlQuery = "select * from Actions";
  executeQuery(sqlQuery, res);
}

function createAction(res, body) {
  insertIntoActions(res, body);
}

function deleteAction(res, id) {
  const sqlQuery = `delete from Actions where id = ${id}`;
  executeQuery(sqlQuery, res);
}

module.exports = {
  getActionTemplates,
  getAllActions,
  createAction,
  deleteAction,
};
