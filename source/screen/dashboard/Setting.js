import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push('Setting')}>
          <Text> Setting </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
