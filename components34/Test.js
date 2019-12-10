import { Animated, StyleSheet, View, Text, Button } from "react-native";
import React, { Component } from 'react';
import RadioGroup from "./RadioGroup";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(500),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        console.log(this.state.pos)
    }

    toggle() {

        if (this.isHidden) toPos = 0; else toPos = 500

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

        this.isHidden = !this.isHidden;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <Text>ANIMATE ME!</Text>

                </Animated.View>

                <Button title="start" style={styles.button} onPress={() => { this.toggle() }} />
                <RadioGroup
                    color="blue"
                    change={(e) => console.log(e)}
                    direction="row"
                    data={[1, 2, 3, 4, "aaa", "bbb"]}
                    groupName="Kamera" />
            </View>
        );
    }
}


var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00ff00",
        height: 500,
    }
});

export default Test
