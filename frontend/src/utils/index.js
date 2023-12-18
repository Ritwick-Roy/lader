const getModelUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "";
      break;
    case "development":
      url = "http://localhost:8000";
      break;
    default:
      url = "http://localhost:8000";
  }
  return url;
};

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "";
      break;
    case "development":
      url = "http://localhost:5000";
      break;
    default:
      url = "http://localhost:5000";
  }
  return url;
};

module.exports= { getModelUrl,getBaseUrl };