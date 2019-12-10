import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {

        return (
            <TouchableOpacity onPress={this.props.onClick} style={[styles.button, { backgroundColor: this.props.bgC }]}>
                <Text style={[styles.text, this.props.style]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        fontWeight: "300",

    },
    text: {
        textAlign: 'center',
        fontSize: 20

    }
})
export default MyButton;