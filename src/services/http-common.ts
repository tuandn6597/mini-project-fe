import axios from "axios";
const token = localStorage.getItem("auth");

export default axios.create({
  baseURL: "http://localhost:5678/api/v1",
  headers: {
    "Content-type": "application/json",
    ...token && { "Authorization": `Bearer ${token}` },
  }
});