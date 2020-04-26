import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
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
import { URL } from "../../utils/config";
import UserService from "../services/UserService";


class ProfileCard extends Component {
  static navigationOptions = {
    title: "Profile",
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        photo: "",
      },
    };
    this.UserService = new UserService();
  }

  async componentDidMount() {
    await this.UserService.getUser((res) => {
      if (res.status === 200){
        const {payload} = res.data;
        console.log(payload)
        this.setState({
          user: {
            name: payload.name,
            photo: payload.photo,
            email: payload.email,
          },
        });
      }
    });
  }

  render() {
    return (
      <Content>
        <Card style={{ flex: 0 }} transparent>
          <CardItem style={styles.cardItem}>
            <Thumbnail
              source={require("../assets/profile-picture.jpg")}
              large
            ></Thumbnail>
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
