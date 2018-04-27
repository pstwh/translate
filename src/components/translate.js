import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class Translate extends Component {
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
            text: this.state.untranslated,
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
                this.setState({ ...this.state, translatedConfirm: translated.text[0] })
            })
    }

    render() {
        return (
            <View
                style={styles.container}>
                <Text
                    style={styles.textUntranslated}
                >
                    {this.state.untranslated}
                </Text>

                <Text
                    style={styles.textTranslatedConfirm}
                >
                    {this.state.translatedConfirm}
                </Text>

                <TextInput
                    style={styles.textTranslatedConfirm}
                    placeholder="Traduza o texto acima!"
                    onChangeText={translated => this.setState({ translated })}
                />

                <Button
                    style={styles.sendButton}
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
        marginTop: 50
    },

    sendButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    textUntranslated: {
        fontWeight: 'bold',
        margin: 20
    },

    textTranslatedConfirm: {
        margin: 20
    },

    translated: {
        marginTop: 20,
    }
});
