import React, { Component } from 'react'
import { Text, View, Image, Platform, FlatList, StyleSheet, PermissionsAndroid, Dimensions, TouchableHighlight, TouchableOpacity, Button, StatusBar } from 'react-native'
import RNFS from 'react-native-fs'

console.disableYellowBox = true;
const screenWidth = Dimensions.get('window').width;


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw_json: 'empty',
      paths_from_json: [],
      status_path: '',
      isPermitted: false,
    };
  }
  checkAndroidVersion() {
    const OsVer = Platform.constants['Release'];
    console.log('Android Verion ' + OsVer);
    if (OsVer >= 11) {
      this.setState({ status_path: '/Android/media/com.whatsapp/WhatsApp/Media/.Statuses' })
    } else {
      this.setState({ status_path: '/WhatsApp/Media/.Statuses' })
    }
  }
  setJSON() {
    if (this.state.isPermitted == true)
      RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}${this.state.status_path}`).then(res => {
        this.setState({ raw_json: res });
        console.log('Data added to array');
        console.log(res);
      })
  }
  async hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  async checkPermissionBeforeRenderingList() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      this.setState({ isPermitted: true })
      return true;
    } else {
      this.setState({ isPermitted: false })
      return false;
    }
  }
  async openPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission Granted
      this.setState({ isPermitted: true })
      this.setJSON();
    }
  }
  async componentDidMount() {
    await this.hasAndroidPermission();
    await this.checkAndroidVersion();
    await this.checkPermissionBeforeRenderingList();
    this.setJSON();
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/app_icon.png')}
              style={{ height: 30, width: 30, marginRight: 10}}
            />
            <Text style={styles.headerTitle}>Status Saver</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableHighlight style={styles.headerIconTH} onPress={() => { this.setJSON() }}>
              <Image
                source={require('../../assets/refresh.png')}
                style={{ height: 42, width: 42, tintColor: 'white' }}
              />
            </TouchableHighlight>
            <TouchableHighlight style={styles.headerIconTH} onPress={() => { this.props.navigation.navigate('Info') }}>
              <Image
                source={require('../../assets/info.png')}
                style={styles.headerIcon}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#141414'
          }}>
          {this.state.isPermitted == true ?
            <FlatList
              numColumns={2}
              contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5 }}
              data={this.state.raw_json}
              renderItem={({ item }) => (
                <>
                  {item.size !== 0 ?
                    <>
                      <TouchableOpacity activeOpacity={0.6} onPress={() => { this.props.navigation.navigate('StatusView', { status_path: 'file://' + item.path }); }}>
                        <>
                          <View style={styles.item}>
                            {/* <Text>{item.name}</Text> */}
                            <Image
                              style={styles.itemImg}
                              source={{ uri: 'file://' + item.path }}
                            />
                            <View style={styles.itemSeperatorHorizontal}></View>
                            {this.isVideo(item.path) == true ?
                              <View style={styles.isVideo}>
                                <Image style={styles.isVideoIcon} source={require('../../assets/video.png')} />
                              </View>
                              :
                              null
                            }
                          </View>
                        </>
                      </TouchableOpacity>
                      <View style={styles.itemSeperatorVerticle}></View>
                    </>
                    :
                    <View style={{ height: (screenWidth - 15) / 2, width: (screenWidth - 15) / 2, backgroundColor: '#141414', marginRight: 5, }}></View>
                  }
                </>
              )}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, }}>
              <Text style={styles.permitTitle}>Allow Permissions</Text>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>Click the button below to allow permission</Text>
              <Button title="Allow" style={{ paddingHorizontal: 10 }} onPress={() => { this.openPermission() }} />
            </View>
          }
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
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemImg: {
    height: 100,
    width: (screenWidth - 15) / 2, //15 == Gaps (5+5+5)
    height: (screenWidth - 15) / 2,
  },
  itemSeperatorHorizontal: {
    height: (screenWidth - 15) / 2,
    width: 5,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerIconTH: {
    borderRadius: 40,
    marginLeft: 12,
  },
  headerIcon: {
    height: 30,
    width: 30,
    tintColor: 'white'
  },
  permitTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  isVideo: {
    height: 70,
    width: 70,
    position: 'absolute',
    top: (((screenWidth - 15) / 2) / 2) - 35,
    left: (((screenWidth - 15) / 2) / 2) - 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isVideoIcon: {
    tintColor: 'white',
  }
})