import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Animated, ScrollView, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";
import RadioGroup from './RadioGroup';

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
        this.ratios = ["4:3", "16:9"];
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.front,
            openSettings: false,
            ratio: this.ratios[0],
            whiteBalance: null,
            pictureSize: null,
            flashMode: null,
            sizes: [],
            pos: new Animated.Value(Dimensions.get('window').height)

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

    toggle = () => {

        if (this.openSettings) toPos = 700; else toPos = 0

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
            }
        ).start();

        this.openSettings = !this.openSettings;
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
                        onCameraReady={() => this.getSizes()}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        flashMode={this.state.fm}
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <CircleButton name="refresh" size={25} reverse={true} onClick={this.changeCamera} />
                            <CircleButton name="photo" size={35} onClick={this.takePhoto} />
                            <CircleButton name="settings" size={25} onClick={this.toggle} />
                        </View>
                    </Camera>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateY: this.state.pos }
                                ]
                            }]} >

                        <View style={styles.settings}>
                            <ScrollView>
                                <Text style={styles.settingsTitle}>Settings</Text>

                                <RadioGroup
                                    color="red"
                                    change={(e) => {
                                        this.setState({ wb: e })
                                    }}
                                    direction="column"
                                    data={Object.keys(Camera.Constants.WhiteBalance)}
                                    groupName="White Balance"
                                />

                                <RadioGroup
                                    color="red"
                                    change={(e) => {
                                        this.setState({ fm: e })
                                    }}
                                    direction="column"
                                    data={Object.keys(Camera.Constants.FlashMode)}
                                    groupName="FlashMode"
                                />

                                <RadioGroup
                                    color="red"
                                    change={(e) => {
                                        this.setState({ ratio: e })
                                        this.getSizes();
                                    }}
                                    direction="column"
                                    data={this.ratios}
                                    groupName="Camera Ratio"
                                />

                                <RadioGroup
                                    color="red"
                                    change={(e) => {
                                        this.setState({ ps: e })
                                    }}
                                    direction="column"
                                    data={this.state.sizes}
                                    groupName="Picture Sizes"
                                />
                            </ScrollView>
                        </View>

                    </Animated.View>


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

    getSizes = async () => {


        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
            this.setState({ sizes })

            console.log('sizes');
        }
    };
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
    },
    settings: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        width: "100%",
        height: "100%",

    },
    settingsTitle: {
        color: "white",
        padding: 20,
        fontSize: 20,
        fontWeight: "400",
        textTransform: 'uppercase'
    },
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "50%",
        height: "100%",
    }
})

export default CameraScreen;
