import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Thumbnail
} from 'native-base'
import ProfileTabs from './ProfileTabs'
import { withNavigation } from 'react-navigation'
import { URL } from '../../utils/config'
class ProfileCard extends Component {
  static navigationOptions = {
    title: 'Profile'
  }
  constructor (props) {
    super(props)
    this.state = {
      user: {
        name:'',
        photo:'',
      }
    }
  }

  async componentDidMount () {
  
    let user = await this.getUser()
   

    this.setState({ user: {
      name: user[0].name,
      photo: user[0].photo,
      email: user[0].email,


    }})
   

  }

  async getUser () {
    let route = 'http://192.168.1.104:4000/api/user/5e9c2f80611a7140e2d61f22'
    return fetch(route, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
      .then(response =>  response.json())
      .then(json => {
        return json
      })
      .catch(error => {
        console.error(error)
      })
  }
  render () {
    return (
      <Content>
        <Card style={{ flex: 0 }} transparent>
          <CardItem style={styles.cardItem}>
            <Thumbnail
              source={require('../assets/profile-picture.jpg')}
              large
            ></Thumbnail>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.cardText}>{this.state.user.name}</Text>
          </CardItem>
          <CardItem style={{ paddingTop: 0, marginTop: 0 }}>
            <ProfileTabs />
          </CardItem>
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
    color: '#464646'
  }
})

export default withNavigation(ProfileCard)
