//URL/Path Versioning
const apiVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({ message: "Api version is not supported" });
  }
};

//Header Versioning
const headerVersioning = (version) => (req, res, next) => {
  if (req.get("accept-version") === version) {
    next();
  } else {
    res.status(406).json({ message: "Api version is not supported" });
  }
};

//Content-Type Versioning
const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("content-type");

  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version}+json`)
  ) {
    next();
  } else {
    res.status(406).json({ message: "Api version is not supported" });
  }
};

module.exports = {
  apiVersioning,
  headerVersioning,
  contentTypeVersioning,
};
