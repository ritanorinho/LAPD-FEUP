import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Content, Text, Button, Icon } from "native-base";
import PreferencesCard from "./PreferencesCard";
import { withNavigation } from "react-navigation";
import Utils from "../Utils";
class PreferencesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      events: [],
      preference: {},
    };
    this.Utils = new Utils();
  }

  componentDidMount() {
    const { events, preference } = this.props;
    this.setState({ events, preference, display: true });
  }

  mapCategory(event) {
    const { _id } = event.category;
    return (
      <PreferencesCard
        key={_id}
        preference={this.state.preference}
        event={event}
      />
    );
  }


  emotionTextStyles = function () {
    const { preference } = this.state;
    const color = this.Utils.getEmotionColor(preference.emotion.name);
    return {
      color,
      fontWeight: "bold",
    };
  };


  render() {
    const { events, preference, display } = this.state;
    const eventsForm = events.map(this.mapCategory.bind(this));
    if (display)
      return (
        <Content>
          <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
              <Text style={styles.text}>
                When I feel
                <Text style={this.emotionTextStyles()}> {preference.emotion.name} </Text>
                I like...
              </Text>
            </View>
          </View>
          {eventsForm}
        </Content>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#464646",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "flex-end",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 25,
  },
  rowItem: {
    flex: 1,
  },
});

export default withNavigation(PreferencesForm);
