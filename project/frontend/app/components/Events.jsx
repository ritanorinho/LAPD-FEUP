import EventCard from './EventCard'
import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Container, Content, Text, Icon, Button} from 'native-base'
import { withNavigation } from 'react-navigation'
class Events extends React.Component {
   
  static navigationOptions={
    title: 'Events'
  }
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Content>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.text}>EVENTS</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={require('../assets/happy.png')} style={styles.emotion} ></Image>
          </View>
        </View>
        <EventCard />
        <EventCard />
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#464646',
    fontWeight: 'bold', 
    paddingLeft: 15, 
  },

 
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  rowItem: {
    flex: 1, 
    paddingTop: 15, 
  },
  emotion: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
    paddingTop: 15,
    marginRight: 100, 

}
})

export default withNavigation(Events);
