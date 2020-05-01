import EventCard from "./EventCard";
import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Container, Content, Text, Icon, Button } from "native-base";
import { withNavigation } from "react-navigation";
import EventService from "../services/EventService";
import Spinner from 'react-native-loading-spinner-overlay';


class Events extends React.Component {
  static navigationOptions = {
    title: "Events",
  };

  constructor(props) {
    super(props);
    this.EventService = new EventService();
    this.state = {
      spinner: true,
      events: []
    }
  }

  async componentDidMount() {
    await this.EventService.getSuggestions(async (res) => {
      if (res.status == 200) {
        const {data} = res;
        this.setState({ events: data.suggestions, spinner: false });
      }
    });
  }

  mapEvents(event) {
    return (
      <EventCard event={event} />
    )
  }

  render() {
    const {events} = this.state;
    const eventsDiv = events.map(
      this.mapEvents.bind(this),
    );
    return (
      <Content>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.text}>EVENTS</Text>
          </View>
          <View style={styles.rowItem}>
            <Image
              source={require("../assets/happy.png")}
              style={styles.emotion}
            ></Image>
          </View>
        </View>
        {eventsDiv}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#464646",
    fontWeight: "bold",
    paddingLeft: 15,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  rowItem: {
    flex: 1,
    paddingTop: 15,
  },
  emotion: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    paddingTop: 15,
    marginRight: 100,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default withNavigation(Events);
