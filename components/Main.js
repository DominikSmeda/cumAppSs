import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Permissions from "expo-permissions";

import MyButton from './MyButton'

class Main extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentWillMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Camera App</Text>
                    <Text style={styles.txt}>show gallery pictures</Text>
                    <Text style={styles.txt}>take pictures from camera</Text>
                    <Text style={styles.txt}>save photo to device</Text>
                    <Text style={styles.txt}>delete photo from device</Text>
                </View>
                <View style={styles.content}>

                    <MyButton style={{ fontSize: 20 }} onClick={() => { this.props.navigation.navigate("Gallery") }}>Start</MyButton>

                </View>
            </View>


        );
    }
}
const styles = {
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: "#c9185f",
        justifyContent: 'center',
        color: "white",
        alignItems: 'center',
        color: 'white'
    },
    title: {
        fontSize: 40,
        color: "white",
        fontWeight: '500',
    },
    txt: {
        color: "white"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
export default Main
