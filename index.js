const express = require('express');
const users = require('./routes/users');
const posts = require('./routes/posts');
const error = require('./utilities/error');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

// Valid API Keys.
// const apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];

// app.use("/api", function (req, res, next) {
//     var key = req.query["api-key"];
  
//     // Check for the absence of a key.
//     if (!key) next(error(400, "API Key Required"));
  
//     // Check for key validity.
//     if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));
  
//     // Valid key! Store it in req.key for route access.
//     req.key = key;
//     next();
//   });


app.use('/api/users', users);
app.use('/api/posts', posts);

app.get('/', (req, res) => {
    res.send('Work in progress!');
});


// 404 Not Found Middleware
app.use((req, res, next) => {
    next(error(404, "Resource not found!"));
});


// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});