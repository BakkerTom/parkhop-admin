import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { ListItem } from './ListItem';

export class RideList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("http://programmerenissexy.nl/api/rides")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ loading: false, rides: data });
      })
      .catch(error => console.log(error));
  }

  renderItem({item}) {
    return <ListItem title={item.name} subtitle={item.park.name} thumbnail={item.thumbnail_url} />;
  }

  keyExtractor(item) {
    return item.id.toString();
  }

  render() {
    return this.state.loading ? <Text>loading...</Text> : (
      <FlatList
        style={styles.container}
        data={this.state.rides}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
