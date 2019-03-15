import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button } from "react-native";
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input, Form } from 'native-base';
import axios from 'axios';


class AddUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }

addUser = () => {
  const newUser = {
    username: this.state.username,
    email: this.state.email,
    password: this.state.password
  }

    axios({
      method:'post',
      url:'http://localhost:4321/api/Users',
      data: newUser
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.log(err));
    
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.title}>Rede Social</Text>
        </Header>
        <Content>
        <Text/>
        <Text>Criar conta</Text>
        <Text/>
        <Card>
                <CardItem>
                  <Input placeholder="Nome..." 
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                  maxLength={25}
                  />
                </CardItem>
                <CardItem>
                  <Input placeholder="E-mail..." 
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
              onPress={() => this.addUser()}
              title="Criar conta"
        />
        <Text/>
        </Card>
        </Content>
      </Container>
    );
  }
}


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

export default AddUser;