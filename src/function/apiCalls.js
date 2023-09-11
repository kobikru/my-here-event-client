import axios from "axios";

const PORT = process.env.PORT ? process.env.PORT : 5000;

const apiCalls = async (
  method,
  url,
  information = null,
  param = null,
  header = null
) => {
  const baseUrl = process.env.REACT_APP_BASE_URL ;
  // const baseUrl = "https://server-production-7ef9.up.railway.app";

  const fullUrl = `${baseUrl}/api/${url}`;
  try {
    const data = await axios({
      method: method,
      url: fullUrl,
      data: information,
      params: { q: param },
      headers: { ...header, authorization: "Bearer " + localStorage.Token },
    });
    // console.log("******************", data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default apiCalls;
