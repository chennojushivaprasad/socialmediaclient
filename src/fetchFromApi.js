import Cookies from "js-cookie";

const base_url = process.env.REACT_APP_BASE_URL;
const accessToken = Cookies.get("accessToken");

async function fetchFromApi(path, methodType,object = {}) {
  const url = `${base_url}${path}`;

  const options = {
    method: methodType,
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  if(["post","put","delete"].includes(methodType.toLowerCase())){
    options.body =  JSON.stringify(object)
  }

  const response = await fetch(url, options);

  return response;
}

export default fetchFromApi;
