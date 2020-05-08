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
  Radio
} from 'native-base'
import { withNavigation } from 'react-navigation'
import UserService from '../services/UserService'
class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        name: '',
        photo: ''
      }
    }
    this.UserService = new UserService()
  }

  async componentDidMount () {
    await this.UserService.getUser(res => {
      if (res.status === 200) {
        const { payload } = res.data
        this.setState({
          user: {
            name: payload.name,
            photo: payload.photo,
            email: payload.email
          }
        })
      }
    })
  }
  static navigationOptions = {
    title: 'Settings'
  }
  render () {
    return (
        <Content padder>
          <Card style={{ flex: 0 }} transparent>
            <CardItem>
            <Left>
            <Thumbnail
                source={require('../assets/profile-picture.jpg')}
                large
              ></Thumbnail>
            <Body>
            <Text style={styles.cardText}>{this.state.user.name}</Text>
            </Body>
            </Left>
            </CardItem>
          </Card>
          <Text style={styles.optionTitle}>ACCOUNT</Text>
          <Card>
            <CardItem bordered>
              <Body>
               <Button transparent><Text style={styles.buttonText}>Sign out</Text></Button>
              </Body>
            </CardItem>
          </Card>
          <Text style={styles.optionTitle}>EMOTION RECOGNITION</Text>
          <Card>
            <ListItem>
            <Left>
              <Text style={styles.buttonText}>CAMERA OR IMAGE UPLOAD</Text>
            </Left>
            <Right>
              <Radio color="#CBCBCB" selectedColor="#8b4da9" selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={styles.buttonText}>QUIZ</Text>
            </Left>
            <Right>
              <Radio color="#CBCBCB" selectedColor="#8b4da9"  selected={true} />
            </Right>
          </ListItem>
          </Card>
        </Content>
    )
  }
}

const styles = StyleSheet.create({
  cardItem: {
    justifyContent: 'center',
    paddingBottom: 0
  },
  cardText: {
    fontWeight: 'bold',
    color: '#464646',
    fontSize: 20,

  },
  buttonText: {
    color: '#8b4da9',
    paddingLeft: 0, 
    fontSize: 15,
  },
  optionTitle: {
    color: '#8b4da9',
    paddingLeft: 5,
    paddingTop: 30, 
    fontWeight: 'bold',
  },
})

export default withNavigation(Settings)
