import React, { Component } from "react";
import { Image, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { View, Container, Header, Button } from "native-base";
import Swiper from "react-native-swiper";
import EmotionService from "../services/EmotionService";
import Utils from "../Utils";

class Quizz extends Component {
  constructor(props) {
    super(props);
    this.Utils = new Utils();
    this.EmotionService = new EmotionService();
    this.state = {
      emotions: [],
    };
  }

  async componentDidMount() {
    await this.EmotionService.getEmotions(async (res) => {
      if (res.status === 200) {
        const { emotions } = res.data;
        console.log("emotions");
        console.log(emotions);
        this.setState({ emotions});
      }
    });
  }

  mapEmotions(emotion) {
    const { _id, name } = emotion;
    const source = this.Utils.getEmotionIcon(name);
    return (
      <View key={_id} style={[styles.outer]}>
        <Image source={source} style={styles.image} />
        <Text style={styles.emotion}>{name.toUpperCase()}</Text>
        <Button rounded style={styles.button} onPress={() =>this.props.navigation.navigate('Events')}>
            <Text style={styles.textButton}>CHECK EVENTS</Text>
          </Button>
      </View>
    );
  }


  render() {
    const { emotions } = this.state;
    const emotionsDiv = emotions.map(this.mapEmotions.bind(this));
    return (
      <Container>
        <Header transparent>
          <Text style={styles.header}>JANE DOE, WHAT ARE YOU FEELING?</Text>
        </Header>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={styles.container}
        >
          {emotionsDiv}
        </ScrollView>
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
  },
  innerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  image: {
    height: 230,
    width: 360,
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
    fontWeight: "bold",
    color: "#9C67B6",
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#9C67B6',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Quizz;
