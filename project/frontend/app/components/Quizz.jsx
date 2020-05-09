import React, { Component } from "react";
import { Image, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { View, Container, Header } from "native-base";
import Swiper from "react-native-swiper";

class Quizz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
      >
        <Header transparent>
          <Text style={styles.header}>JANE DOE, HOW YOU ARE FEELING...</Text>
        </Header>
        <Swiper
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={styles.container}
        >
          <View style={[styles.outer]}>
            <Image
              source={require("../assets/happy.png")}
              style={styles.image}
            />
            <Text style={styles.emotion}>HAPPY</Text>
          </View>
          <View style={[styles.outer, { backgroundColor: "#3b5998" }]}>
            <Text style={styles.innerText}>The End!</Text>
          </View>
        </Swiper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  image: {
    height: 225,
    flex: 0,
    resizeMode: "contain",
  },
  emotion: {
    marginTop: 22,
    fontSize: 30,
    fontWeight: "bold",
    color: "#84B761",
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C67B6'
  },
});

export default Quizz;
