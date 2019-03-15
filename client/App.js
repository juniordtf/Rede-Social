import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert, AsyncStorage } from "react-native";
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input, Form } from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddPost from './components/AddPost';
import AddUser from './components/AddUser';
import Posts from './components/Posts';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      token: "", 
    }
  }
  
  allowUser = () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    axios.request({
      method:'post',
      url:'http://localhost:4321/api/Users/login',
      data: credentials
    }).then(response => {
      this.setState({token:response.data.id})
      let user = response.data.id;
      AsyncStorage.setItem('user', user);
    }).catch(err =>console.log(err));
  }

  
  onSubmit = async () => {
    try {
      if(this.state.email.length == 0){
        Alert.alert("Campo e-mail não preenchido!");
      }else if(this.state.password.length == 0){
        Alert.alert("Campo senha não preenchido!");
      }else if(this.state.password.length < 5){
        Alert.alert("A senha deve ter ao menos 6 caracteres!");
      }else{
        this.allowUser();
        let id = await AsyncStorage.getItem('user');
        this.props.navigation.navigate("Posts",{id})

        this.setState({
          email:"",
          password:""
        })
      }
    } catch (error) {
      Alert.alert(error);
    }
  };
  
  
  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.title}>Rede Social</Text>
        </Header>
        <Content>
        <Text/>
        <Text>  Login</Text>
        <Text/>
        <Card>
                <CardItem>
                  <Input placeholder="Email..." 
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  maxLength={25}
                  />
                </CardItem>
                <CardItem>
                  <Input placeholder="Senha..." 
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  maxLength={15}
                  />
                </CardItem>

        <Button
              onPress={() => this.onSubmit()}
              title="Entrar"
          />
        <Text/>
        </Card>
        <CardItem>
        <Button
              onPress={() => this.props.navigation.navigate("AddUser")}
              title="Criar cadastro"
          />
        </CardItem>
        </Content>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Posts: {
    screen: Posts,
    navigationOptions: {
      header: null
    }
  },
  AddPost: {
    screen: AddPost,
    navigationOptions: {
      header: null,
    },
  },
  AddUser: {
    screen: AddUser,
    navigationOptions: {
      header: null,
    },
  },
});

const App = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    height: 80,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  title: {
    fontSize: 22,
    color: "black",
    textAlign: "center"
  },
});

export default App;