import axios from 'axios'
import { AsyncStorage } from "react-native";
export default class DetectService {
  constructor () {
    this.baseURL = `http://192.168.1.104:4000/api/detect/`
  }

  async sendPhoto (data, callback) {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
      console.log("token 5 "+token);
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
