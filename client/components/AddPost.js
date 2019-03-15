import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button } from "react-native";
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input, Form } from 'native-base';
import axios from 'axios';

class AddPost extends React.Component {
  constructor(){
    super();
    this.state = {
      texto: "",
      data: "",
      like: ""
    }
  }

  addPost = () => {
  const acct = this.props.navigation.getParam('acctoken');

  const post = {
    texto: this.state.texto,
    data: new Date().toDateString(),
    like: "0"
  }

    axios.request({
      method:'post',
      url:'http://localhost:4321/api/posts?access_token='+acct,
      data: post
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.log(err));
    this.props.navigation.navigate("Posts")
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
          <Text style={styles.title}>Rede Social</Text>
          </Body>
          <Right/>
        </Header>
        <Content>
        <Text/>
        <Text>Criar conta</Text>
        <Text/>
        <Card>
        <Form>
                <Item>
                  <Input placeholder="Texto..." 
                  value={this.state.texto}
                  onChangeText={texto => this.setState({ texto })}
                  />
                </Item>
        </Form>
        <Button
            onPress={() => this.addPost()}
            title="Publicar"
        />
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

export default AddPost;