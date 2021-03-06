// React
import React, { Component } from 'react'
import { Linking } from 'react-native'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

const { height, width } = Dimensions.get('window')
const { Margins, Paddings, FontSizes, BorderRadii, Colors } = Constants

const AnswerBoxSubContent = ({ content }) => {
    return (
        <View style={styles.subContentBox}>
            {
                !content.hasEmbeddedLink ? (
                <Text style={styles.subTextStyle}>{content.subContent}</Text>
                ) : (
                <Text style={styles.subTextStyle}>{content.subContent.preLinkText}
                    <Text style={{color: Colors.orange}} onPress={() => Linking.openURL(content.subContent.link)}>
                        {content.subContent.linkText}
                    </Text>
                    {content.subContent.postLinkText}
                </Text>
                )
            }
        </View>
    )
}


export default class AnswerBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isDisplayed: false
        }
    }

    onAnswerItemClicked = () => {
        this.setState({
            isDisplayed: !this.state.isDisplayed
        })
    }

    render() {
        const { content } = this.props
        const { isDisplayed } = this.state
        const answerItemBgStyle = {
            backgroundColor: isDisplayed ? Colors.orange : Colors.darkGreen
        }

        return (
            <View>
                <TouchableOpacity onPress={() => this.onAnswerItemClicked()}>
                    <View style={[styles.boxContainer, answerItemBgStyle]}>
                        <View style={[styles.captionArea, AppStyles.center]}>
                            <Text style={styles.captionText}>
                                {content.choiceCaption}
                            </Text>
                        </View>
                        <View style={styles.contentArea}>
                            <Text style={styles.textStyle}>{content.content}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    isDisplayed &&
                    <AnswerBoxSubContent content={content} />
                }
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        width: width - 40,
        borderRadius: BorderRadii.boxBR,
        padding: Paddings.elementP,
        marginTop: 10
    },

    captionArea: {
        flex: .15
    },

    captionText: {
        color: 'white',
        fontSize: FontSizes.quizCaptionFS,
        fontWeight: '900'
    },

    contentArea: {
        flex: .85
    },

    textStyle: {
        color: 'white',
        fontSize: FontSizes.quizAnswerFS
    },

    subContentBox: {
        flexDirection: 'row',
        width: width - 40,
        backgroundColor: 'white',
        borderRadius: BorderRadii.boxBR,
        padding: Paddings.elementP,
        marginTop: Margins.elementMT
    },

    subTextStyle: {
        color: 'black',
        fontSize: FontSizes.quizAnswerFS
    }
})
