import axios from "axios";
import { AsyncStorage } from "react-native";
import Utils from "../Utils";

export default class UegService {
  constructor() {
    this.Utils = new Utils();
    this.baseURL = this.Utils.getIp() + "/api/userEmotionGenre";
  }

  async add(data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    const { emotionId, genreId } = data;
    axios
      .post(
        this.baseURL,
        {
          genreId,
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

  async delete(data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    const { _id } = data;
    axios
      .delete(`${this.baseURL}/${_id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  }
}
