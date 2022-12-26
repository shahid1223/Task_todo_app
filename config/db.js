const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = () => {
    try {
        mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true }, { useCreateIndex: true }, { useFindAndModify: false })
            .then(con => {
                console.log("connected to mongoDB successfully")
            }).catch(err => {
                console.error(err)
            })
    } catch (error) {
        console.error(error.message);
        exit(1)
    }
};

module.exports = connectToMongo;