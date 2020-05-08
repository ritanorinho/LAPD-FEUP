
import Settings from '../components/Settings';
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container, Content } from 'native-base'
export default class SettingsScreen extends React.Component {

    render () {
        return (
            <Container>
            <HeaderBar />
           <Settings />
            <FooterBar />
          </Container>
        )}
}