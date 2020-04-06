import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native'
import { Content, Footer,  FooterTab, Button, Icon, Text } from 'native-base';
export default class FooterBar extends Component {
  render() {
    return (
     
        <Footer >
        <Button onPress={() => { }}
          style={styles.circleButton} active>
          <Image source={require('../assets/simplified-logo.png')} style = {styles.logo} />
        </Button>
          <FooterTab style={{ backgroundColor: '#faecfa' }}>
            <Button vertical >
              <Icon name="arrow-back" style={{color: '#8b4da9'}}/>
              <Text style={{color: '#8b4da9'}}>Back</Text>
            </Button>
            <Content />
            <Button vertical>
              <Icon name="person" style={{color: '#8b4da9'}}/>
              <Text style={{color: '#8b4da9'}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

const styles = StyleSheet.create({
    circleButton : {
        alignSelf: 'center', 
        position: 'absolute', 
        elevation: 4,
        height: 70, 
        width: 70,
        bottom: 0, 
        borderWidth: 1, 
        borderColor: '#8b4da9', 
        borderRadius: 35, 
        backgroundColor: '#f5f5f5', 
        justifyContent: 'center',
    },
    logo: {
        flex: 1, 
        width: '100%',
        height: '100%',
        resizeMode: 'contain'

    }


});