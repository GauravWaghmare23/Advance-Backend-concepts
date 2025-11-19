const cors = require("cors");

const configuredCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", // local development
        "https://yourCustomDomain.com", // for production
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // giving permission so the request can be allowed
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });
};

module.exports = {
  configuredCors
};
