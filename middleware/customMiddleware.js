const requestLogger = (req, res, next) => {
  const timeStamps = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get("User-Agent");
  console.log(`${timeStamps} ${method} ${url} - ${userAgent}`);
  next();
};

const addTimeStamp = (req, res, next) => {
  const timeStamps = new Date().toISOString();
  next();
};

module.exports = {
  requestLogger,
  addTimeStamp,
};
