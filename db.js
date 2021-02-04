require('dotenv').config();
const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: process.env.DATABASE_URL.includes(`postgres`) ? {}: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
    },
  },
});

sequelize .authenticate().then(
    function() {
      console.log("connection has been established successfully");
  },
  function(err) {
      console.log(err);
    }
  );

  module.exports = sequelize; 