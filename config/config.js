const dotenv = require("dotenv").config();
module.exports={
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    googleClientSec: process.env.GOOGLE_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID
}
