import React, { Component } from "react";
import { List, ListItem, Radio, Text, Card, CardItem } from "native-base";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import Utils from "../Utils";
import UegService from "../services/UegService";


class PrefencesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      event: [],
      preference: {},
    };
    this.Utils = new Utils();
    this.UegService = new UegService();
  }

  componentDidMount() {
    const { event, preference } = this.props;
    this.setState({ event, preference, display: true });
  }

  isPreference(genre) {
    const { preference } = this.state;
    const {uegs} = preference
    let elems = uegs.filter( ueg => ueg.genreId == genre._id );
    let selected = false;
    if(elems.length > 0)
      selected = true;
    return selected;
  }

  getPreference(genre){
    const { preference } = this.state;
    const {uegs} = preference
    let elems = uegs.filter( ueg => ueg.genreId == genre._id );
    if(elems.length > 0)
      return elems[0]
    return null;
  }

  handleChange(genre) {
    const { preference } = this.state;

    const selected = this.isPreference(genre);
    if(selected) {
      const preUeg = this.getPreference(genre);
      this.UegService.delete({_id: preUeg._id}, async () => {
        let elems = preference.uegs.filter( ueg => ueg.genreId != genre._id );
        const newPreference = {emotion: preference.emotion, uegs: elems};
        this.setState({preference: newPreference});
      });
    } else {
        this.UegService.add({genreId: genre._id, emotionId: preference.emotion._id}, async (res) => {
          if(res.status == 200) {
            const elems = [res.data.ueg, ...preference.uegs];
            const newPreference = {emotion: preference.emotion, uegs: elems};
            this.setState({preference: newPreference});
          }
        });
    }
  }

  mapGenres(genre) {
    const onChange = () => {
      this.handleChange(genre);
    };
    const { _id, name } = genre;

    const selected = this.isPreference(genre)

    return (
      <ListItem style={styles.option} key={_id}>
        <Radio selected={selected} color="#803EA1" selectedColor="#803EA1" onPress={onChange} />
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
            <List>{listItems}</List>
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
