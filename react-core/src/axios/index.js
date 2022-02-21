import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://restapi.adequateshop.com/api",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default instance;
