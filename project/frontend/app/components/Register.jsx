import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Card,
  Text,
  Button,
} from "native-base";
import { withNavigation } from "react-navigation";
import UserService from "../services/UserService";

class Register extends Component {
  static navigationOptions = {
    title: "Register",
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.UserService = new UserService();
  }

  onSubmit(event) {
    event.preventDefault();
    this.UserService.add(this.state, (res) => {
      console.log("STATUS: " + res.status); //TODO
    });
  }

  render() {
    return (
      <Container>
        <Card transparent style={styles.item}>
          <Image style={styles.image} source={require("../assets/logo.png")} />
          <Form>
            <Label style={styles.label}> NAME </Label>
            <Item rounded>
              <Input onChangeText={(val) => this.setState({ name: val })} />
            </Item>
            <Label style={styles.label}> EMAIL </Label>
            <Item rounded>
              <Input onChangeText={(val) => this.setState({ email: val })} />
            </Item>
            <Label style={styles.label}>PASSWORD</Label>
            <Item rounded>
              <Input
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(val) => this.setState({ password: val })}
              />
            </Item>
            <Label style={styles.label}>CONFIRM PASSWORD</Label>
            <Item rounded>
              <Input style={styles.input} />
            </Item>
            <Item style={styles.textItem}>
              <Text style={styles.grayText}>Already have an account? </Text>
            </Item>
            <Item
              style={styles.textItem}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.purpleText}>Login</Text>
            </Item>
            <Button
              style={styles.button}
              rounded
              onPress={(event) => this.onSubmit(event)}
              //onPress={() =>this.props.navigation.navigate('Profile')}
            >
              <Text>CREATE ACCOUNT</Text>
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
});

export default withNavigation(Register);
