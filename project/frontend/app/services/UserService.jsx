import axios from "axios";

export default class UserService {
  constructor() {
    this.baseURL = `http://192.168.1.8:4000/api/user`;
  }

  add(data, callback) {
    console.log("user service add")
   // const token = localStorage.getItem('token');
    axios
      .post(
        this.baseURL,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        // {
        //   headers: { Authorization: `Token ${token}` },
        // },
      )
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  }

  login(data, callback) {
    console.log("user service login")
    console.log(data)
    axios
      .post(`${this.baseURL}/login`, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  logout(callback) {
    //const token = localStorage.getItem("token");
    axios
      .post(
        `${this.baseURL}/logout`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        localStorage.setItem("token", "");
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
