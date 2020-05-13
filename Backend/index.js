var express = require('express');
var path = require('path');
var router = express.Router();
const graphqlHTTP = require('express-graphql');
const schema = require('./backend/Gqlschema/schema');
var bodyParser = require('body-parser')
var session = require('express-session');
var cors = require('cors');
var port = 3001;
var app = express();
const { mongoDB } = require('./backend/Database/config');
const mongoose = require('mongoose');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});

app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));



app.listen(port);
console.log("GraphQL Server Listening on port 3001");
module.exports = app;


