import axios from "axios";
import { AsyncStorage } from "react-native";

export default class EventService {
  constructor() {
    this.baseURL = `http://192.168.1.8:4000/api/event`;
  }

  async getDetails(data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    const { eventId } = data;
    axios
      .get(`${this.baseURL}/${eventId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  async getSuggestions(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    const { eventId } = data;
    axios
      .get(`${this.baseURL}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
