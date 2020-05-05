import React, { Component } from 'react'
import { StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { withNavigation } from 'react-navigation'
class FooterBar extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: '#faecfa' }}>
          <Button vertical onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' style={{ color: '#8b4da9' }} />
            <Text style={{ color: '#8b4da9' }}>Back</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('EmotionEvaluate')}
            style={{
              alignSelf: 'center',
              elevation: 4,
              height: 60,
              width: 60,
              bottom: 2,
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 30,
              backgroundColor: '#f5f5f5',
              justifyContent: 'center'
            }}
            active 
          >
            <Image
              source={require('../assets/simplified-logo.png')}
              style={styles.logo}
            />
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Icon name='person' style={{ color: '#8b4da9' }} />
            <Text style={{ color: '#8b4da9' }}>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = StyleSheet.create({
  circleButton: {
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
    justifyContent: 'center'
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})

export default withNavigation(FooterBar)
