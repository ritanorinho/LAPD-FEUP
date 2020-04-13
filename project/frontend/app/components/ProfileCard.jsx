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
import ProfileTabs from './ProfileTabs';
import { withNavigation } from 'react-navigation';
 class ProfileCard extends Component {
   static navigationOptions={
     title: 'Profile'
   }
   constructor(props){
     super(props)
   }
  render () {
    return (
      <Content>
        <Card style={{ flex: 0 }} transparent>
          <CardItem style={styles.cardItem}>
           <Thumbnail source= {require('../assets/profile-picture.jpg')} large></Thumbnail>
          </CardItem>
          <CardItem style={styles.cardItem}>
           <Text style={styles.cardText}>JANE DOE</Text>
          </CardItem>
          <CardItem style={{paddingTop: 0, marginTop: 0}}>
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
      paddingBottom: 0, 
    },
    cardText: {
      fontWeight: 'bold',
      color: '#464646'
    }


})

export default withNavigation(ProfileCard);