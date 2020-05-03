export default class Utils {
  constructor() {}

  //CHANGE THIS TO RETURN CORRECT IP
  //TODO RETRIEVE CORRECT IP FROM .ENV FILE OR SOMETHING LIKE THAT
  getIp() {
    return `http://192.168.1.8:4000`;
  }

  getColor(categoryApiId) {
    switch (categoryApiId) {
      case "KZFzniwnSyZfZ7v7nJ": //music
        return "#73B4FC";
      case "KZFzniwnSyZfZ7v7nE": //sports
        return "#A1FEB4";
      case "KZFzniwnSyZfZ7v7na": //arts & theatre
        return "#A1FEB4";
      case "KZFzniwnSyZfZ7v7nn": //Film
        return "#A1FEB4";
      case "KZFzniwnSyZfZ7v7n1": //miscellaneous
        return "#FF9C9C";
      default:
        return "#464646"
    }
  }

  getEmotionIcon(emotionName) {
    switch (emotionName) {
      case "anger": 
        return require("../app/assets/angry.png");
      case "fear": 
        return require("../app/assets/scare.png");
      case "happiness": 
        return require("../app/assets/happy.png");
      case "neutral":
        return require("../app/assets/confused.png");
      case "sadness": 
        return require("../app/assets/crying.png");
      default:
        return require("../app/assets/confused.png");
    }
  }
}
