const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UserLoginRegistration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connection successful..........")
}).catch((e) => {
    console.log("error occurred : ", e);
});
