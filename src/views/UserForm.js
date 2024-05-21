import React, { useState } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default ({route, navigation}) => {

    const [user, setUser] = useState(route.params ? route.params : {})

    return (
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput 
                style={styles.input}
                onChangeText={name => setUser({...user, name})} 
                placeholder="Informe o nome"
                value={user.name}
            />

            <Text>E-mail</Text>
            <TextInput 
                style={styles.input}
                onChangeText={email => setUser({...user, email})} 
                placeholder="Informe o E-mail"
                value={user.email}
            />

            <Text>Avatar URL</Text>
            <TextInput 
                style={styles.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})} 
                placeholder="Informe a URL do avatar"
                value={user.avatarUrl}
            />

            <Button 
                title="Salvar"
                onPress={() => {
                    navigation.goBack()
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 25
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
})
