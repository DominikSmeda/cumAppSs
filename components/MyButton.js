import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={[styles.button, { backgroundColor: this.props.bgC || "white", }]}>
                <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

// MyButton.propTypes = {
//     text: PropTypes.string.isRequired,
//     bgC: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired,
// };


const styles = StyleSheet.create({
    button: {

    },
    text: {
        fontWeight: "600",
        textAlign: 'center',
        fontSize: 12,
        textTransform: 'uppercase'

    }
})
export default MyButton;
