const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongo_URI');

const dbConnect = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Connected to database`)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = dbConnect;