import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, CardItem, Text, Button, Icon } from "native-base";
import { withNavigation } from "react-navigation";

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        id: "",
        image: "image",
        genre: "",
        date: "",
        location: "",
      },
    };
  }

  componentDidMount() {
    const { event } = this.props;
    let { name, id, images, dates, classifications, _embedded } = event;
    const { venues } = _embedded;
    const venue = venues[0];
    segment = classifications[0].segment;
    date = dates.start.localDate;
    const location =
      venue.name + ", " + venue.city.name + ", " + venue.country.countryCode;
    this.setState({
      event: {
        name,
        id,
        image: images[0].url,
        segment: segment.name,
        date,
        location,
      },
    });
  }

  render() {
    return (
      <TouchableOpacity
        key={this.state.event.id}
        onPress={() =>
          this.props.navigation.navigate("Event", {
            eventId: this.state.event.id,
          })
        }
      >
        <Card pointerEvents="none" style={styles.card}>
          <CardItem cardBody>
            <Image
              source={{
                uri: this.state.event.image,
              }}
              style={styles.imageStyle}
            />
          </CardItem>
          <CardItem>
            <View style={styles.rowContainer}>
              <View>
                <View style={styles.rowItem}>
                  <Text style={styles.text}>{this.state.event.name}</Text>
                </View>
                <View>
                  <Text adjustsFontSizeToFit style={styles.subtitleText}>
                    {this.state.event.date}
                  </Text>
                </View>
                <View>
                  <Text style={styles.subtitleText}>
                    {this.state.event.location}
                  </Text>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#464646",
    fontWeight: "bold",
  },
  subtitleText: {
    color: "#CBCBCB",
  },
  button: {
    alignSelf: "flex-end",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },

  rowItem: {
    flex: 1,
  },
  imageStyle: {
    height: 200,
    width: null,
    flex: 1,
  },
  card: {
    marginTop: 10,
  },
});

export default withNavigation(EventCard);
