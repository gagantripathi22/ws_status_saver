import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ToastAndroid, TouchableHighlight, Dimensions, StatusBar } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import Share from 'react-native-share';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

export default class StatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status_path: this.props.route.params.status_path,
    }
  }
  async savePicture() {
    CameraRoll.save(this.state.status_path, { album: 'Whatsapp Status Saver' })
    console.log("Image Saved Maybe");
    ToastAndroid.show("Image Saved In Gallery", ToastAndroid.SHORT);
  };
  async sharePicture() {
    Share.open(options);
  }
  isVideo(path) {
    let str = String(path);
    var ex = str.slice(-3);
    if (ex == 'mp4') {
      return true;
    } else {
      return false;
    }
  }
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
        <View style={styles.main}>
          <View style={styles.statusPreview}>
            {this.isVideo(this.state.status_path) ?
              <Video source={{ uri: 'file://' + this.state.status_path }}
                ref={(ref) => {
                  this.player = ref
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'black'
                }}
                resizeMode={'contain'}
              />
              :
              <Image style={styles.status} source={{ uri: 'file://' + this.state.status_path }} resizeMode={"contain"} />
            }
          </View>
          <View style={styles.bottomFloatingActionBar}>
            {/* <TouchableHighlight underlayColor={'#d1b200'} onPress={() => { this.sharePicture(); }} style={[styles.bottomBarItem, { borderRightWidth: 1, borderRightColor: '#AB9100' }]}>
              <>
                <Image source={require('../../assets/share.png')} style={styles.bottomBarItemIcon} resizeMode={"contain"} />
                <Text style={styles.bottomBarItemText}>Share</Text>
              </>
            </TouchableHighlight> */}
            <TouchableHighlight underlayColor={'#d1b200'} onPress={() => { this.savePicture(); }} style={styles.bottomBarItem}>
              <>
                <Image source={require('../../assets/download.png')} style={styles.bottomBarItemIcon} resizeMode={"contain"} />
                <Text style={styles.bottomBarItemText}>Download</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 65,
    width: '100%',
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    marginLeft: 5,
  },
  headerIconTH: {
    borderRadius: 40,
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
  },
  statusPreview: {
    flex: 1,
  },
  status: {
    height: '100%',
    width: '100%',
    backgroundColor: '#141414'
  },
  bottomFloatingActionBar: {
    height: 55,
    width: '85%',
    backgroundColor: '#F3CF00',
    position: 'absolute',
    bottom: 40,
    borderRadius: 30,
    marginLeft: (screenWidth - ((85 / 100) * screenWidth)) / 2,
    flexDirection: 'row',
    overflow: 'hidden',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomBarItemIcon: {
    height: 16,
  },
  bottomBarItemText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})