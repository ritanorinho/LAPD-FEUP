import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Content, Card, CardItem, Text, List, ListItem } from "native-base";
import { withNavigation } from "react-navigation";
import EventService from "../services/EventService";

class Event extends Component {
  static navigationOptions = {
    title: "Event",
  };
  constructor(props) {
    super(props);
    this.EventService = new EventService();
    this.state = {
      event: {
        title: "",
        date: "",
        location: "",
        status: "",
        style: "",
        category: "",
        info:
          "The Coachella Valley Music and Arts Festival is an annual music and arts festival held at the Empire Polo Club in Indio, California, in the Coachella Valley in the Colorado Desert.",
        tickets:
          "https://www.ticketexchangebyticketmaster.com/coachella-music-festival-tickets-indio-ca/tickets/2709497?PID=2709497",
        path: "https://s1.ticketm.net/dam/a/c63/98b72144-ea0b-4727-a4b1-4da7329b0c63_1252111_EVENT_DETAIL_PAGE_16_9.jpg",
      },
    };
  }

  async componentDidMount() {
    const eventId = "Z7r9jZ1Aeja39"; //TODO CHANGE TO RECEIVE IN PROPS
    await this.EventService.getDetails({ eventId }, async (res) => {
      if (res.status == 200) {
        const {data} = res;
        const {details} = data;
        const {name, images, dates, classifications, _embedded, uri} = details;
        const {venues} = _embedded;
        const venue = venues[0];

        // const {classifications, dates} = data;
        genre = classifications[0].genre;
        segment = classifications[0].segment;
        date = dates.start.localDate;
        const {code} = dates.status;
        const location = venue.name + ", " + venue.city.name + ", " + venue.country.countryCode
        //const {code} = status;
        this.setState({
          event: {
            title: name,
            date,
            location,
            status: code,
            style: segment.name,
            category: genre.name,
            info:
              "The Coachella Valley Music and Arts Festival is an annual music and arts festival held at the Empire Polo Club in Indio, California, in the Coachella Valley in the Colorado Desert.",
            tickets: uri,
            path: images[0].url,
            },
        });
      }
    });
  }

  render() {
    return (
      <Content>
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
                <Text style={styles.type}>
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
                <Text style={styles.cardText}>{this.state.event.info}</Text>
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
                  onPress={() => Linking.openURL(this.state.event.style)}
                >
                  To get a ticket for this event, click here!
                </Text>
              </CardItem>
            </Card>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#FF9C9C",
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
});
export default withNavigation(Event);
