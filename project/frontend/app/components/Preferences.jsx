import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import PreferencesForm from "./PreferencesForm";
import { withNavigation } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import Utils from "../Utils";
import UserService from "../services/UserService";



class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      events: [],
      preferences : []
    };
    this.UserService = new UserService();
    this.Utils = new Utils();
  }

  async componentDidMount() {
    await this.UserService.getPreferences(async (res) => {
      if (res.status == 200) {
        const {data} = res;    
        const {events, preferences} = data;  
        console.log(data)
        this.setState({ events, preferences });
      }
      this.setState({spinner: false})
    });
  }

  render() {
    return (
      <Content>
         <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <PreferencesForm />
        <PreferencesForm />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});


export default withNavigation(Preferences);
