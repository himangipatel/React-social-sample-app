import React from 'react';
import {StyleSheet, TextInput, View, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';


/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export default class BoxTextField extends React.Component {
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SectionStyle}>
          <Icon type="" name={this.props.icon} color="#808080" />
          <TextInput
            style={{flex: 1, marginStart: 10}}
            placeholder={this.props.hint}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3
  },

  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 50,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    alignItems: 'center',
  
  },

  ImageStyle: {
    height: 20,
    width: 20,
    
  },
});
