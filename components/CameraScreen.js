import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native"
import { ToastAndroid } from 'react-native';

import RadioGroup from './RadioGroup';

class CameraScreen extends Component {
    static navigationOptions = {
        // header: null,
        title: "Camera",
        headerStyle: {
            backgroundColor: "pink",
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
            type: Camera.Constants.Type.back,
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

    toggle = async () => {
        await this.getSizes();
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

    componentDidMount() {
        this.setCameraPermission();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    async setCameraPermission() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
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
                            <CircleButton name="refresh" size="30" onClick={this.changeCamera} />
                            <CircleButton name="camera" size="50" onClick={this.takePhoto} />
                            <CircleButton name="settings" size="30" onClick={this.toggle} />

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
                                    color="pink"
                                    change={(e) => {
                                        this.setState({ wb: e })
                                    }}
                                    direction="column"
                                    data={Object.keys(Camera.Constants.WhiteBalance)}
                                    groupName="White Balance"
                                />

                                <RadioGroup
                                    color="pink"
                                    change={(e) => {
                                        this.setState({ fm: e })
                                    }}
                                    direction="column"
                                    data={Object.keys(Camera.Constants.FlashMode)}
                                    groupName="FlashMode"
                                />

                                <RadioGroup
                                    color="pink"
                                    change={async (e) => {
                                        await this.setState({ ratio: e })
                                        await this.getSizes();
                                    }}
                                    direction="column"
                                    data={this.ratios}
                                    groupName="Camera Ratio"
                                />

                                <RadioGroup
                                    color="pink"
                                    change={(e) => {
                                        console.log(e);

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
            console.log(this.state.ratio);

            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
            this.setState({ sizes })
        }
    };
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0)",
        bottom: 0,
        justifyContent: "center",
        alignSelf: 'center',
    },
    settings: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        width: "100%",
        height: "100%",

    },
    settingsTitle: {
        color: "white",
        padding: 10,
        fontSize: 15,
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
