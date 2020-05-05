export default class Utils {
  constructor() {}

  //CHANGE THIS TO RETURN CORRECT IP
  //TODO RETRIEVE CORRECT IP FROM .ENV FILE OR SOMETHING LIKE THAT
  getIp() {
    return `http://192.168.1.8:4000`;
  }

  //TODO, GET MORE COLORS
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

  getEmotionColor(emotionName) {
    switch (emotionName) {
      case "anger": 
        return "#CC4748";
      case "fear": 
        return "#CD82AD";
      case "happiness": 
        return " #84B761";
      case "neutral":
        return "#FDD400";
      case "sadness": 
        return "#67B7DC";
      default:
        return "#FDD400";
    }
  }


}
