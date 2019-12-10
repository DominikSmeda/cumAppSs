import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ToolbarAndroid } from 'react-native';
import MyButton from './MyButton';
import * as MediaLibrary from "expo-media-library";
import FotoItem from './FotoItem';
import { ToastAndroid } from 'react-native';

class Gallery extends Component {
    static navigationOptions = {
        header: null,
        title: "Zapisane zdjecia",
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
            useGrid: true,
            photos: [],

        };

        this.readPhotos()
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.readPhotos);
    }

    readPhotos = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })

        let photos = obj.assets.map(el => {

            return {
                id: el.id,
                uri: el.uri,
                selected: false,
                size: el.width + "x" + el.height
            }
        })

        photos = photos.sort((a, b) => {
            return a.id - b.id
        })

        this.setState({ photos: photos })

    }

    render() {

        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={{
                        backgroundColor: 'pink',
                        height: 56, width: "100%",
                        elevation: 5 // cień poniżej
                    }}

                    titleColor="white"
                    // logo={require('./back.png')}
                    title="Zdjęcia zapisane w telefonie"

                    actions={[
                        { title: 'Grid / List', show: 'never' },
                        { title: 'Open Camera', show: 'never' },
                        { title: 'Remove Selected', show: 'never' },
                    ]}
                    onActionSelected={this.onActionSelected}
                />
                {/* <View style={styles.buttons}>
                    <MyButton text="Grid/List" onClick={() => { this.setState({ useGrid: !this.state.useGrid }) }} style={styles.button} />
                    <MyButton
                        text="Open Camera"
                        onClick={() => { this.props.navigation.navigate("CameraScreen") }}
                        style={styles.button}
                    />
                    <MyButton text="Remove Selected" onClick={this.removeSelected} style={styles.button} />
                </View> */}

                <View style={styles.content}>
                    <FlatList
                        data={
                            this.state.photos
                        }
                        numColumns={this.state.useGrid ? 4 : 1}
                        key={this.state.useGrid ? 4 : 1}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) =>
                            <FotoItem
                                onLongClick={this.goToBigPhoto}
                                data={item}
                                width={this.state.useGrid ? Dimensions.get("window").width / 4 : Dimensions.get("window").width}
                                height={this.state.useGrid ? Dimensions.get("window").width / 4 : Dimensions.get("window").width / 2}
                            />}

                    />
                </View>
            </View>
        );
    }

    onActionSelected = (position) => {
        switch (position) {
            case 0:
                this.setState({ useGrid: !this.state.useGrid })
                break;
            case 1:
                this.props.navigation.navigate("CameraScreen");
                break;
            case 2:
                this.removeSelected();
                break;
        }
    }

    removeSelected = async () => {

        let toDeletePhotos = this.state.photos.filter(el => {
            return el.selected
        })

        if (toDeletePhotos.length == 0) {
            ToastAndroid.showWithGravity(
                'Zaznacz zdjęcia do usunięcia!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
        // for (let p of toDeletePhotos) {
        //     p.selected = false
        // }

        let ids = toDeletePhotos.map(el => {
            return el.id
        })

        if (await MediaLibrary.deleteAssetsAsync(ids)) {
            // this.setState({ photos: [] })
            this.readPhotos();
        }
        else {
            ToastAndroid.showWithGravity(
                'Coś poszło nie tak!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    goToBigPhoto = (id, uri, size) => {
        console.log(id, uri);
        this.props.navigation.navigate("BigPhoto", {
            id,
            uri,
            size
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    button: {
        fontSize: 15,
        fontWeight: "500",
    },
    content: {
        flex: 10,

    }

})

export default Gallery;
