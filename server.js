require("dotenv").config();
const express = require("express");

// Configs & Middleware Imports
const { configuredCors } = require("./config/cors.config.js");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware.js");
const { globalErrorHandler } = require("./middleware/errorHandler.js"); // Ensure this imports the handler function
const { createBasicRateLimiter } = require("./middleware/rateLimiting.js");

// Routes Imports
const itemsRoutes = require("./routes/item-routes.js");

const app = express();

//Global Middlewares 
app.use(requestLogger);
app.use(addTimeStamp);
app.use(configuredCors());
app.use(express.json());

// Rate Limiting 
app.use(createBasicRateLimiter());

//Routes
app.use("/api/v1", itemsRoutes);


//Global Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
