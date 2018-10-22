import React from "react";
import { StyleSheet, Text, ScrollView, View, TextInput } from "react-native";
import { RideList } from "../components/RideList";
import { SearchBar } from "../components/SearchBar";

export class Rides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      searchTerm: null,
      loading: true,
    };

    this.refresh = this.refresh.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh(search = null) {
    this.setState({ loading: true });
    const url = search ? `http://programmerenissexy.nl/api/rides?search=${search}` : "http://programmerenissexy.nl/api/rides"
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ loading: false, rides: data });
      })
      .catch(error => console.log(error));
  }

  static navigationOptions = {
    title: "Rides"
  };

  search(searchTerm) {
    this.refresh(searchTerm);
    console.log('--SEARCH:', searchTerm);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar onSearch={this.search}/>
        {this.state.loading ? <Text>Loading...</Text> :  (
          <RideList
            rides={this.state.rides}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}


