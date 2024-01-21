const { executeQuery } = require("./../database/databaseHelper");

function instanceCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where resourceGlobalName like '%instances%' and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function diskCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where resourceGlobalName like '%disk%' and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function snapshotsCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where resourceGlobalName like '%snapshot%' and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function bucketsCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where serviceId like '%95FF-2EF5%' and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function computeCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where (resourceGlobalName like '%instances%' or resourceGlobalName like '%disk%' or resourceGlobalName like '%snapshot%') and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function totalCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where (resourceGlobalName like '%instances%' or resourceGlobalName like '%disk%' or resourceGlobalName like '%snapshot%' or serviceId like '%95FF-2EF5%' or serviceId like '%E505-1604%') and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function networkingCost(
  res,
  name = "",
  id = "",
  starttime = "2023-09-01",
  endtime = "2023-09-30"
) {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery =
      "select sum(cost_at_list) as TotalCost from DetailedUsageTable where serviceId like '%E505-1604%' and projectID = 'vsa-dev-298916' and cost_at_list > 0 and DATE(usageStartTime) >= DATE(?) AND DATE(usageStartTime) <= DATE(?)";

    let params = [];
    params.push(starttime);
    params.push(endtime);
    executeQuery(sqlQuery, res, params);
  } else if (id.length) {
    name = getInstanceId(name);
    // get cost of instance with given name
  }
}

function computeListCost(res, name = "", id = "") {
  if (id.length == 0 && name.length == 0) {
    let sqlQuery = `select resourceName, 'instance' as resourceType, sum(cost) as TotalCost, date(usageStartTime) as date 
    from DetailedUsageTable where resourceName is not NULL AND (resourceGlobalName like '%instance%') and cost_at_list > 0 and projectID = 'vsa-dev-298916' 
    group by resourceGlobalName UNION select resourceName, 'disk' as resourceType, sum(cost) as TotalCost, date(usageStartTime) as date 
    from DetailedUsageTable where (resourceGlobalName like '%disk%') and cost_at_list > 0 and projectID = 'vsa-dev-298916' group by resourceGlobalName 
    UNION select resourceName, 'snapshot' as resourceType, sum(cost) as TotalCost, date(usageStartTime) as date from DetailedUsageTable 
    where (resourceGlobalName like '%snapshot%') and cost_at_list > 0 and projectID = 'vsa-dev-298916' group by resourceGlobalName`;

    let params = [];

    const pattern = /^projects\/\d+\/instances\//;
    (async () => {
      try {
        let result = [];
        result = await executeQuery(sqlQuery, res, params, true);
        for (let i = 0; i < result.length; i++) {
          result[i].resourceName = result[i].resourceName.replace(pattern, "");
        }
        res.json({
          message: "success",
          data: result,
        });
      } catch (err) {
        // Handle any errors here
        console.error(err);
      }
    })();
  }
}

// function convertInstanceName(instanceName) {
//   const pattern = /^projects\/\d+\/instances\/(?P<instance_name>\w+)$/;
//   const match = pattern.exec(instanceName);
//   if (match) {
//     return match.groups.instance_name;
//   } else {
//     return instanceName;
//   }
// }

module.exports = {
  instanceCost,
  diskCost,
  snapshotsCost,
  bucketsCost,
  computeCost,
  totalCost,
  networkingCost,
  computeListCost,
};
