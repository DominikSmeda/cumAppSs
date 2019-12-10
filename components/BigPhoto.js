import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as MediaLibrary from "expo-media-library";
// import CircleButton from './CircleButton';
import MyButton from './MyButton';
import CircleButton from './CircleButton';
import { BackHandler } from "react-native"

class BigPhoto extends Component {
    static navigationOptions = {
        // header: null,
        title: "Podgląd zdjęcia",
        headerStyle: {
            backgroundColor: "pink",
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goToGallery);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goToGallery);
    }


    render() {

        return (
            <View style={styles.container}>
                <Image
                    resizeMode={'cover'}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: this.props.navigation.state.params.uri }}
                />

                <View style={styles.buttons}>
                    <CircleButton name="delete" size="30" onClick={this.delete} />
                </View>
                <Text style={{ position: 'absolute', bottom: 0, padding: 5, right: 0, backgroundColor: 'rgba(0,0,0,0.8)', color: 'pink' }}>{this.props.navigation.state.params.size}</Text>

            </View>
        );
    }

    delete = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.navigation.state.params.id])
        this.goToGallery()
    }

    goToGallery = () => {
        this.props.navigation.goBack();
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    button: {

        backgroundColor: 'red',
        padding: 10
    },
    buttons: {
        width: "100%",
        height: 50,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default BigPhoto;
