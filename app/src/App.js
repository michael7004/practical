
import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import { Images } from "../res/ImgConst/ImgConst";

export default class Flyers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isA: false,
      isB: false,
      isC: false,
      isD: false,
    };

  }
  //First time method A will be called
  componentDidMount() {
    this.timerA();
  }

  //When signal A is started, then all other are have to wait till A get release or free
  timerA() {
    setTimeout(() => {
      this.setState({ isA: true, isB: false, isC: false, isD: false })
      this.timerB()
    }, 5000);


  }

  //When signal B is started, then all other are have to wait till A get release or free
  timerB() {
    setTimeout(() => {

      this.setState({ isA: false, isB: true, isC: false, isD: false })
      this.timerC()
    }, 5000);
  }

  //When signal C is started, then all other are have to wait till A get release or free
  timerC() {
    setTimeout(() => {
      this.setState({ isA: false, isB: false, isC: true, isD: false })
      this.timerD()
    }, 5000);
  }

  //When signal d is started, then all other are have to wait till A get release or free
  timerD() {
    setTimeout(() => {
      this.setState({ isA: false, isB: false, isC: false, isD: true })
      this.timerA()
    }, 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
    // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  onClickA_AMB = () => {
    this.setState({ isA: false, isB: false, isC: false, isD: false })
    this.timerA()
  }
  render() {
    return (<SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>


    </SafeAreaView>)
  }
  //This is header
  renderHeader = () => {
    return (<View style={styles.headerStyle}>
      <View style={styles.headerTrafficViewStyle}>
        <Text style={styles.trafficTitleStyle}>Traffic Signal</Text>
      </View>

      <View style={styles.headerTrafficImgViewStyle}>
        <Image
          resizeMethod='resize'
          style={styles.image}
          source={Images.ic_video}>
        </Image>
      </View>
    </View>)

  }

  //This is main view for traffic signal
  renderBody = () => {
    const { isA, time, isB, isC, isD } = this.state;
    return (<View style={{ flex: 1 }}>
      <View style={styles.viewAStyle}>
        <View style={styles.outerBorder}
          onStartShouldSetResponder={this.onClickA_AMB}>
          <Text >AMB</Text>
        </View>
        <View style={isA ? styles.outerBorderSelected : styles.outerBorder}>
          <Text >A</Text>
        </View>
        <Text style={styles.textA}>10</Text>

      </View>

      <View style={styles.viewBDStyle}>
        <View style={styles.commonFlexDirectionRow}>
          <View style={styles.outerBorder}>
            <Text >AMB</Text>
          </View>
          <View style={isD ? styles.outerBorderSelected : styles.outerBorder}>
            <Text >D</Text>
          </View>
          <Text style={styles.textD}>10</Text>

        </View>

        <View style={styles.commonFlexDirectionRow}>
          <Text style={styles.textC}>10</Text>
          <View style={isB ? styles.outerBorderSelected : styles.outerBorder}>
            <Text >B</Text>
          </View>
          <View style={styles.outerBorder}>
            <Text >AMB</Text>
          </View>
        </View>
      </View>

      <View style={{ alignSelf: 'center' }}>
        <Text style={styles.textB}>10</Text>
        <View style={isC ? styles.outerBorderSelected : styles.outerBorder}>
          <Text >C</Text>
        </View>
        <View style={styles.outerBorder}>
          <Text >AMB</Text>
        </View>
      </View>

    </View>)

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    height: 25, width: 25,
    alignSelf: 'flex-end'
  },
  headerStyle: {
    height: 60, flexDirection: 'row'
  },
  headerTrafficViewStyle: {
    flex: 1, justifyContent: 'center'
  },
  headerTrafficImgViewStyle: {
    justifyContent: 'center', marginRight: 5
  },
  trafficTitleStyle: {
    alignSelf: 'center', alignItems: 'center'
  },
  outerBorder: {
    margin: 2, alignItems: 'center',
    justifyContent: 'center',
    height: 60, width: 60,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#E5EDF4',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 1
  },
  outerBorderSelected: {
    margin: 2, alignItems: 'center',
    justifyContent: 'center',
    height: 60, width: 60,
    backgroundColor: '#0AF547',
    borderRadius: 5,
    shadowColor: '#E5EDF4',
    borderWidth: 1,
    borderColor: '#0AF547',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 1
  },
  textA: { textAlign: 'center', width: 60, height: 60 },
  textD: { height: 60, textAlignVertical: 'center' },
  textC: { height: 60, textAlignVertical: 'center' },
  textB: { width: 60, textAlign: 'center' },
  viewAStyle: { height: 150, alignSelf: 'center' },
  viewBDStyle: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginLeft: 4,
    marginRight: 4
  },
  commonFlexDirectionRow: { flexDirection: 'row' }

});
