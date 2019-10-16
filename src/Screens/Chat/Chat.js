import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import { Container, Header, Body, Content, List, Button, ListItem, Left, Right, Thumbnail } from 'native-base';
import Firebase from '../../Config/Firebase/Firebase'
import { Avatar, Badge, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      userData: '',
      markers: []
    }
  }
  static navigationOptions = {
    header: null
  }

  async  componentDidMount() {
    var that = this
    await Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        Firebase.firestore().collection("users").doc(user.uid).get().then(res => {
          let data = res.data()
          AsyncStorage.setItem('uid', data.uid);

          that.setState({
            userData: data
          })

        })
      }
    });
    let { markers } = this.state
    await Firebase.firestore().collection('users').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (this.state.userData.uid !== doc.data().uid) {
            markers.push(doc.data());
          }
          this.setState({
            markers
          })
        });
      });

  }
  Logout = (path) => {
    alert(path)
    Firebase.auth().signOut().then(function () {
      console.log('Signed Out');
      path.navigate("Login")
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  }



  render() {
    return (

      <SafeAreaView style={{ flex: 1, }}>
        <View style={{
          paddingTop: 18,
        }}>
          <Header style={{ backgroundColor: 'black' }}>
            <Body>
              {

                this.state.userData ?
                  <View style={{ flexDirection: 'row', textAlign: 'left', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("User_Detail", this.state.userData)} >


                      <Avatar
                        rounded
                        source={{
                          uri: this.state.userData.url,
                        }}
                        size="medium"
                      />
                    </TouchableOpacity>


                    <Badge
                      status="success"
                      containerStyle={{ position: 'absolute', top: -2, left: 34 }}
                    />
                    <Text style={{ color: 'white', alignSelf: "center", marginLeft: 3 }}>{this.state.userData.name}</Text>
                  </View>


                  :
                  <Text>{''}</Text>
              }
            </Body>
            <Right>
              <Button style={{ backgroundColor: 'red ' }} transparent onPress={() => this.Logout(this.props.navigation)} >
                {/* <Text style={{ color: 'white' }}>LogOut</Text> */}
                <Icon name='logout' size={30} color='white' />
              </Button>
            </Right>
          </Header>





        </View>




        <Container >
          <Content>
            <List>
              <ScrollView style={{ paddingTop: 10 }} >
                <ScrollView horizontal={true} >
                  {this.state.markers.map((val, i) => {
                    return <View style={{ width: 90 }}>
                      <Left style={{ marginLeft: 10 }}>

                        <Thumbnail source={{ uri: val.url }} style={{ textAlign: 'center' }} />
                        <Text style={{ textAlign: 'center' }} >{val.name} </Text>
                      </Left>
                    </View>

                  })
                  }
                </ScrollView>

                {
                  this.state.markers.map((val, ind) => {
                    return <TouchableOpacity  >

                      {/* <ListItem  avatar style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate("ChatDetail", { profile: val, currentUser: this.state.userData })}>
                        <Left>

                          <Avatar
                            rounded
                            source={{
                              uri: val.url,

                            }}
                            size="medium"
                          />

                          <Badge
                            textStyle={{ color: 'green' }}
                            containerStyle={{ position: 'absolute', top: 19, left: 41 }}
                          />
                        </Left>
                        <Body>
                          <Text>{val.name}</Text>
                          <Text note>{val.email}</Text>
                        </Body>
                        <Right>
                        </Right>
                      </ListItem> */}

                      
                      <ListItem  avatar style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate("ChatDetail", { profile: val, currentUser: this.state.userData })}>
                        <Left>

                          <Avatar
                            rounded
                            source={{
                              uri: val.url,

                            }}
                            size="medium"
                          />

                          <Badge
                            textStyle={{ color: 'green' }}
                            containerStyle={{ position: 'absolute', top: 19, left: 41 }}
                          />
                        </Left>
                        <Body>
                          <Text>{val.name}</Text>
                          <Text note>{val.email}</Text>
                        </Body>
                        <Right>
                        </Right>
                      </ListItem>




                    </TouchableOpacity>




                  })
                }

              </ScrollView>
            </List>
          </Content>
        </Container>
      </SafeAreaView>
    )
  }
}








export default Chat




























