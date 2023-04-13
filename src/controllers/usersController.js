const axios = require('axios');
const sequelize = require('sequelize');
const { User, Login, Locate, Timezone } = require('../models/models');

async function getUsers(req, res) {
    const response = await axios.get('https://randomuser.me/api/');
    const users = response.data.results;

    try {
        for (const userData of users) {
            const { gender, name, location, dob, email, phone, cell, login, nat, id } = userData;
            const { title, first, last } = name;
            const { street, city, state, country, postcode, coordinates } = location;
            const { number, name: streetName } = street;
            const { latitude, longitude } = coordinates;

            const [timezone, createdTimezone] = await Timezone.findOrCreate({
                where: {
                  offset: userData.location.timezone.offset,
                  description: userData.location.timezone.description,
                }
            });
            const [locate, createdLocate] = await Locate.findOrCreate({
                where: {
                  street_number: parseInt(number),
                  street_name: String(streetName),
                  city: city,
                  state: state,
                  country: country,
                  postcode: String(postcode),
                  coordinates_latitude: String(latitude),
                  coordinates_longitude: String(longitude),
                  timezoneId: timezone.id
                }
            });
            const [user, createdUser] = await User.findOrCreate({
                where: {
                  email: email,
                },
                defaults: {
                  gender: gender,
                  title: title,
                  first: first,
                  last: last,
                  date: dob.date,
                  age: dob.age,
                  phone: phone,
                  cell: cell,
                  nat: nat,
                  id_name: id.name,
                  id_value: id.value,
                  locateId: locate.id,
                }
            });
            const [newLogin, createdNewLogin] = await Login.findOrCreate({
                where: {
                  uuid: login.uuid,
                },
                defaults: {
                  username: login.username,
                  password: login.password,
                  salt: login.salt,
                  md5: login.md5,
                  sha1: login.sha1,
                  sha256: login.sha256,
                  userId: user.id
                }
            });
        }
        return res.status(200).json({ data: 'OK' });      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }

}

module.exports = {
    getUsers
}