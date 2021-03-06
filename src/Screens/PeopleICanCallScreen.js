import React, { Component } from 'react'
import { 
    View, 
    FlatList, 
    Text, 
    Dimensions,
    StyleSheet,
    Platform, PermissionsAndroid
} from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import Contacts from 'react-native-contacts'

// Gloabal Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

// Assets
import Header from '../Components/Header'
import Button from '../Components/Button'

const { height, width } = Dimensions.get('window')
const { ThingsThatMakeMeSmileImages, Margins, Paddings, Colors, FontSizes } = Constants

const PLATFORM = Platform.OS;
const userIcon = require('../Assets/Images/male.png') 


export default class PeopleICanCallScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            contacts: [],
            filterContacts: []
        }
    }

    async componentDidMount() {
        if (PLATFORM === 'android') {
            const contactPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
            if (!contactPermission) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: 'DoD Safe Helpline',
                    message: 'DoD Safe Helpline needs access to your contacts'
                })
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.fetchContacts();
                }
            } else {
                this.fetchContacts();
            }
        } else {
            this.fetchContacts();
        }
    }

    async fetchContacts() {
        Contacts.getAll( async (err, contacts) => {
            if (err) {
                console.log("Fetch Contacts: ", err)
            }
            this.setState({
                contacts: contacts,
                filterContacts: contacts
            })
        })
    }

    onContactItemClicked = (contact) => {
        const { navigation } = this.props
        const { navigate } = navigation
        navigate('TalkToSomeoneScreen', { contact: contact })
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            />
        );
    };

    renderEmptyView = () => {
        return (
            <View style={AppStyles.center}>
                <Text style={styles.notice}>
                    No contact to display...
                </Text>
            </View>
        );
    };

    filterContacts = (key) => {
        const { contacts } = this.state
        key = key.toLowerCase();
        const filterContacts = contacts.filter(item => item.givenName.toLowerCase().indexOf(key) !== -1 || item.familyName.toLowerCase().indexOf(key) !== -1)
        this.setState({
            filterContacts: filterContacts
        })
    }

    render() {
        const { navigation } = this.props
        const { filterContacts, modalVisible } = this.state
        
        return (
            <View style={AppStyles.mainContainer}>
                <Header
                    type='Back'
                    navigation={navigation}
                />
                <SearchBar
                    containerStyle={styles.searchBar}
                    placeholder="Type Here..." 
                    onChangeText={(key) => this.filterContacts(key)}
                    round
                    lightTheme
                />
                <FlatList
                    data={filterContacts}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.givenName} ${item.familyName}`}
                            subtitle={item.phoneNumbers[0].number}
                            avatar={item.thumbnailPath? { uri: item.thumbnailPath }:userIcon}
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={() => this.onContactItemClicked(item)}
                            titleStyle={styles.title}
                            subtitleStyle={styles.subtitle}
                        />
                    )}
                    keyExtractor={item => item.recordID}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmptyView}
                    contentContainerStyle={[ { flexGrow: 1 } , filterContacts.length ? null : { justifyContent: 'center'} ]}
                />
                    
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    },

    searchBar: {
        backgroundColor: Colors.primaryBgColor,
        borderTopWidth: 0
    },

    title: {
        color: 'white',
        fontSize: FontSizes.topicFS,
        fontWeight: '600'
    },

    subtitle: {
        color: 'white'
    },

    notice: {
        display: 'flex',
        flex: 1,
        color: 'white',
        fontSize: FontSizes.topicFS
    }
})
