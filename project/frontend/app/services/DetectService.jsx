import axios from 'axios'
import { AsyncStorage } from "react-native";
import Utils from "../Utils"


export default class DetectService {
  constructor () {
    this.Utils = new Utils();
    this.baseURL = this.Utils.getIp() + "/api/detect/"
  }

  async sendPhoto (data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
   
    axios
      .post(this.baseURL , {photo: data}, {
       headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        callback(error)
      })
  }
}
