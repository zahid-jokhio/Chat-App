import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Login, Chat, People, UserDetail,Userchat, } from '../../Screens/index'
import IconComponent from 'react-native-vector-icons/Ionicons';

const TabNavigator = createBottomTabNavigator({
    AllChat: {
        screen: Chat,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <IconComponent name='md-chatboxes' size={25} color={tintColor} />
            )
        })
    },
    AllUser: {
        screen: People,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <IconComponent name='md-contacts' size={25} color={tintColor} />
            )
        })
    },
  
},
    {
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'red',
        },
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        }
    }


);




const TabsNavigator = createStackNavigator({
    Dashboard: {
        screen: TabNavigator,
    },
    User_Detail: {
        screen: UserDetail
    },
    ChatDetail: {
        screen: Userchat
    },

},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header: null
            };
        }
    }
)



const AppNavigator = createSwitchNavigator({
    Login: {
        screen: Login,
    },
    Dashboard: {
        screen: TabsNavigator
    }

});

export default createAppContainer(AppNavigator)



