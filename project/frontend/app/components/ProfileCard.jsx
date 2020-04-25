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
  }

  async componentDidMount() {
    let user = await this.getUser();

    this.setState({
      user: {
        name: user.name,
        photo: user.photo,
        email: user.email,
      },
    });
  }


  async getUser() {
    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }
    let route = "http://192.168.1.8:4000/api/user/5e9c2f81611a7140e2d61f23";
    return fetch(route, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return json.user[0];
      })
      .catch((error) => {
        console.error(error);
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
