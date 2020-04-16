
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Content
} from 'native-base'
import PreferencesForm from './PreferencesForm'
import { withNavigation } from 'react-navigation'

class Preferences extends Component {
    render () {
      return (
        <Content>
          <PreferencesForm />
        </Content>
      )}
    }


    export default withNavigation(Preferences);