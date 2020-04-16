import ProfileCard from '../components/ProfileCard'
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container } from 'native-base'


 export default class ProfileScreen extends React.Component {



  render () {
    return (
      <Container>
        <HeaderBar />
        <ProfileCard />
        <FooterBar />
      </Container>
    )
    }
  }
