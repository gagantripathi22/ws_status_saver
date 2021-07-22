import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, StatusBar } from 'react-native'

export default class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#0d0d0d' barStyle='light-content' />
        <View style={styles.header}>
          <TouchableHighlight style={styles.headerIconTH} onPress={() => { this.props.navigation.goBack() }}>
            <>
              <Image
                source={require('../../assets/back.png')}
                style={styles.headerIcon}
              />
              <Text style={styles.headerTitle}>Go Back</Text>
            </>
          </TouchableHighlight>

        </View>
        <View style={{
          flex: 1,
          padding: 15,
          justifyContent: 'center',
        }}>
          <Text style={[styles.heading, styles.text]}>How to use</Text>
          <Text style={[styles.steps, styles.text]}>1) Open WhatsApp</Text>
          <Text style={[styles.steps, styles.text]}>2) Open status you want to download</Text>
          <Text style={[styles.steps, styles.text]}>3) Come back here and download</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    height: 65,
    width: '100%',
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    marginLeft: 5,
  },
  text: {
    color: 'white',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  steps: {
    marginTop: 10,
    fontSize: 15,
  },
  headerIconTH: {
    borderRadius: 35,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerIcon: {
    height: 25,
    width: 25,
  },
})