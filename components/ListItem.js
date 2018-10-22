import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPressItem(this.props.id);
  }

  render() {
    const { title, subtitle, thumbnail } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.item}>
          <Image  style={styles.thumbnail} source={{uri: `http://programmerenissexy.nl${thumbnail}`}}></Image>
          <View style={styles.text}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    width: '100%',
    marginBottom: 2
  },
  text: {
    flex: 1
  },
  subtitle: {
    fontSize: 16
  },
  thumbnail: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: '#efefef',
  }
});
