import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';


class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ selected: props.data.selected })
    }

    render() {


        return (
            <TouchableOpacity onLongPress={this.onLongPressHandler} onPress={this.onPressHandler}>
                <View style={[styles.container, { width: this.props.width, height: this.props.heigh }]}>
                    <Image
                        style={[styles.image, { width: this.props.width || 100, height: this.props.height || 100 }]}
                        source={{ uri: this.props.data.uri }}
                    />
                    <View style={styles.text}>
                        <Text>{this.props.data.id}</Text>
                    </View>
                    {
                        this.props.deleteMod ?
                            <View style={styles.cover}>
                                <CheckBox
                                    value={this.state.selected}
                                    onValueChange={(val) => {
                                        this.props.data.selected = !this.state.selected
                                        this.setState({ selected: !this.state.selected })
                                    }}
                                />
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        );
    }

    onLongPressHandler = async () => {
        await this.props.deleteModTrigger()


        if (this.props.deleteMod) {
            this.props.data.selected = !this.state.selected
            this.setState({ selected: !this.state.selected })
        }



    }

    onPressHandler = () => {
        if (this.props.deleteMod) {

            this.props.data.selected = !this.state.selected
            this.setState({ selected: !this.state.selected })
        }
        else {
            this.props.editMode(this.props.data.id, this.props.data.uri)
        }


    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        margin: 1,
    },
    cover: {
        position: "absolute",
        borderWidth: 3,
        borderColor: "#c9185f",
        width: "100%",
        height: "100%"

    },
    image: {
        backgroundColor: "black",
        width: 100,
        height: 100,
    },
    select: {

    },
    deleteMod: {
        borderWidth: 2,
        borderColor: "#c9185f"
    },
    text: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: "white"
    }
})

export default PhotoItem;
