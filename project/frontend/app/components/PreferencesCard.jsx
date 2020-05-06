import React, { Component } from "react";
import { List, ListItem, Radio, Text, Card, CardItem } from "native-base";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import Utils from "../Utils";

class PrefencesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      event: [],
      preference: {},
    };
    this.Utils = new Utils();
  }

  componentDidMount() {
    const { event, preference } = this.props;
    this.setState({ event, preference, display: true });
  }

  mapGenres(genre) {
    const { _id, name } = genre;
    return (
      <ListItem style={styles.option} key={_id}>
        <Radio selected={false} color="#803EA1" selectedColor="#CBCBCB" />
        <Text style={styles.textOption}>{name}</Text>
      </ListItem>
    );
  }

  cardStyles = function () {
    const { category } = this.state.event;
    const backgroundColor = this.Utils.getColor(category.apiId);
    return {
      backgroundColor,
      paddingTop: 0,
    };
  };

  cardTextStyles = function () {
    const { category } = this.state.event;
    const backgroundColor = this.Utils.getColor(category.apiId);
    return {
      alignSelf: "flex-end",
      backgroundColor,
      paddingBottom: 0,
    };
  };

  render() {
    const { event, display } = this.state;
    if (display) {
      const { category, genres } = event;
      const listItems = genres.map(this.mapGenres.bind(this));
      return (
        <Card style={this.cardStyles()}>
          <CardItem style={this.cardTextStyles()}>
            <Text style={styles.title}>{category.name.toUpperCase()}</Text>
          </CardItem>
          <CardItem style={this.cardStyles()}>
            <List>
              {listItems}
            </List>
          </CardItem>
        </Card>
      );
    } else return null;
  }
}

const styles = StyleSheet.create({

  title: {
    color: "#803EA1",
    fontWeight: "bold",
  },
  textOption: {
    color: "#464646",
    paddingLeft: 5,
    fontWeight: "bold",
  },
  option: {
    borderBottomWidth: 0,
    paddingBottom: 2,
    paddingTop: 5,
    marginBottom: 10,
  },
  radio: {
    borderColor: "white",
  },
});

export default withNavigation(PrefencesCard);
