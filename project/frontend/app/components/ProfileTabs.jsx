import React, { Component } from 'react'
import { Tab, Tabs, Container, Header } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import Preferences from './Preferences'
import Statistics from './Statistics'
export default class ProfileTabs extends Component {
  render () {
    return (
      <Tabs
        tabContainerStyle={{
          elevation: 0
        }}
      >
        <Tab
          heading='Preferences'
          textStyle={styles.inactiveTextStyle}
          activeTextStyle={styles.activeTextTabBar}
          tabStyle={styles.backgroundTabBar}
          activeTabStyle={styles.backgroundTabBar}
        >
          <Preferences />
        </Tab>
        <Tab
          heading='Statistics'
          textStyle={styles.inactiveTextStyle}
          activeTextStyle={styles.activeTextTabBar}
          tabStyle={styles.backgroundTabBar}
          activeTabStyle={styles.backgroundTabBar}
        >
          <Statistics />
        </Tab>
      </Tabs>
    )
  }
}

const styles = StyleSheet.create({
 
  activeTextTabBar: {
    color: '#803EA1'
  },
  inactiveTextStyle: {
    color: '#CBCBCB'
  },

  backgroundTabBar: {
    backgroundColor: 'white'
  }
})
