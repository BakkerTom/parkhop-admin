import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";
import { TextField } from "../components/TextField";
import { Notification } from "../components/Notification";

export class Park extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      park: {},
      isLoading: true,
      image: null,
      succesOpen: false,
      parkId: props.navigation.getParam("id", 0)
    };

    this.setValue = this.setValue.bind(this);
    this.didPressSave = this.didPressSave.bind(this);
    this.load = this.load.bind(this);
    this.notifySuccess = this.notifySuccess.bind(this);

    this.props.navigation.setParams({ didPressSave: this.didPressSave });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Park",
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
    const { parkId } = this.state;
    fetch(`http://programmerenissexy.nl/api/parks/${parkId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log("--PARK DATA", data);
        this.setState({ isLoading: false, park: data });
      });
  }

  didPressSave() {
    // console.log("-- VALUES TO UPDATE", this.state.values);
    const { parkId } = this.state;
    fetch(`http://programmerenissexy.nl/api/parks/${parkId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ park: this.state.values })
    }).then(resp => {
      this.notifySuccess();
      console.log("--PATCH RESPONSE", resp);
    });
  }

  notifySuccess() {
    this.setState({succesOpen: true});

    setTimeout(() => {
      this.setState({succesOpen: false});
    }, 3000);
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
    const { isLoading, park, succesOpen } = this.state;
    return isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <ScrollView style={{ flex: 1 }}>
        <Notification isOpen={succesOpen}/>
        <View style={styles.section}>
          <TextField
            name="name"
            title="Name"
            setValue={this.setValue}
            value={park.name}
          />
          <TextField
            name="location"
            title="Location"
            setValue={this.setValue}
            value={park.location}
          />
          <TextField
            name="status"
            title="Status"
            setValue={this.setValue}
            value={park.status}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 8
  },
});
