import React, { Component } from 'react'
import { List, ListItem, Radio, Text, Card, CardItem } from 'native-base'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

class PrefencesCard extends Component {
  render () {
    return (
      <Card style={styles.card}>
      <CardItem style={styles.textCard}>
          <Text style={styles.title}>MUSIC</Text>
      </CardItem>
      <CardItem style= {styles.card}>
        <List >
          <ListItem style={styles.option}>
            <Radio selected={true} color="#CBCBCB" selectedColor="#CBCBCB" />
            <Text style={styles.textOption}>Country</Text>
          </ListItem>
          <ListItem style={styles.option}>
            <Radio selected={false} color="#CBCBCB" selectedColor="#CBCBCB" />
            <Text style={styles.textOption}>Rock</Text>
          </ListItem>
          <ListItem style={styles.option}>
            <Radio selected={false} color="#CBCBCB" selectedColor="#CBCBCB" />
            <Text style={styles.textOption}>Classic</Text>
          </ListItem>
        </List>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({

    textCard:{
        alignSelf: 'flex-end',
        backgroundColor: '#73B4FC',
        paddingBottom: 0, 
    },
    title:{
        color:'#803EA1',
        fontWeight:'bold',
    },
    textOption: {
        color: '#464646',
        paddingLeft: 5,
        fontWeight: 'bold',

    },
    option:{
        borderBottomWidth: 0,
        paddingBottom: 2, 
        paddingTop: 5, 
    },
    card:{
        backgroundColor: '#73B4FC',
        paddingTop: 0,
    },
    radio: {
        borderColor: 'white',
    }

})


export default withNavigation(PrefencesCard);
