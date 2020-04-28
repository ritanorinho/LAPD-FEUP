import axios from "axios";
import { AsyncStorage } from "react-native";

export default class DetectService {
  constructor() {
    this.baseURL = `http://192.168.1.104:4000/api/detect`;
  }


  sendPhoto(data, callback) {
    axios
      .post(this.baseURL+"/base64", {
        photo: data,
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
