require('dotenv').config();

let express = require('express');
let app = express();

const sequelize = require('./db');

sequelize.sync({alter:true});

app.use(express.json());

let user = require('./controllers/usercontroller')
let appointments = require('./controllers/appointmentscontroller')

app.use('/user', user);
app.use("/appointments", appointments);

app.listen(process.env.PORT, () => {
    console.log('server is listening on port ${process.env.PORT}');
})