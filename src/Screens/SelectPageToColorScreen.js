// React
import React, { Component } from 'react'
import { View, Text, WebView, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

// Assets
import Header from '../Components/Header'
import TopicButton from '../Components/TopicButton'

const { height, width } = Dimensions.get('window')


export default class SelectPageToColorScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newPageUrl: ''
        }
    }

    componentWillMount() {
        this.setState({
            newPageUrl: 'https://tester.csuw.net/cb/phone_new.html'
        })
    }

    render() {
        const { navigation } = this.props
        const { newPageUrl } = this.state

        return (
            <View style={AppStyles.mainContainer}>
                <Header
                    type='Back'
                    navigation={navigation}
                />
                <View style={[styles.cardContainer, AppStyles.hCenter]}>
                    {/*<TopicButton text='Select a page to color' />*/}
                    <WebView
                        source={{ url: newPageUrl }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1
    }
})
