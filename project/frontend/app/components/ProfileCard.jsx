import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Thumbnail,
} from "native-base";
import ProfileTabs from "./ProfileTabs";
import { withNavigation } from "react-navigation";
import UserService from "../services/UserService";
import Utils from "../Utils";

class ProfileCard extends Component {
  static navigationOptions = {
    title: "Profile",
  };
  constructor(props) {
    super(props);
    this.Utils = new Utils();
    this.state = {
      user: {
        name: "",
        photo: "",
      },
      emotionIcon: require("../assets/confused.png"),
    };
    this.UserService = new UserService();
  }


  async load() {
    await this.UserService.getUser((res) => {
      if (res.status === 200) {
        const { payload, emotionName } = res.data;
        const emotionIcon = this.Utils.getEmotionIcon(emotionName);
        this.setState({
          user: {
            name: payload.name,
            photo: payload.photo,
            email: payload.email,
          },
          emotionIcon,
        });
      }
    });
  }

  async componentDidMount() {
    await this.load();
  }

  render() {
    const { emotionIcon } = this.state;
    return (
      <Content>
        <Card style={{ flex: 0 }} transparent>
          <CardItem style={styles.cardItem}>
            <Thumbnail source={emotionIcon} large></Thumbnail>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.cardText}>{this.state.user.name}</Text>
          </CardItem>
          <CardItem style={{ paddingTop: 0, marginTop: 0 }}>
            <ProfileTabs />
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    justifyContent: "center",
    paddingBottom: 0,
  },
  cardText: {
    fontWeight: "bold",
    color: "#464646",
  },
});

export default withNavigation(ProfileCard);
