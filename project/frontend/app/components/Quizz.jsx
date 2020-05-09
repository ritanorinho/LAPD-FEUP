import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { View } from "native-base";

class Quizz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
          <View style={[styles.outer, { backgroundColor: "#00acee" }]}>
            <Text style={styles.innerText}>Welcome !</Text>
            <Text style={{ fontSize: 12, color: "#eee" }}>
              Made  by Madhav
            </Text>
          </View>
          <View style={[styles.outer, { backgroundColor: "#3b5998" }]}>
            <Text style={styles.innerText}>The End!</Text>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
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
    width: Dimensions.get ('window').width,
    height: Dimensions.get ('window').height,
  },
  innerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Quizz;
