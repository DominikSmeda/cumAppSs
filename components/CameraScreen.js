import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";

class CameraScreen extends Component {
    static navigationOptions = {
        title: "Kamera",
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
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        };
        this.camera = null;
    }


    componentDidMount = () => {
        this.setPermission()
    };

    async setPermission() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
    }


    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <CircleButton name="refresh" size={25} reverse={true} onClick={this.changeCamera} />
                            <CircleButton name="photo" size={35} onClick={this.takePhoto} />
                            <CircleButton name="settings" size={25} />
                        </View>
                    </Camera>
                </View>
            );
        }
    }

    changeCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    takePhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri);
            ToastAndroid.showWithGravity(
                'Zapisano!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }
}

const styles = StyleSheet.create({
    buttons: {
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        right: 0
    }
})

export default CameraScreen;
