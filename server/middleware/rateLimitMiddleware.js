const rateLimit = require("express-rate-limit");

//Define rate limit (Max 100 requests per 15 minutes per IP)

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1 minute
    max: 3, //Limit each IP to 3 requests per minute
    message: "Too many requests from this IP, please try again later.",
});

console.log("Rate limiting is being applied!");
module.exports = apiLimiter;