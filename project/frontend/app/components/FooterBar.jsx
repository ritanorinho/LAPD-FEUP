import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import {  Footer, FooterTab, Button, Icon, Text } from "native-base";
import { withNavigation,NavigationEvents } from "react-navigation";
import UserService from "../services/UserService";
import Utils from "../Utils";

class FooterBar extends Component {
  constructor(props) {
    super(props);
    this.UserService = new UserService();
    this.Utils = new Utils();
    this.state = {
      redirect: "Quizz",
    };
  }

  async componentDidMount() {
   await this.load();
  }
  async load(){
    await this.UserService.getUser((res) => {
      if (res.status === 200) {
        const { payload } = res.data;
        const { settings } = payload;
        const redirect = this.Utils.getNavigation(settings)
        this.setState({ redirect });
      }
    });
  }

  render() {
    const {redirect } = this.state;
    return (
      <Footer>
       <NavigationEvents onDidFocus={() => this.load()} />
        <FooterTab style={{ backgroundColor: "#faecfa" }}>
          <Button vertical onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" style={{ color: "#8b4da9" }} />
            <Text style={{ color: "#8b4da9" }}>Back</Text>
          </Button>
          <Button
            onPress={() => {this.props.navigation.navigate(redirect)}}
            style={{
              alignSelf: "center",
              elevation: 4,
              height: 60,
              width: 60,
              bottom: 2,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 30,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
            }}
            active
          >
            <Image
              source={require("../assets/simplified-logo.png")}
              style={styles.logo}
            />
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Icon name="person" style={{ color: "#8b4da9" }} />
            <Text style={{ color: "#8b4da9" }}>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  circleButton: {
    alignSelf: "center",
    position: "absolute",
    elevation: 4,
    height: 70,
    width: 70,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#8b4da9",
    borderRadius: 35,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default withNavigation(FooterBar);
