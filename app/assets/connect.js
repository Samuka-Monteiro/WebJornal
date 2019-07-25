const mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect('mongodb://Evandro:123456@ds119090.mlab.com:19090/webjornal', { useNewUrlParser: true });

