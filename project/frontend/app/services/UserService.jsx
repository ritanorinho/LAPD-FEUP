import axios from "axios";
import { AsyncStorage } from "react-native";
import Utils from "../Utils";

export default class UserService {
  constructor() {
    this.Utils = new Utils();
    this.baseURL = this.Utils.getIp() + "/api/user";
  }

  async getUser(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    axios
      .get(`${this.baseURL}/current`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  async getPreferences(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    axios
      .get(`${this.baseURL}/preferences`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  add(data, callback) {
    axios
      .post(this.baseURL, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  async login(data, callback) {
    axios
      .post(`${this.baseURL}/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async (response) => {
        try {
          if (response.status === 200)
            await AsyncStorage.setItem("token", response.data.user.token);
        } catch (error) {
          console.log(error.message);
        }
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  async logout(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    axios
      .post(
        `${this.baseURL}/logout`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(async (response) => {
        try {
          await AsyncStorage.setItem("token", "");
        } catch (error) {
          console.log(error.message);
        }
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
  async updateSettings(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    axios
      .put(`${this.baseURL}/update`, {
        emotion_recognition: data.emotion_recognition,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
      )
      .then(async (response) => {
        try {
          await AsyncStorage.setItem("token", "");
        } catch (error) {
          console.log(error.message);
        }
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });


  }
}
