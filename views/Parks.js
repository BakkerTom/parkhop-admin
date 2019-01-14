import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
import { SearchBar } from "../components/SearchBar";

export class Parks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rides: [],
      isLoading: true
    };

    this.renderItem = this.renderItem.bind(this);
    this.refresh = this.refresh.bind(this);
    this.didPressItem = this.didPressItem.bind(this);
    this.search = this.search.bind(this);
  }

  static navigationOptions = {
    title: "Parks"
  };

  componentDidMount() {
    this.refresh();
  }

  refresh(searchTerm = null) {
    this.setState({isLoading: true});
    const url = searchTerm
      ? `http://programmerenissexy.nl/api/parks?search=${searchTerm}`
      : "http://programmerenissexy.nl/api/parks";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ parks: data, isLoading: false });
      });
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
        subtitle={item.location}
        onPressItem={this.didPressItem}
      />
    );
  }

  keyExtractor(item) {
    return item.id.toString();
  }

  search(searchTerm) {
    this.refresh(searchTerm);
  }

  render() {
    const { isLoading, parks } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <SearchBar onSearch={this.search} />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            style={styles.container}
            data={parks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
