import React, { Component } from "react";
import { Image, StyleSheet, Linking } from "react-native";
import { Card, CardItem, Text, Container, Content } from "native-base";
import { withNavigation } from "react-navigation";

class Help extends Component {
  static navigationOptions = {
    title: "Help",
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <Card transparent style={styles.item}>
          <Image style={styles.image} source={require("../assets/logo.png")} />
          <CardItem>
            <Card style={styles.card}>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardTitle}>ABOUT US</Text>
              </CardItem>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardText}>
                  Mentis is a simple and intuitive application that suggests
                  events according to the mood of the user, reconciling what he
                  likes to do with the way he feels.
                </Text>
              </CardItem>
            </Card>
          </CardItem>
          <CardItem>
            <Card style={styles.card}>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardTitle}>USAGE</Text>
              </CardItem>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardText}>
                  Mentis allows the match of types of events according to
                  different emotions in the profile's preferences section. These
                  preferences are then used when the app evaluates the user's
                  current mood in order to suggest appropriate events. The
                  emotion recognition process can be done via facial recognition
                  or quizz. The user can set this in the settings page. The user
                  can also view the details of any suggested event and the
                  statistics of the last emotion recognition.
                </Text>
              </CardItem>
            </Card>
          </CardItem>
          <CardItem>
            <Card style={styles.card}>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardTitle}>APIS</Text>
              </CardItem>
              <CardItem style={styles.paddingTitle}>
                <Text style={styles.cardText}>
                  Mentis uses{" "}
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        "https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/"
                      )
                    }
                  >
                    Ticketmaster Discovery API{" "}
                  </Text>
                  for events and
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        "https://console.faceplusplus.com/documents/5679127"
                      )
                    }
                  >
                    {" "}
                    Face++ API{" "}
                  </Text>
                  for the facial recognition.
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
  image: {
    marginBottom: 20,
    alignSelf: "center",
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
  link: {
    color: "#803EA1",
  },
});

export default withNavigation(Help);
