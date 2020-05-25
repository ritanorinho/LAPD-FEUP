import React, { Component } from "react";
import { Image, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { View, Container, Header, Button } from "native-base";
import EmotionService from "../services/EmotionService";
import RecordEmotionService from "../services/RecordEmotionService";
import { withNavigation } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import Utils from "../Utils";

class Quizz extends Component {
  constructor(props) {
    super(props);
    this.Utils = new Utils();
    this.EmotionService = new EmotionService();
    this.RecordEmotionService = new RecordEmotionService();
    this.state = {
      spinner: true,
      emotions: [],
      payload: {
        name: "",
      },
    };
  }

  async componentDidMount() {
    await this.EmotionService.getEmotions((res) => {
      if (res.status === 200) {
        const { emotions, payload } = res.data;
        this.setState({ emotions, payload, spinner: false });
      }
    });
  }

  async handleChange(emotion) {
    await this.RecordEmotionService.add({ emotionId: emotion._id }, (res) => {
      if (res.status === 200) {
        this.props.navigation.navigate("Events");
      }
    });
  }

  mapEmotions(emotion) {
    const onChange = () => {
      this.handleChange(emotion);
    };
    const { _id, name } = emotion;
    const source = this.Utils.getEmotionIcon(name);
    const color = this.Utils.getEmotionColor(name);
    return (
      <View key={_id} style={[styles.outer]}>
        <Image source={source} style={styles.image} />
        <Text style={[styles.emotion, { color }]}>{name.toUpperCase()}</Text>
        <Button rounded style={[styles.button]} onPress={onChange}>
          <Text style={styles.textButton}>CHECK EVENTS</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { emotions, payload, spinner } = this.state;
    const { name } = payload;
    const emotionsDiv = emotions.map(this.mapEmotions.bind(this));
    return (
      <Container>
        <Spinner
          visible={spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
        
            <Text
              style={styles.header}
            >{`${name.toUpperCase()}, WHAT ARE YOU FEELING?`}</Text>
        )}
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
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#9C67B6",
    alignSelf: "center",
    paddingTop: 10, 

  },
  button: {
    justifyContent: "center",
    backgroundColor: "#9C67B6",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default withNavigation(Quizz);
