export const getHostInformation = () => process.env.REACT_APP_IP;

export const POSTCORS = (data) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-ACCESS-TOKEN": process.env.REACT_APP_TOKEN,
    },
  };
};

export const CORS = {
  headers: {
    "X-ACCESS-TOKEN": process.env.REACT_APP_TOKEN,
  },
};

 