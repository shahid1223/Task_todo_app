const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectToMongoDB = require('./config/db');

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`todo app running at ${process.env.BASEURL}${PORT}`)
})