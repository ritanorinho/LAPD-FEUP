import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import PreferencesForm from "./PreferencesForm";
import { withNavigation, NavigationEvents } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import UserService from "../services/UserService";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      events: [],
      preferences: [],
    };
    this.UserService = new UserService();
  }

  async load() {
    const load = await this.UserService.checkLoad();
    if (load) {
      await this.UserService.getPreferences(async (res) => {
        if (res.status == 200) {
          const { data } = res;
          const { events, preferences } = data;
          this.setState({ events, preferences });
        }
        this.setState({ spinner: false });
      });
    }
  }

  async componentDidMount() {
    await this.load();
  }

  mapPreferences(preference) {
    const { events } = this.state;
    const { _id } = preference.emotion;
    return (
      <PreferencesForm key={_id} preference={preference} events={events} />
    );
  }

  render() {
    return (
      <Content>
        <NavigationEvents onDidFocus={() => this.load()} />
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {!this.state.spinner &&
          this.state.preferences.map(this.mapPreferences.bind(this))}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default withNavigation(Preferences);
