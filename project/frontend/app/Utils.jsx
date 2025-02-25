import { IP_ADR } from "react-native-dotenv";
export default class Utils {
  constructor() {}

  getIp() {
    return `http://${IP_ADR}:4000`;
  }

  getColor(categoryApiId) {
    switch (categoryApiId) {
      case "KZFzniwnSyZfZ7v7nJ": //music
        return "#73B4FC";
      case "KZFzniwnSyZfZ7v7nE": //sports
        return "#A1FEB4";
      case "KZFzniwnSyZfZ7v7na": //arts & theatre
        return "#D0AAFB";
      case "KZFzniwnSyZfZ7v7nn": //Film
        return "#FFCC87";
      case "KZFzniwnSyZfZ7v7n1": //miscellaneous
        return "#FF9C9C";
      default:
        return "#464646";
    }
  }
  getEmotionColor(emotion) {
    switch (emotion) {
      case "fear":
        return "#CD82AD";
      case "anger":
        return "#CC4748";
      case "happiness":
        return "#84B761";
      case "neutral":
        return "#FDD400";
      case "sadness": //miscellaneous
        return "#67B7DC";
      default:
        return "#464646";
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

  getNavigation(settings) {
    switch (settings) {
      case "Quiz":
        return "Quizz";
      case "Camera":
        return "EmotionEvaluate";
      default:
        return "EmotionEvaluate";
    }
  }
}
