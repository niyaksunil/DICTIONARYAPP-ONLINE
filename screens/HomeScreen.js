import * as React from 'react';
import {Text, StyleSheet , View , TextInput , Button , TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            text : '',
            isButtonPressed : false,
            word : '',
            description : '',
            lexicalCategory : ''
        }
    }

    getWord = (word)=>{
        this.setState({word:"Loading ..."})
        var searchWord = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchWord+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status === 200){
                return data.json()
            }else {
                return null
            }
        })
        .then((response)=>{
            var responseObject = response;

            if(responseObject){
                var wordData = responseObject.definitions[0]
                var description = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word":searchWord,
                    "description" : description,
                    "lexicalCategory" : lexicalCategory
                })
            }else{
                this.setState({
                    "word" : "Not Found",
                    "lexicalCategory" : "Not Found",
                    "description" : "Not Found"
                })
            }
        })
    }

    render(){
        return(
            <SafeAreaProvider>
                <View>
                    <Header
                        backgroundColor = {"#76212d"}
                        centerComponent = {{
                        text:"DICTIONARY APP",
                        style :{color:"white",fontSize:20},
                    }}/> 

                    <TextInput 
                        style = {styles.inputBox}
                        onChangeText={(typed)=>{
                        this.setState({text:typed})
                        }}
                        value = {this.state.typed}
                    />

                    <TouchableOpacity style = {styles.button}
                        onPress = {()=>{this.setState({isButtonPressed:true});
                                        this.getWord(this.state.text);}}>
                        <Text style = {{color : "white"}}>Search</Text>
                    </TouchableOpacity>
                    
                    <View>
                        <Text style = {styles.typeStyle}> Word :
                            {
                                this.state.isButtonPressed && this.state.word === "Loading ..."
                                ? this.state.word : (this.state.word !== "Loading..." ? this.state.word : "")
                            }    
                              
                        </Text>
                        <Text style = {styles.typeStyle}>Type : {this.state.lexicalCategory}</Text>
                        <Text style = {styles.typeStyle}>Definition : {this.state.description}</Text>
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    
    inputBox: {
        marginTop: 100,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
      },
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign : 'center',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 50,
        width: 100,
        height: 50,
        marginLeft: 70,
        backgroundColor:"#165673",
        color:"white"
      },
    typeStyle:{
        fontSize:20,
        textAlign : "left",
        marginTop:20,
        color:"#67213c"
      }
})