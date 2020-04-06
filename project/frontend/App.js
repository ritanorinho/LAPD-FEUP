import React from 'react';
import { AppLoading } from 'expo';
import { Container, Content } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import  HeaderBar  from './app/components/HeaderBar';
import  FooterBar  from './app/components/FooterBar';
import Login from './app/screens/LoginScreen';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
       
        <Login />
  
      </Container>
    );
  }
}