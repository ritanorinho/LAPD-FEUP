import axios from "axios";
import { AsyncStorage } from "react-native";
import Utils from "../Utils";

export default class RecordEmotionService {
  constructor() {
    this.Utils = new Utils();
    this.baseURL = this.Utils.getIp() + "/api/recordEmotion";
  }

  async add(data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    const { emotionId } = data;
    axios
      .post(
        this.baseURL,
        {
          emotionId,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  async getResults(callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    axios
      .get(`${this.baseURL}/results`, {
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
