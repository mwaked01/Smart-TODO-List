// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const router = require("./users/router");

const { getTasks, getTasksByCategoryId } = require("./db/queries/tasks");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");


const userInfoQueries = require('./db/queries/user-info');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
// API Routes;
const themoviedpApiRoutes = require("./routes/themoviedb-api");
const yelpApiRoutes = require("./routes/yelp-api");
const edamamApiRoutes = require("./routes/edamam-api");
const openlibraryApiRoutes = require("./routes/openlibrary-api");
const categoriesRoutes = require("./routes/categories");
const updateProfileRoutes = require("./routes/update-profile");
const editRoutes = require("./routes/edit");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/users", usersRoutes);
// app.use("/categories", categoriesRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/categories", categoriesRoutes);
app.use("/delete", categoriesRoutes);
app.use("/edit", editRoutes);

app.use("/update", updateProfileRoutes);

app.use('/update', updateProfileRoutes);

// app.use('/categories', categoriesRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/toBuy", edamamApiRoutes);
app.use("/api/toWatch", themoviedpApiRoutes);
app.use("/api/toEat", yelpApiRoutes);
app.use("/api/toRead", openlibraryApiRoutes);

app.use("/uncategorized", openlibraryApiRoutes);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get('/', (req, res) => {
  userInfoQueries.getInfo()
    .then(info => {
      res.render('index', { info });
      // console.log ({users});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


app.get("/tasks", (req, res) => {

  let query = getTasks();

  if (req.query.category_id) {
    query = getTasksByCategoryId(req.query.category_id);
  }
  query.then((tasks) => {
    userInfoQueries.getInfo().then(info => {
      res.render('tasks', { tasks,info });
    });
  });
});

app.get("/login", (req, res) => {
  res.redirect("/tasks");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
