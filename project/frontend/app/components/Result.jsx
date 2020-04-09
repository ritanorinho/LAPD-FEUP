import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
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
  List
} from 'native-base'
export default class Result extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emotions: [
        {
          path: require('../assets/angry.png'),
          name: 'angry',
          percentage: '0.004%',
          color: '#CC4748'
        },
        {
          path: require('../assets/confused.png'),
          name: 'neutral',
          percentage: '0.363%',
          color: '#FDD400'
        },
        {
          path: require('../assets/crying.png'),
          name: 'sad',
          percentage: '0.378%',
          color: '#67B7DC'
        },
        {
          path: require('../assets/scare.png'),
          name: 'fear',
          percentage: '0.004%',
          color: '#CD82AD'
        }
      ]
    }
  }
  render () {
    const listItems = this.state.emotions.map(emotion => (
      <ListItem style={styles.listItem}>
        <Left style={{ paddingLeft: 0 }}>
          <Image source={emotion.path} style={styles.icon} />
          <Content contentContainerStyle={styles.container}>
            <Text
              style={{ color: emotion.color, fontWeight: 'bold', fontSize: 16}}
            >
              {emotion.name.toUpperCase()}
            </Text>
          </Content>
        </Left>
        <Body>
          <Text style={styles.percentage}> {emotion.percentage} </Text>
        </Body>
        <Right></Right>
      </ListItem>
    ))
    return (
      <Content>
        <Header transparent>
          <Text style={styles.header}>JANE DOE, HOW YOU ARE FEELING...</Text>
        </Header>
        <Card transparent>
          <CardItem cardBody>
            <Image
              source={require('../assets/happy.png')}
              style={styles.image}
            />
          </CardItem>
          <CardItem>
            <Left style={{ paddingLeft: 50 }}>
              <Text style={styles.emotion}>HAPPY</Text>
            </Left>
            <Body></Body>
            <Right style={{ paddingRight: 50 }}>
              <Text style={styles.percentage}>75.48%</Text>
            </Right>
          </CardItem>
        </Card>
        <List>{listItems}</List>
        <Content>
          <Button rounded style={styles.button}>
            <Text style={styles.textButton}>CHECK EVENTS</Text>
          </Button>
        </Content>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: null,
    flex: 1,
    resizeMode: 'contain'
  },
  emotion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#84B761'
  },
  percentage: {
    color: '#807878',
    fontSize: 18,
    fontWeight: 'bold'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C67B6'
  },
  icon: {
    height: 50,
    flex: 1,
    resizeMode: 'contain',
    paddingLeft: 0
  },
  listItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 5,
    justifyContent: 'flex-start'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#9C67B6',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
