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
import {
  withNavigation,
  NavigationEvents,
  NavigationActions,
  StackActions
} from 'react-navigation'
import UserService from '../services/UserService'
import Utils from '../Utils'
import Spinner from 'react-native-loading-spinner-overlay'
import LoginScreen from '../screens/LoginScreen'
class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      emotionName: require('../assets/confused.png'),
      spinner: true
    }
    this.UserService = new UserService()
    this.Utils = new Utils()
  }
  async componentDidMount () {
    await this.load()
  }

  async load () {
    await this.UserService.getUser(res => {
      if (res.status === 200) {
        const { payload, emotionName } = res.data
        const { name, photo, email, settings } = payload
        const user = { name, photo, email, settings }
        const emotionIcon = this.Utils.getEmotionIcon(emotionName)
        this.setState({
          user,
          emotionIcon,
          spinner: false
        })
      }
    })
  }
  async handleChange (option) {
    console.log(option)
    if (this.state.user.settings === option) {
      console.log('same option')
    } else {
      await this.UserService.updateSettings(option, async res => {
        if (res.status === 200) {
          this.setState({
            user: {
              name: this.state.user.name,
              settings: option
            },
            emotionIcon: this.state.emotionIcon
          })

          console.log('settings ' + this.state.user.settings)
        } else {
          console.log('Error')
        }
      })
    }
  }
  async signOut (event) {
    event.preventDefault()
    await this.UserService.logout(() => {
      //this.props.navigation.navigate('Login')
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })]
      })

      this.props.navigation.dispatch(resetAction)
    })
  }

  static navigationOptions = {
    title: 'Settings'
  }

  render () {
    const { emotionIcon, spinner } = this.state
    return (
      <Content padder>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <NavigationEvents onDidFocus={() => this.load()} />
        <Card style={{ flex: 0 }} transparent>
          <CardItem>
            <Left>
              <Thumbnail source={emotionIcon} />
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
              <Button transparent>
                <Text style={styles.buttonText} onPress={e => this.signOut(e)}>
                  Sign out
                </Text>
              </Button>
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
              <Radio
                color='#CBCBCB'
                selectedColor='#8b4da9'
                selected={this.state.user.settings == 'Camera' ? true : false}
                onPress={this.handleChange.bind(this, 'Camera')}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={styles.buttonText}>QUIZZ</Text>
            </Left>
            <Right>
              <Radio
                color='#CBCBCB'
                selectedColor='#8b4da9'
                selected={this.state.user.settings == 'Quiz' ? true : false}
                onPress={this.handleChange.bind(this, 'Quiz')}
              />
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
    fontSize: 20
  },
  buttonText: {
    color: '#8b4da9',
    paddingLeft: 0,
    fontSize: 15
  },
  optionTitle: {
    color: '#8b4da9',
    paddingLeft: 5,
    paddingTop: 30,
    fontWeight: 'bold'
  }
})

export default withNavigation(Settings)
