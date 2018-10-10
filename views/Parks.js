import React from "react";
import { StyleSheet, Text, View } from "react-native";

export class Parks extends React.Component {
  static navigationOptions = {
    title: "Parks"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Parks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
