import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
  CheckBox
  
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';

export default class Registration extends Component {
    static navigationOptions = {
        header: null,    
      }
      
      state = {
        
     data:[{label:'Student'},{label:'Faculty'}],
      email:'',
    password1:'',
    password2:'',
    username:'',
    is_student:false,
    is_teacher:false,
    selectedButton:'Student'
      }
      UserRegistrationFunction = (selectedButton) =>{
        
       if(selectedButton=='Student')
       {
        this.setState({is_student:true})
       }
       else
       {
        this.setState({is_teacher:true})
       }
      
        fetch('http://192.168.100.42:8000/rest-auth/registration/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: this.state.email,
              
                 password1: this.state.password1,
               password2: this.state.password2,
                 username:this.state.username,
               is_teacher:this.state.is_teacher,
               is_student:this.state.is_student
          
           })
          
         }).then((response) => response.json())
               .then((responseJson) => {
         
                 // If server response message same as Data Matched
                
                 if(responseJson.key !=null )
                 {
         
                     
                  this.props.navigation.navigate("Login")
         
                 }
                 else
                 {
                  Alert.alert(JSON.stringify(responseJson));
                 }
                  //  Alert.alert(JSON.stringify(responseJson));
                
               }).catch((error) => {
                 console.error(error);
               });
          
           }
      
onPress = data => this.setState({ data });

    render() {
      let selectedButton = this.state.data.find(e => e.selected == true);
      selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             <View style={styles.container}>
             <View style={styles.up}>
             <Text style={styles.title}>
             Phonics Group Of Institution
          </Text>
             </View>
             <View style={styles.down}>
             <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
               
                placeholder="Enter your username"
                placeholderTextColor='black'
                onChangeText={username => this.setState({username})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
               
                placeholder="Enter your email"
                placeholderTextColor='black'
                onChangeText={email => this.setState({email})}
              >
              </TextInput>
            </View>
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="enter password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password1 => this.setState({password1})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="confirm password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password2 => this.setState({password2})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <Text
              > Are u a?
              </Text>
              <View >
                {/* <Text style={styles.RadiovalueText}>
                    Value = {selectedButton}
                </Text> */}
                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
              
            </View>
           
            </View>
            <TouchableOpacity style={styles.RegisterButton} onPress={() => {
    this.UserRegistrationFunction(selectedButton);
  }} >
              <Text style={styles.loginButtonTitle} >Register</Text>
              
            </TouchableOpacity>
           
          
            
             </View>
            
                 </View>

            </TouchableWithoutFeedback>


        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',  
      backgroundColor: COLOR_PINK_LIGHT
    },
    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      down: {
        flex: 7,//70% of column
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      title: {
        color: 'white',
        color: COLOR_PINK_MEDIUM,
        textAlign: 'center',
        width: 400,
        fontSize: 23
      },
      textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color:'black'
      //a = alpha = opacity
      },
      textInput: {
        width: 280,
        height: 45
      },
      RegisterButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_GREEN
      },
      loginButtonTitle: {
        fontSize: 18,
        color: 'white'
      },
      
})