import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.selected })

    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPressHandler} onLongPress={this.onLongPressHandler}>
                <View style={styles.container}>
                    <Image
                        resizeMode={'cover'}
                        style={{
                            width: this.props.width || 100,
                            height: this.props.height || 100,

                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <Text style={styles.name}>{this.props.data.id}</Text>
                    {
                        this.state.selected ?
                            <View style={styles.selected}>
                                <Text style={styles.plus}>+</Text>
                            </View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        );
    }

    onLongPressHandler = () => {
        this.props.onLongClick(this.props.data.id, this.props.data.uri, this.props.data.size)
    }

    onPressHandler = () => {

        this.props.data.selected = !this.state.selected
        this.setState({ selected: !this.state.selected })

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    selected: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: 'center',
        alignItems: "center"
    },
    plus: {
        color: 'pink',
        alignSelf: 'center',
        fontSize: 30
    },
    name: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})
export default FotoItem;
