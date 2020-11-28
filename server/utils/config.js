if (process.env.NODE_ENV === "production") {
  module.exports = require('./prod')
}
else {
  module.exports = require('./dev')
}


// "mongodb+srv://sarvesh:radhika8@kiettalkswebapp.iti87.mongodb.net/mini-project?retryWrites=true&w=majority",


// mongodb://127.0.0.1:27017/kiet-talks-app
