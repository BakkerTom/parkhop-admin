import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { ListItem } from "./ListItem";

export class RideList extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.didPressItem = this.didPressItem.bind(this);
  }

  didPressItem(id) {
    const { navigate } = this.props.navigation;
    navigate("Show", { id: id });
  }

  renderItem({ item }) {
    return (
      <ListItem
        id={item.id}
        title={item.name}
        subtitle={item.park.name}
        thumbnail={item.thumbnail_url}
        onPressItem={this.didPressItem}
      />
    );
  }

  keyExtractor(item) {
    return item.id.toString();
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.rides}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
