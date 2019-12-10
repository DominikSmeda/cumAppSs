import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radios: []
        };
    }

    componentDidMount = async () => {
        await this.setState({ radios: this.props.data.map(el => false) })

        this.state.radios[0] = true
        this.setState({ radios: this.state.radios })
    }

    selectRadio = (id) => {

        this.setState({
            radios: this.state.radios.map((el, i) => {
                if (id == i) {
                    return true;
                }
                return false;
            })
        })

        this.props.change(this.props.data[id])
    }

    render() {

        let radios = this.props.data.map((el, i) => {
            return (
                <View style={styles.radioItem} key={i}>
                    <Radio i={i}
                        bgC={this.props.color}
                        selected={this.state.radios[i]}
                        onClick={this.selectRadio}
                    />
                    <Text style={styles.radioText}>{el}</Text>
                </View>
            )
        })



        return (
            <View style={styles.group}>
                <Text style={styles.groupName}> {this.props.groupName} </Text>
                <View style={{ flexDirection: this.props.direction }}>
                    {radios}
                </View>

            </View>
        );
    }
}


class Radio extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {


        return (
            <TouchableOpacity onPress={this.props.onClick.bind(this, this.props.i)}>

                <View style={[styles.radio, { borderColor: this.props.bgC || "black" }]}>
                    {
                        this.props.selected ?
                            <View style={[styles.radioSelect, { backgroundColor: this.props.bgC || "black" }]}></View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    group: {
        padding: 10,
        borderTopWidth: 2,
        borderColor: "white"
    },
    radio: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 4
    },

    radioSelect: {
        width: 14,
        height: 14,
        borderRadius: 14 / 2,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5
    },
    radioText: {
        paddingLeft: 10,
        color: "white",
        fontSize: 15
    },
    groupName: {
        color: "white",
        textAlign: "right",
        textTransform: 'uppercase'
    }
})

export default RadioGroup;
