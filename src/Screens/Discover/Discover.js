import React from 'react'
import { View, Text } from 'native-base'

class Discover extends React.Component{
  
  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>
          Hello, I am Discover Component
        </Text>
      </View>
    )
  }
}
export default Discover