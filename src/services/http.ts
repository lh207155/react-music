import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.102:3000",
});

// const { setErrorMessage } = useError();
// axios.interceptors.response.use(
//   (res) => res,
//   (error) => {

//   }
// );
