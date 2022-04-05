const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}));

const customerRouter = require('./routes/customer')
app.use(customerRouter.router)

String.prototype.toUnicode = function () {
  var result = '';
  for (var i = 0; i < this.length; i++) {
    result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
  }
  return result;
};

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`)
})