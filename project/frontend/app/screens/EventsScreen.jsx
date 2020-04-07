import Events from '../components/Events'
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container, Content } from 'native-base'
export default class ProfileScreen extends React.Component {
  render () {
    return (
      <Container>
        <HeaderBar />
        <Content>
          <Events />
        </Content>
        <FooterBar />
      </Container>
    )
  }
}
