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

export class Ride extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      ride: {},
      isLoading: true,
      image: null,
      succesOpen: false,
      rideId: props.navigation.getParam("id", 0)
    };

    this.setValue = this.setValue.bind(this);
    this.didPressSave = this.didPressSave.bind(this);
    this.load = this.load.bind(this);
    this.didPressImage = this.didPressImage.bind(this);
    this.notifySuccess = this.notifySuccess.bind(this);

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
    // console.log("-- VALUES TO UPDATE", this.state.values);
    const { rideId } = this.state;
    fetch(`http://programmerenissexy.nl/api/rides/${rideId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ ride: this.state.values })
    }).then(resp => {
      this.notifySuccess();
      console.log("--PATCH RESPONSE", resp);
    });
  }

  async didPressImage() {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollPerm !== "granted") return;
    let result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled) return;
    this.setState({ image: result.uri });
    this.setValue("image", `data:image/jpeg;base64,${result.base64}`);
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
    const { isLoading, ride, image, succesOpen } = this.state;
    return isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <ScrollView style={{ flex: 1 }}>
        <Notification isOpen={succesOpen}/>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={this.didPressImage}>
            <Image
              style={styles.thumbnail}
              source={
                image
                  ? { uri: image }
                  : { uri: `http://programmerenissexy.nl${ride.image}` }
              }
            />
          </TouchableOpacity>
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

// We can use this to make the overlay fill the entire width


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
    backgroundColor: "#efefef",
    borderRadius: 8,
    marginHorizontal: 16
  },
  section: {
    marginBottom: 8
  },
});
