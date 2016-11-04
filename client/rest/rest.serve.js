/**
 * A REST client that calls data generator to generate randon json data, according to user defined schemas.
 */
var generator = require('../../src/data.generator');
var entity = require('../../src/entity');
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());

/** call like http://localhost:9009/generate?entity=person,stats&amount=100 
 *  This will generate 100 json blobs consisting of person and stats entities.
 */
app.get('/generate', function(req, res) {
  var entityArr = req.query.entity.split(',');
  entity.setEntities(entityArr);
  var json = generator.generateEntityData(req.query.amount);
  res.send(json);
});

app.listen(9009);
