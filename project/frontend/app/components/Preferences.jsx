import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import PreferencesForm from "./PreferencesForm";
import { withNavigation } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
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
  }

  async componentDidMount() {
    await this.UserService.getPreferences(async (res) => {
      if (res.status == 200) {
        const {data} = res;    
        const {events, preferences} = data;  
        this.setState({ events, preferences });
      }
      this.setState({spinner: false})
    });
  }

  mapPreferences(preference) {
    const {events} = this.state;
    const {_id} = preference.emotion;
    return (
      <PreferencesForm key={_id} preference={preference} events={events}/>
    )
  }

  render() {
    const {preferences, spinner} = this.state;
    const preferencesForm = preferences.map(
      this.mapPreferences.bind(this),
    );
    return (
      <Content>
         <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && preferencesForm}
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
