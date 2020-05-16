import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
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
import { withNavigation, NavigationEvents } from 'react-navigation'
import UserService from '../services/UserService'
class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
      }
    }
    this.UserService = new UserService()
  
  }
  async componentDidMount () {
    await this.load();
   
  }

  async load(){

    await this.UserService.getUser(res => {
      console.log(res);
      if (res.status === 200) {
        const { payload } = res.data
        console.log("SETTINGS "+res.data);
        this.setState({
          user: {
            name: payload.name,
            photo: payload.photo,
            email: payload.email,
            settings: payload.settings,
          }
        })
      }
    })

  }
  async handleChange(option){
  if (this.state.user.settings === option){
    console.log("same option");
  } else {
    await this.UserService.updateSettings(option,  async (res) => {
      if(res.status === 200) {
        
          this.setState({user: {
          name: this.state.user.name,
          settings: option,
        }});

        console.log("settings "+this.state.user.settings);
      }
      
      else {
        console.log("Error");
      }
  })
    
  }
}

  static navigationOptions = {
    title: 'Settings'
  }
  render () {
  
    
    return (
        <Content padder>
        <NavigationEvents onDidFocus={() =>this.load.bind(this)} />
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
              <Radio color="#CBCBCB" selectedColor="#8b4da9" selected={this.state.user.settings === "Camera" ? true: false} onPress={this.handleChange.bind(this, "Camera" )} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={styles.buttonText}>QUIZZ</Text>
            </Left>
            <Right>
              <Radio color="#CBCBCB" selectedColor="#8b4da9"  selected={this.state.user.settings === "Quizz" ? true: false} onPress={this.handleChange.bind(this, "Quizz" )} />
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
