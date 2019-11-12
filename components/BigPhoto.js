import React, { Component } from 'react';
import { View, Text, Image, ToastAndroid, StyleSheet } from 'react-native';
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";

class BigPhoto extends Component {
    static navigationOptions = {
        title: "Photo",
        headerStyle: {
            backgroundColor: "#c9185f",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View >
                <Image
                    resizeMode={'cover'}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: this.props.navigation.state.params.uri }}
                />
                <View style={styles.button}>
                    <CircleButton name="delete" size={25} onClick={this.deletePhoto} />
                </View>
            </View>
        );
    }

    deletePhoto = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.navigation.state.params.id]);
        ToastAndroid.showWithGravity(
            'Usunięto!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    }
})

export default BigPhoto;
