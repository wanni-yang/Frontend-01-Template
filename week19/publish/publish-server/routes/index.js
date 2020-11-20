var express = require('express');
var router = express.Router();
const fs = require('fs');
/* GET home page. */
router.post('/', function(request, res, next) {
  try {
    fs.writeFileSync('../server/public/' + request.query.filename,request.body.content);
    res.send(' ');
    res.end()

  } catch (error) {
    console.error(error);
  }

});

module.exports = router;