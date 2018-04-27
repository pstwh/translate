import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      untranslated: 'Linear algebra is a branch of mathematics that is widely used throughout science and engineering.',
      translated: '',
      translatedConfirm: '',
    }
  }

  send() {
    let body = {
      key: '',      
      format: 'plain',
      lang: 'en-pt',
      text: 'Linear algebra is a branch of mathematics that is widely used throughout science and engineering.',
    }

    let formBody = [];
    for (let key in body) { formBody.push(encodeURIComponent(key) + "=" + encodeURIComponent(body[key])); }
    formBody = formBody.join("&");

    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate', {
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    })
    .then(response => response.json())
    .then(translated => {
      //console.warn(translated.text[0])
      this.setState({...this.state, translatedConfirm: translated.text[0]})
    })
  }

  render() {
    return (
      <View 
        style={styles.container}>
        <Text
          style={styles.untranslated}
        >
          {this.state.untranslated}
        </Text>

        <Text>
          {this.state.translatedConfirm}
        </Text>

        <TextInput
          style={styles.translated}
          placeholder="Traduza o texto acima!"
          onChangeText={translated => this.setState({ translated })}
        />

        <Button
          onPress={this.send.bind(this)}
          title="Send"          
          accessibilityLabel="Send"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  untranslated: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  translated: {
    marginTop: 20,
  }
});
