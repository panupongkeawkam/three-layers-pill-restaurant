const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}));

const customerRouter = require('./routes/customer')
const employeeRouter = require('./routes/employee')
app.use(customerRouter.router)
app.use(employeeRouter.router)

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`)
  console.log(`>> Table 1, 2, ...:\n\thttp://localhost:3000/table/1/home\n\thttp://localhost:3000/table/2/home\n\thttp://localhost:3000/table/.../home`)
  console.log(`>> Admin:\n\thttp://localhost:3000/admin/login`)
})