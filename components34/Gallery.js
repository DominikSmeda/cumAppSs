import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, ToolbarAndroid, BackHandler } from 'react-native';
import { Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";

import MyButton from './MyButton';

import { FlatList } from 'react-native-gesture-handler';
import PhotoItem from './PhotoItem';

class Gallery extends Component {
    static navigationOptions = {
        title: "Zdjęcia zapisane w telefonie",
        headerStyle: {
            backgroundColor: "#c9185f",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            galleryType: false,
            numColumns: 4,
            deleteMod: false,
            idsToDelete: []
        };
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.readAssets);
        // this.readAssets()
    }

    readAssets = async () => {

        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })


        let assets = obj.assets.map(el => {

            return {
                id: el.id,
                uri: el.uri,
                selected: false
            }

        })

        assets = assets.sort((a, b) => {
            return b.id - a.id
        })

        this.setState({ assets });

    }

    render() {

        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={{
                        backgroundColor: 'red',
                        height: 56, width: "100%",
                        elevation: 5 // cień poniżej
                    }}

                    titleColor="black"
                    // logo={require('./back.png')}
                    title="Zdjęcia zapisane w telefonie"

                    actions={[
                        { title: 'Grid / List', show: 'naver' },
                        { title: 'Open Camera', show: 'naver' },
                        { title: 'Remove Selected', show: 'never' },
                    ]}
                    onActionSelected={this.onActionSelected}
                />
                <View style={styles.options}>
                    <MyButton onClick={this.galleryType}>Grid / List</MyButton>
                    <MyButton onClick={() => { this.props.navigation.navigate("CameraScreen") }}>Open Camera</MyButton>
                    <MyButton onClick={this.removeSelected}>Remove Selected</MyButton>
                </View>
                <View style={styles.assets}>
                    <FlatList
                        data={
                            this.state.assets
                        }
                        numColumns={this.state.galleryType ? 1 : 4}
                        key={this.state.galleryType ? 1 : 4}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) =>
                            <PhotoItem
                                data={item}
                                width={this.state.galleryType ? Dimensions.get('window').width - 2 : Dimensions.get('window').width / 4 - 2}
                                height={this.state.galleryType ? Dimensions.get('window').width / 2 : Dimensions.get('window').width / 4 - 2}
                                deleteMod={this.state.deleteMod}
                                deleteModTrigger={this.useDeleteMod}
                                editMode={this.editMode}
                            />}

                    />
                </View>
            </View>
        );
    }

    galleryType = () => {
        this.setState({ galleryType: !this.state.galleryType })
    }

    onActionSelected = (position) => {
        switch (position) {
            case 0:
                this.galleryType();
                break;
            case 1:
                this.props.navigation.navigate("CameraScreen");
                break;
            case 2:
                this.removeSelected();
                break;
        }
    }

    useDeleteMod = () => {

        this.setState({
            assets: this.state.assets.map(el => {
                return { ...el, selected: false }
            })
        })

        this.setState({ deleteMod: !this.state.deleteMod })

        let handleBackPress = () => {
            this.useDeleteMod();
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            return true;
        }

        if (this.state.deleteMod) {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        }
        else {

        }
    }

    editMode = (id, uri) => {
        this.props.navigation.navigate("BigPhoto", { id, uri })

    }

    removeSelected = async () => {

        let toDelete = this.state.assets.filter(el => {
            return el.selected;

        })

        let ids = toDelete.map(el => el.id);
        if (ids.length == 0) {
            ToastAndroid.showWithGravity(
                'Wybierz zdjęcia!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }


        await MediaLibrary.deleteAssetsAsync(ids);

        this.readAssets();



    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    assets: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 1
    }

})

export default Gallery;
