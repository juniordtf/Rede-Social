import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert, AsyncStorage } from "react-native";
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input } from 'native-base';



class Posts extends Component{
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts(){

    axios.get('http://localhost:4321/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
    })
    .catch(err => console.log(err));
  }

  logout = () => {

    const acc = this.props.navigation.getParam('id');

    axios.post('http://localhost:4321/api/Users/logout?access_token='+acc).
    then(response => {
      console.log(response.body);
    }).catch(err => console.log(err));

    this.props.navigation.navigate("Login")
  }

  render(){

    const acctoken = this.props.navigation.getParam('id');

    return (
      <Container>
      <Header>
        <Text style={styles.title}>Rede Social</Text>
      </Header>
      <Content>
      <Text/>
      <Text>Publicações</Text>
      <Text/>
      <Card>

        {this.state.posts.map((item, index) => {
          return (
            <View key={index} >  
              <Text>Texto: {item.texto}</Text>
              <Text>Data: {item.data}</Text>
              <Text/>
            </View>
          );
        })}

      </Card>
      <Card>
      <Button
            onPress={() => this.props.navigation.navigate("AddPost",{acctoken})}
            title="Fazer uma publicação"
      />
      <Button
            onPress={() => this.logout()}
            title="Sair"
      />
      </Card>
      </Content>
    </Container>
    )
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

export default Posts;