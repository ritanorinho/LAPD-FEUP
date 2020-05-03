import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Card,
  Text,
  Button,
} from "native-base";
import { withNavigation } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import UserService from "../services/UserService";

class Login extends Component {
  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      spinner: false,
    };
    this.UserService = new UserService();
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    this.UserService.login(this.state, async (res) => {
      if (res.status === 200) {
        this.props.navigation.navigate("Profile");
      } else console.log(res.response.data);
      this.setState({ spinner: false });
    });
  }

  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Card transparent style={styles.item}>
          <Image style={styles.image} source={require("../assets/logo.png")} />
          <Form>
            <Label style={styles.label}> EMAIL </Label>
            <Item rounded>
              <Input onChangeText={(val) => this.setState({ username: val })} />
            </Item>
            <Label style={styles.label}>PASSWORD</Label>
            <Item rounded>
              <Input
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(val) => this.setState({ password: val })}
              />
            </Item>
            <Item style={styles.textItem}>
              <Text style={styles.grayText}> Don't have an account? </Text>
            </Item>
            <Item style={styles.textItem}>
              <Text
                style={styles.purpleText}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                Create one!
              </Text>
            </Item>
            <Button
              style={styles.button}
              rounded
              onPress={(event) => this.onSubmit(event)}
              //onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Text>LOGIN</Text>
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    marginBottom: 20,
    alignSelf: "center",
  },
  textItem: {
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "transparent",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#8b4da9",
    marginTop: 10,
    justifyContent: "center",
  },
  purpleText: {
    color: "#8b4da9",
    fontWeight: "bold",
  },
  label: {
    color: "#8b4da9",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  grayText: {
    color: "gray",
    fontWeight: "bold",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default withNavigation(Login);
