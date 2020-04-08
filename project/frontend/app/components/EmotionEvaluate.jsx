import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import EmotionCarousel from './EmotionCarousel';
export default class CardExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card transparent>
            <CardItem>
              <Body>
                <EmotionCarousel></EmotionCarousel>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}