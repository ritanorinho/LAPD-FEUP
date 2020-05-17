import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  ListItem,
  List,
} from "native-base";
import { withNavigation, NavigationEvents } from "react-navigation";
import Utils from "../Utils";
import RecordEmotionService from "../services/RecordEmotionService";
import Spinner from "react-native-loading-spinner-overlay";

class Result extends Component {
  static navigationOptions = {
    title: "Result",
  };
  constructor(props) {
    super(props);
    this.Utils = new Utils();
    this.RecordEmotionService = new RecordEmotionService();
    this.state = {
      mainRecord: {},
      records: [],
      spinner: true,
      data: [],
      payload: {
        name: "",
      },

    };
  }

  async componentDidMount() {
  await this.load();
  }
  async load(){
    await this.RecordEmotionService.getAllStatistics((res) => {
      if (res.status === 200) {
        this.setState({
          records: res.data.emotions,
          payload: res.data.payload,
        });
        this.setChartData();
      }
    });
  }

  async setChartData() {
    let data = [];
    const { records } = this.state;
    records.sort((a, b) => (b.percentage > a.percentage ? 1 : -1));
    let mainRecord = {};
    let i = 0;
    for (let record of records) {
      let name = record.name;
      let color = this.Utils.getEmotionColor(name);
      let percentage = record.percentage;
      let path = this.Utils.getEmotionIcon(name);
      i++;
      if (i == 1) {
        mainRecord = {
          name,
          percentage,
          color,
          path,
        };
        continue;
      }
      data.push({
        name,
        percentage,
        color,
        path,
      });
    }
    this.setState({ data, spinner: false, mainRecord });
  }

  mapRecords(record) {
    return (
      <ListItem style={styles.listItem} key={record.name}>
        <Image source={record.path} style={styles.icon} />
        <Content contentContainerStyle={styles.container}>
          <Text
            style={{ color: record.color, fontWeight: "bold", fontSize: 15 }}
          >
            {record.name.toUpperCase()}
          </Text>
        </Content>
        <Body>
          <Text style={styles.percentage}> {record.percentage} </Text>
        </Body>
        <Right></Right>
      </ListItem>
    );
  }

  render() {
    const { data, mainRecord, payload, spinner } = this.state;
    const recordsDiv = data.map(this.mapRecords.bind(this));
    return (
      <Content padder>
         <NavigationEvents onDidFocus={() => this.load()} />
        <Spinner
          visible={spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
          <Header transparent>
            <Text
              style={styles.header}
            >{`${payload.name.toUpperCase()}, YOU ARE FEELING...`}</Text>
          </Header>
        )}
        {!spinner && (
          <Card transparent>
            <CardItem cardBody>
              <Image source={mainRecord.path} style={styles.image} />
            </CardItem>
            <CardItem style={styles.mainRecord}>
                <Text style={[styles.emotion, {paddingRight:40}]}>
                  {mainRecord.name.toUpperCase()}
                </Text>
                <Text style={[styles.percentage, {paddingLeft:35}]}>{mainRecord.percentage}</Text>
            </CardItem>
          </Card>
        )}
        <List>{recordsDiv}</List>
        {!spinner && (
          <Content>
            <Button
              rounded
              style={styles.button}
              onPress={() => this.props.navigation.navigate("Events")}
            >
              <Text style={styles.textButton}>CHECK EVENTS</Text>
            </Button>
          </Content>
        )}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  mainRecord: {
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: null,
    flex: 1,
    resizeMode: "contain",
  },
  emotion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#84B761",
  },
  percentage: {
    color: "#807878",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9C67B6",
  },
  icon: {
    height: 50,
    flex: 1,
    resizeMode: "contain",
    paddingLeft: 0,
  },
  listItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 5,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#9C67B6",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
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

export default withNavigation(Result);
