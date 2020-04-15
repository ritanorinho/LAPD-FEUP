import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Content, Text, Button, Icon } from 'native-base'
import PreferencesCard from './PreferencesCard'
import { withNavigation } from 'react-navigation'

class PreferencesForm extends Component {
  render () {
    return (
      <Content>
     <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
          <Text style={styles.text}>When I'm happy I like...</Text>
          </View>
          <View style={styles.rowItem}>
          <Button style={styles.button} transparent>
            <Icon name='arrow-forward' style={{ color: '#8b4da9' }} />
          </Button>
         </View>
        </View>
        <PreferencesCard />
        <PreferencesCard />
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#464646',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'flex-end', 
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rowItem:{
    flex: 1,
  },
})

export default withNavigation(PreferencesForm);