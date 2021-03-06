// React
import React, { Component } from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

// Assets
import Header from '../Components/Header'

const maleIcon = require('../Assets/Images/male.png')
const femaleIcon = require('../Assets/Images/female.png')

const { height, width } = Dimensions.get('window')

const NoteContainer = ({ header, description }) => {

    return (
        <View style={styles.noteContainer}>
            <Text style={styles.titleText}>
                {header}
            </Text>
            <View style={AppStyles.hCenter}>
                <View style={styles.separateBar} />
            </View>
            <Text style={styles.contentText}>
                {description}
            </Text>
        </View>
    )
}

const GenderBox = ({ imgSrc, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.genderBox, AppStyles.center]}>
                <Image source={imgSrc} style={styles.avatar}/>
            </View>
        </TouchableOpacity>
    )
}

const goToScreen = (ScreenName, gender, navigation) => {
    const { navigate, state } = navigation
    const { content } = state.params
    navigate(ScreenName, { content, gender })
}

const onMaleSelected = (navigation) => {
    goToScreen('ExerciseListenScreen', 'male', navigation)
}

const onFemaleSelected = (navigation) => {
    goToScreen('ExerciseListenScreen', 'female', navigation)
}

const GenderBoxContainer = ({ navigation }) => {
    return (
        <View style={styles.genderBoxContainer}>
            <GenderBox
                imgSrc={maleIcon}
                onPress={() => onMaleSelected(navigation)}
            />
            <GenderBox
                imgSrc={femaleIcon}
                onPress={() => onFemaleSelected(navigation)}
            />
        </View>
    )
}


export default class ExerciseDetailScreen extends Component {
    render() {
        const { navigation } = this.props
        const { params } = navigation.state
        const { content } = params
        const headerText = content.subTopic ? content.subTopic : ''
        const descriptionText = content.subDescription ? content.subDescription : ''

        return (
            <View style={AppStyles.mainContainer}>
                <Header
                    type='Back'
                    navigation={navigation}
                />
                <ScrollView>
                    <ImageBackground
                        style={styles.container}
                        source={content.bgImage}
                    >
                        <View style={{flex: 1}}>
                            <View style={[{ flex: .75 }, AppStyles.hCenter]}>
                                <NoteContainer
                                    header={headerText}
                                    description={descriptionText}
                                />
                            </View>
                            <View style={[{ flex: .25}, AppStyles.hCenter, AppStyles.vEnd]}>
                                <GenderBoxContainer
                                    navigation={navigation}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height - 64,
        padding: 40
    },

    noteContainer: {
        width: width - 40,
        marginTop: Constants.Margins.containerM,
        padding: Constants.Paddings.containerP,
        backgroundColor: Constants.Colors.gray,
        borderRadius: Constants.BorderRadii.boxBR
    },

    titleText: {
        color: 'white',
        fontSize: Constants.FontSizes.quizTitleFS,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom : 10
    },

    separateBar: {
        height: 2,
        width: width - 80,
        backgroundColor: 'white'
    },

    contentText: {
        color: 'white',
        marginTop: 10,
    },

    genderBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 40
    },

    genderBox: {
        width: width / 2 - 30,
        height: height / 6,
        backgroundColor: '#268e77',
        borderRadius: Constants.BorderRadii.boxBR
    },

    avatar: {
        width: 80,
        height: 90
    }
})
