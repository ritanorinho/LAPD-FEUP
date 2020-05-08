import React from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import ProfileScreen from './app/screens/ProfileScreen'
import EventScreen from './app/screens/EventScreen'
import SettingsScreen from './app/screens/SettingsScreen'
import RegisterScreen from './app/screens/RegisterScreen'
import LoginScreen from './app/screens/LoginScreen'
import EventsScreen from './app/screens/EventsScreen'
import ResultScreen from './app/screens/ResultScreen'
import EmotionEvaluateScreen from './app/screens/EmotionEvaluateScreen'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const RootStack = createAppContainer(
  createStackNavigator(
    {
      Profile: {
        screen: ProfileScreen,

        navigationOptions: {
          headerShown: false
        }
      },
      Event: {
        screen: EventScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Settings: {
        screen: SettingsScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Register: {
        screen: RegisterScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Events: {
        screen: EventsScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Result: {
        screen: ResultScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      EmotionEvaluate: {
        screen: EmotionEvaluateScreen,
        navigationOptions: {
          headerShown: false
        }
      },
    },
    {
      initialRouteName: 'Login'
    }
  )
)

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false
    }
  }
  state = {
    response: ''
  }

  async componentDidMount () {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
    this.setState({ isReady: true })
  }

  render () {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return <RootStack />
  }
}
