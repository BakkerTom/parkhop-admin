import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export class Notification extends React.Component {
  render() {
    return this.props.isOpen ? (
      <View style={styles.overlay}>
        <Ionicons
          name="md-checkmark-circle-outline"
          size={48}
          style={{ color: "white", marginRight: 16 }}
        />
        <View>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.subtitle}>Changes have been saved</Text>
        </View>
      </View>
    ) : false;
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#38C172",
    width: width,
    zIndex: 999,
    alignItems: "center",
    flexDirection: "row",
    padding: 16
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 2
  },
  subtitle: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 17
  }
});
