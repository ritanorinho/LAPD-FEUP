import axios from "axios";
import {AsyncStorage } from "react-native";
 
export default class UserService {
  constructor() {
    this.baseURL = `http://192.168.1.8:4000/api/user`;
  }

  async getUser(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
      console.log(token)
    } catch (error) {
      console.log(error.message);
    }
    axios
      .get(
        `${this.baseURL}/current`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      )
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  add(data, callback) {
    axios
      .post(
        this.baseURL,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      )
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  login(data, callback) {
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
     let token = "";
    // try {
    //   token = (await AsyncStorage.getItem("token")) || "";
    // } catch (error) {
    //   console.log(error.message);
    // }
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
