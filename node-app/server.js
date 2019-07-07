const express = require('express')
const user = require('./routers/api/users')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const profile = require('./routers/api/profiles')

const app = express();

const port = process.env.port || 5000;

// app.get('/', (req, res) => {
//     res.send('hello')
// });
const db = require('./config/keys').mongodbURL;
mongoose.connect(db).then(() => console.log('数据库连接成功')).catch(error => {
    console.log(error);
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//配置passport
app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/users', user);
app.use('/api/profiles', profile);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})