import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import * as Permissions from "expo-permissions";

class Main extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.askForPermission()
    }

    async askForPermission() {
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
                    <Text style={styles.descript}>Camera App</Text>
                    <Text style={styles.descript}>Camera App</Text>
                    <Text style={styles.descript}>Camera App</Text>
                </View>
                <View style={styles.content}>
                    <MyButton text="Start" onClick={
                        () => {
                            this.props.navigation.navigate("Gallery")
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "pink"
    },
    title: {
        color: "white",
        fontSize: 30
    },
    descript: {
        color: "white"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default Main;
