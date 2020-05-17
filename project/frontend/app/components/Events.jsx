import EventCard from "./EventCard";
import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Content, Text, Card, CardItem, Body } from "native-base";
import { withNavigation } from "react-navigation";
import EventService from "../services/EventService";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils";

class Events extends React.Component {
  static navigationOptions = {
    title: "Events",
  };

  constructor(props) {
    super(props);
    this.Utils = new Utils();
    this.EventService = new EventService();
    this.state = {
      spinner: true,
      events: [],
      source: require("../assets/confused.png"),
      hasPreferences: true,
      hasSuggestions: true,
    };
  }

  async componentDidMount() {
    await this.EventService.getSuggestions(async (res) => {
      if (res.status == 200) {
        const { data } = res;
        const source = this.Utils.getEmotionIcon(data.emotionName);
        const { suggestions, hasPreferences, hasSuggestions } = data;
        this.setState({
          events: suggestions,
          spinner: false,
          source,
          hasPreferences,
          hasSuggestions,
        });
      }
    });
  }

  mapEvents(event) {
    const r = Math.floor(Math.random() * 100);
    const key = event.id + r;
    return <EventCard event={event} key={key} />;
  }

  render() {
    const {
      events,
      source,
      spinner,
      hasPreferences,
      hasSuggestions,
    } = this.state;
    const eventsDiv = events.map(this.mapEvents.bind(this));
    return (
      <Content>
        <Spinner
          visible={spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.text}>EVENTS</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={source} style={styles.emotion}></Image>
          </View>
        </View>
        {!hasPreferences && (
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.textColor}>
                  There are no events to show. After setting your events
                  preferences in your profile you will be able to receive
                  suggestions of events here.
                </Text>
              </Body>
            </CardItem>
          </Card>
        )}
        {!hasSuggestions && hasPreferences && (
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.textColor}>
                  There are no events to show.
                </Text>
              </Body>
            </CardItem>
          </Card>
        )}
        {!this.state.spinner && eventsDiv}
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
    color: "#FFF",
  },
  textColor: {
    color: "#8b4da9",
  },
  card: {
    marginTop: 100,
  },
});

export default withNavigation(Events);
