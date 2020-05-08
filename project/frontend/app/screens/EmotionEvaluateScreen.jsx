import EmotionEvaluate from '../components/EmotionEvaluate'
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container, Content } from 'native-base'
export default class EmotionEvaluateScreen extends React.Component {
  render () {
    return (
      <Container>
        <HeaderBar />
        <EmotionEvaluate />
        <FooterBar />
      </Container>
    )
  }
}
