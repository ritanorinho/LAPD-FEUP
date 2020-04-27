import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
} from 'native-base'
import { withNavigation } from 'react-navigation'

 class EventCard extends Component {
  render () {
    return (
      <Card style = {styles.card}>
        <CardItem cardBody>
          <Image
            source={require('../assets/coachella-festival.jpg')}
            style={styles.imageStyle}
          />
        </CardItem>
        <CardItem>
          <View style={styles.rowContainer}>
            <View>
              <View style={styles.rowItem}>
                <Text style={styles.text}>Coachella Music Festival</Text>
              </View>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.subtitleText}>09 OCT </Text>
                </View>
                <View>
                  <Text style={styles.subtitleText}>
                    {' '}
                    EMPIRE PORO FIELD, INDIO
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <Button style={styles.button} transparent onPress={() =>this.props.navigation.navigate('Event')}>
                <Icon name='arrow-forward' style={{ color: '#8b4da9' }} />
              </Button>
            </View>
          </View>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#464646',
    fontWeight: 'bold'
  },
  subtitleText: {
    color: '#CBCBCB'
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
  },
  imageStyle: {
    height: 200,
    width: null,
    flex: 1
  },
  card: {
   marginTop: 10, 
  }
})

export default withNavigation(EventCard);
