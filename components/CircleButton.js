import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick}>
                <View style={styles.container}>
                    <Icon
                        name={this.props.name}
                        color='#c9185f'
                        size={Number(this.props.size)}
                        raised
                    />

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0)',
        alignSelf: 'center',
        padding: 10
    }
})

export default CircleButton;
