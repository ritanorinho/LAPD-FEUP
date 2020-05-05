import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Content, Card, CardItem, Text, List, ListItem } from "native-base";
import { withNavigation } from "react-navigation";
import EventService from "../services/EventService";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils";

class Event extends Component {
  static navigationOptions = {
    title: "Event",
  };

  constructor(props) {
    super(props);
    this.EventService = new EventService();
    this.Utils = new Utils();
    this.state = {
      spinner: true,
      event: {
        title: "",
        date: "",
        location: "",
        status: "",
        style: "",
        category: "",
        categoryApiId: "",
        info: "",
        tickets: "",
        path: "",
      },
    };
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    const eventId = params ? params.eventId : null;
    await this.EventService.getDetails({ eventId }, async (res) => {
      if (res.status == 200) {
        const { data } = res;
        const { details } = data;
        let {
          name,
          images,
          dates,
          classifications,
          _embedded,
          uri,
          info,
        } = details;
        if (info == undefined) info = "No additional information available...";
        const { venues } = _embedded;
        const venue = venues[0];
        genre = classifications[0].genre;
        segment = classifications[0].segment;
        date = dates.start.localDate;
        const { code } = dates.status;
        const location =
          venue.name +
          ", " +
          venue.city.name +
          ", " +
          venue.country.countryCode;
        this.setState({
          spinner: false,
          event: {
            title: name,
            date,
            location,
            status: code,
            style: segment.name,
            categoryApiId: segment.id,
            category: genre.name,
            info,
            tickets: uri,
            path: images[0].url,
          },
        });
      }
    });
  }

  typeStyles = function () {
    const { categoryApiId } = this.state.event;
    const color = this.Utils.getColor(categoryApiId);
    return {
      paddingRight: 10,
      color,
    };
  };

  render() {
    const { spinner, event } = this.state;
    const info = event.date + "\n" + event.location + "\n\n" + event.info;
    return (
      <Content>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
          <Card transparent>
            <CardItem cardBody>
              <Image
                source={{
                  uri: this.state.event.path,
                }}
                style={{ height: 150, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <List>
                <ListItem style={styles.listItem}>
                  <Text style={styles.title}>
                    {this.state.event.title.toUpperCase()}
                  </Text>
                </ListItem>
                <ListItem style={styles.listItem}>
                  <Text style={styles.statusText}>STATUS</Text>
                  <Text style={styles.statusDesc}>
                    {this.state.event.status.toUpperCase()}
                  </Text>
                </ListItem>
                <ListItem style={styles.listItem}>
                  <Text style={this.typeStyles()}>
                    {this.state.event.style.toUpperCase()}
                  </Text>
                  <Text style={styles.category}>
                    {this.state.event.category.toUpperCase()}
                  </Text>
                </ListItem>
              </List>
            </CardItem>
            <CardItem>
              <Card style={styles.card}>
                <CardItem style={styles.paddingTitle}>
                  <Text style={styles.cardTitle}>INFO</Text>
                </CardItem>
                <CardItem style={styles.paddingTitle}>
                  <Text style={styles.cardText}>{info}</Text>
                </CardItem>
              </Card>
            </CardItem>
            <CardItem>
              <Card style={styles.card}>
                <CardItem style={styles.paddingTitle}>
                  <Text style={styles.cardTitle}>TICKETS</Text>
                </CardItem>
                <CardItem style={styles.paddingTitle}>
                  <Text
                    style={styles.cardText}
                    onPress={() => Linking.openURL(this.state.event.tickets)}
                  >
                    To get a ticket for this event, click here!
                  </Text>
                </CardItem>
              </Card>
            </CardItem>
          </Card>
        )}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#464646",
    fontSize: 18,
  },
  listItem: {
    borderBottomColor: "transparent",
    paddingBottom: 0,
    paddingTop: 5,
  },
  type: {
    paddingRight: 10,
    color: "#FF9C9C",
  },
  category: {
    color: "#807878",
  },
  statusText: {
    paddingRight: 10,
    color: "#807878",
  },
  statusDesc: {
    color: "#E98C00",
  },
  card: {
    borderColor: "#803EA1",
    width: "100%",
  },
  cardTitle: {
    color: "#803EA1",
  },
  paddingTitle: {
    paddingTop: 1,
    paddingBottom: 10,
  },
  cardText: {
    color: "#807878",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default withNavigation(Event);
