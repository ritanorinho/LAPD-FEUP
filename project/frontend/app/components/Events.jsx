import EventCard from './EventCard'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, Content, Text, Icon, Button} from 'native-base'
export default class Events extends React.Component {
  render () {
    return (
      <Content>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.text}>EVENTS</Text>
          </View>
          <View style={styles.rowItem}>
            <Button style={styles.button} transparent>
              <Icon name='happy' style={{ color: '#8b4da9' }} />
            </Button>
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
    paddingTop: 15, 
    paddingLeft: 15,
  },
  button: {
    alignSelf: 'flex-end'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  rowItem: {
    flex: 1
  }
})
