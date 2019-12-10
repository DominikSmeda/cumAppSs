import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radios: [],
            selected: 0
        };
    }

    componentDidMount = async () => {
        // await this.setState({ radios: this.props.data.map(el => false) })

        // this.state.radios[0] = true
        // this.setState({ radios: this.state.radios })
    }

    selectRadio = (i) => {
        this.setState({ selected: i })
        // this.setState({
        //     radios: this.state.radios.map((el, i) => {
        //         if (id == i) {
        //             return true;
        //         }
        //         return false;
        //     })
        // })

        this.props.change(this.props.data[i])
    }

    render() {

        let radios = this.props.data.map((el, i) => {
            return (
                <View style={styles.radioItem} key={i}>
                    <Radio i={i}
                        bgC={this.props.color}
                        selected={this.state.selected}
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
                        this.props.selected == this.props.i ?
                            < View style={[styles.radioSelect, { backgroundColor: this.props.bgC || "black" }]}></View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity >
        )
    }
}


const styles = StyleSheet.create({
    group: {
        padding: 15,
        borderTopWidth: 1,
        borderColor: "white"
    },
    radio: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 2
    },

    radioSelect: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 10
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
