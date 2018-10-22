import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.didPressSearch = this.didPressSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  didPressSearch() {
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          clearButtonMode="while-editing"
          blurOnSubmit={true}
          onSubmitEditing={this.didPressSearch}
          onChangeText={this.onChange}
          returnKeyType="search"
          // value={this.state.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#fff",
    padding: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  searchInput: {
    fontSize: 17,
    backgroundColor: "#f7f7f7",
    padding: 8,
    borderRadius: 8,
    flex: 8
  }
});
