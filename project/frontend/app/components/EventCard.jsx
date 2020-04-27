import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, CardItem, Text, Button, Icon } from "native-base";
import { withNavigation } from "react-navigation";

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        id: "",
        image: "",
        genre: "",
        date: "",
        location: ""
      }
    }
  }

   componentDidMount(){
    const { event } =  this.props;
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
      }
    })
  }

  render() {
    return (
      <Card style={styles.card}>
        <CardItem cardBody>
          <Image
            source={{
              uri: this.state.event.image
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
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.subtitleText}>{this.state.event.date}</Text>
                </View>
                <View>
                  <Text style={styles.subtitleText}> {this.state.event.location}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <Button
                style={styles.button}
                transparent
                onPress={
                  (() => this.props.navigation.navigate("Event",
                  {
                    eventId: this.state.event.id,
                  }))
                }
              >
                <Icon name="arrow-forward" style={{ color: "#8b4da9" }} />
              </Button>
            </View>
          </View>
        </CardItem>
      </Card>
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
