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
import DropdownAlert from "react-native-dropdownalert";
import UserService from "../services/UserService";

class Register extends Component {
  static navigationOptions = {
    title: "Register",
  };
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.UserService = new UserService();
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    this.UserService.add(this.state, async (res) => {
      if (res.status === 200) {
        const { email, password } = this.state;
        await this.UserService.login(
          { username: email, password },
          (response) => {
            if (res.status === 200) {
              this.props.navigation.navigate("Profile");
            }
          }
        );
      } else {
        if(res.response != undefined && res.response.status == 406) {
          this.dropDownAlertRef.alertWithType(
            "error",
            "Error",
            res.response.data.error
          );
        } else {
          if (res.response != undefined && res.response.status == 422) {
            this.dropDownAlertRef.alertWithType(
              "error",
              "Error",
              res.response.data.errors[0].msg
            );
          }
        }
      }
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
            <Label style={styles.label}> NAME </Label>
            <Item rounded>
              <Input onChangeText={(val) => this.setState({ name: val })} />
            </Item>
            <Label style={styles.label}> EMAIL </Label>
            <Item rounded>
              <Input onChangeText={(val) => this.setState({ email: val.trim() })} />
            </Item>
            <Label style={styles.label}>PASSWORD</Label>
            <Item rounded>
              <Input
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(val) => this.setState({ password: val.trim() })}
              />
            </Item>
            <Label style={styles.label}>CONFIRM PASSWORD</Label>
            <Item rounded>
              <Input secureTextEntry={true} style={styles.input} onChangeText={(val) => this.setState({ confirmPassword: val.trim() })}/>
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
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
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

export default withNavigation(Register);
