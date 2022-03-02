var express = require("express");
var app = express();
const { v4: uuidv4 } = require("uuid");

var { Pool } = require("pg");

let connectionString = "";
let pool;
if (process.env.DBCLUSTER_SECRET) {
  const { username, host, dbname, password, port } = JSON.parse(
    process.env.DBCLUSTER_SECRET
  );
  connectionString = `postgres://${username}:${password}@${host}:${port}/${dbname}`;
  console.log(connectionString);
  pool = new Pool({
    user: username,
    database: dbname,
    password: password,
    host: host,
    port: port,
  });
} else {
  connectionString = process.env.DB; // "postgres://username:password@localhost/database";
  pool = new Pool({ connectionString });
}

// Routes
app.get("/api/status", function (req, res) {
  pool.query("SELECT now() as time", (error, results) => {
    if (error) {
      console.log("error connecting to db");
      return res.status(500).send("error connecting to db");
    }
    return res.json({
      request_uuid: uuidv4(),
      time: results.rows[0].time,
    });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
