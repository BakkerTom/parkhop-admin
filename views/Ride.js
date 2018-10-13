import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import { TextField } from "../components/TextField";

export class Ride extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      ride: {},
      isLoading: true,
      rideId: props.navigation.getParam("id", 0)
    };

    this.setValue = this.setValue.bind(this);
    this.didPressSave = this.didPressSave.bind(this);
    this.load = this.load.bind(this);

    this.props.navigation.setParams({ didPressSave: this.didPressSave });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Ride",
      headerRight: (
        <Button
          title="Save"
          onPress={navigation.getParam("didPressSave", () => {})}
        />
      )
    };
  };

  componentDidMount() {
    this.load();
  }

  load() {
    const { rideId } = this.state;
    fetch(`http://programmerenissexy.nl/api/rides/${rideId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log("--RIDE DATA", data);
        this.setState({ isLoading: false, ride: data });
      });
  }

  didPressSave() {
    console.log("-- VALUES TO UPDATE", this.state.values);
    const { rideId } = this.state;
    fetch(`http://programmerenissexy.nl/api/rides/${rideId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ ride: this.state.values })
    }).then(resp => {
      console.log("--PATCH RESPONSE", resp);
    });
  }

  setValue(name, value) {
    const values = {
      ...this.state.values,
      [name]: value
    };

    this.setState({
      values: values
    });
  }

  render() {
    const { isLoading, ride } = this.state;
    return isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerView}>
          <View style={styles.thumbnail} />
          <View style={{ flex: 1 }}>
            <TextField
              name="name"
              title="Ride"
              setValue={this.setValue}
              value={ride.name}
            />
            <TextField
              name="park"
              title="Park"
              setValue={() => {}}
              value={ride.park.name}
            />
          </View>
        </View>
        <View style={styles.section}>
          <TextField
            name="status"
            title="Status"
            setValue={this.setValue}
            value={ride.status}
          />
        </View>
        <View style={styles.section}>
          <TextField
            name="lat"
            title="Latitude"
            setValue={this.setValue}
            value={ride.lat}
          />
          <TextField
            name="lon"
            title="Longitude"
            setValue={this.setValue}
            value={ride.lon}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 8
  },
  thumbnail: {
    width: 64,
    height: 64,
    backgroundColor: "salmon",
    borderRadius: 8,
    marginHorizontal: 16
  },
  section: {
    marginBottom: 8,
  }
});
