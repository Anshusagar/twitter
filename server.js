const dotenv = require('dotenv')
const app = require('./app');
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);


mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Connected successfully to Mongo DB');
});

const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})


