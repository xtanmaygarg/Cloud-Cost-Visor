const { executeQuery, insertIntoAlert } = require("../database/databaseHelper");

function getAllAlerts(res) {
  const sqlQuery = `select A.id, A.alertName, A.description, A.recipientsList, AP.resourceType, AP.resourceId, AP.budget
    from Alerts A join AlertProps AP on A.id = AP.componentNameId`;
  executeQuery(sqlQuery, res);
}

function createAlert(res, body) {
  insertIntoAlert(res, body);
}

function deleteAlert(res, id) {
  const sqlQyuery = `delete from AlertProps where componentNameId = ${id}; delete from Alerts where id = ${id}`;

  executeQuery(sqlQyuery, res);
}

module.exports = { getAllAlerts, createAlert, deleteAlert };
