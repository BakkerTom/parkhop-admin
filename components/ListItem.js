import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

export class ListItem extends React.Component {
  render() {
    const { title, subtitle, thumbnail } = this.props;
    return (
      <View style={styles.item}>
        <Image  style={styles.thumbnail} source={{uri: `http://programmerenissexy.nl${thumbnail}`}}></Image>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
      </View>
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
    borderRadius: 16
  }
});
