import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text) {
    this.props.setValue(this.props.name, text);
  }

  format(value) {
    if (!value) {
      return "";
    }

    if(!isNaN(value)) {
      return value.toString();
    }

    return value;
  }

  render() {
    const { title, value } = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.labelView}>{title}</Text>
        <TextInput
          style={styles.inputView}
          placeholder={title}
          clearButtonMode="while-editing"
          onChangeText={this.handleChange}
          value={this.format(value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bfbfbf",
    backgroundColor: "#fff"
  },
  inputNoBorder: {
    borderBottomWidth: 0
  },
  labelView: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600"
  },
  inputView: {
    flex: 3,
    fontSize: 17
  }
});
