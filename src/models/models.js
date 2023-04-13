const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class User extends Model {}
User.init({
  gender: DataTypes.STRING,
  title: DataTypes.STRING,
  first: DataTypes.STRING,
  last: DataTypes.STRING,
  email: DataTypes.STRING,
  date: DataTypes.DATE,
  age: DataTypes.INTEGER,
  phone: DataTypes.STRING,
  cell: DataTypes.STRING,
  nat: DataTypes.STRING,
  id_name: DataTypes.STRING,
  id_value: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

class Login extends Model {}
Login.init({
  uuid: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  salt: DataTypes.STRING,
  md5: DataTypes.STRING,
  sha1: DataTypes.STRING,
  sha256: DataTypes.STRING,
}, { sequelize, modelName: 'login' });

class Locate extends Model {}
Locate.init({
  street_number: DataTypes.INTEGER,
  street_name: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
  postcode: DataTypes.STRING,
  coordinates_latitude: DataTypes.STRING,
  coordinates_longitude: DataTypes.STRING,
}, { sequelize, modelName: 'locate' });

class Timezone extends Model {}
Timezone.init({
    offset: DataTypes.STRING,
    description: DataTypes.STRING,
}, { sequelize, modelName: 'timezone'});

Timezone.hasMany(Locate);
Locate.belongsTo(Timezone);
Locate.hasMany(User);
User.hasOne(Login);
Login.belongsTo(User);
User.belongsTo(Locate);

module.exports = {User, Locate, Login, Timezone};