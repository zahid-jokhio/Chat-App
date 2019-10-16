import React from "react";
import { View , Image ,Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Facebook from 'expo-facebook';

import Firebase from '../../Config/Firebase/Firebase'


export default class Login extends React.Component {
    componentDidMount() {
        var that  = this
        Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.props.navigation.navigate("Dashboard")
            }
            // handle it
        });
    }

    static navigationOptions = {
        header: null

    };
  

    loginWithFacebook = async (path) => {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('335030280633219', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success' && token) {
                var credential = await Firebase.auth.FacebookAuthProvider.credential(token);
                await Firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((result) => {
                        console.log("Result==>", result)
                        let data = result.additionalUserInfo.profile

                        let obj = {
                            name: data.name,
                            uid: result.user.uid,
                            url: data.picture.data.url
                        }
                        Firebase.firestore().collection("users").doc(obj.uid).set(obj).then(
                            path.navigation.navigate('Dashboard')
                        )
                    })
                    .catch((err) => {
                        console.log('Error==>', err)
                    })
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        return (


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Image
            style={{width: 200, height: 200}}
            source={require('../../attachment_91476002.png')}
          />

                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"
                    onPress={() => this.loginWithFacebook(this.props)}
                >
                    Login with Facebook
                </Icon.Button>
            </View>
        )
    }
}
