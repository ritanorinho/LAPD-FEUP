import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, Subtitle } from 'native-base';
import { withNavigation } from 'react-navigation';

 class HeaderBar extends Component {
  render() {
    return (
    
        <Header style={{ backgroundColor: '#faecfa' }}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() =>this.props.navigation.navigate('Settings')}>
              <Icon name='settings' style={{ color: '#38adff' }}/>
            </Button>
          </Left>
          <Body style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Title style={{color: '#8b4da9'}}>Mentis</Title>
          </Body>
          <Right style={{flex:1}}>
              <Button transparent >
            <Icon name='help' style={{ color: "#8b4da9" }}/>
            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderBar);