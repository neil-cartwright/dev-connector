const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongouri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongo DB Connected')
    } catch (err) {
        console.error(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;