import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import UsersContext from "../context/usersContext";
import { Button } from "@rneui/themed";

export default ({route, navigation}) => {

    const {dispatch} = useContext(UsersContext)

    const [user, setUser] = useState(route.params.inclusao ? {} : route.params)
    const isAdd = route.params.inclusao

    React.useEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <Button 
                type="clear"
                title="Salvar"  
                titleStyle={{color: '#FFF', }}
                onPress={() => {
                    dispatch({ 
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    }), 
                    navigation.goBack()
                }} 
            />
        ),
        });
    })

    function confirmDelete(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', 
            [
                {text: 'Sim', onPress() { 
                    dispatch({ 
                        type: 'deleteUser',
                        payload: user,
                    })
                }},
                {text: 'Não'}
            ]
        )
    }

    return (
        <View style={styles.form}>
            <Text style={styles.text}>Nome</Text>
            <TextInput 
                style={styles.input}
                onChangeText={name => setUser({...user, name})} 
                placeholder="Informe o nome"
                value={user.name}
            />

            <Text style={styles.text}>E-mail</Text>
            <TextInput 
                style={styles.input}
                onChangeText={email => setUser({...user, email})} 
                placeholder="Informe o E-mail"
                value={user.email}
            />

            <Text style={styles.text}>Avatar URL</Text>
            <TextInput 
                style={styles.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})} 
                placeholder="Informe a URL do avatar"
                value={user.avatarUrl}
            />

            {
                !isAdd
                ? <Button 
                    type="clear"
                    title="Excluir"
                    onPress={() => {
                       navigation.goBack(),
                       confirmDelete(user)
                    }}
                />
                : null    
            }

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 25
    },

    text: {
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 4,
        color: '#808080'
    },

    input: {
        height: 55,
        padding: 15,
        
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 2,

        fontSize: 15,
        marginBottom: 15
    }
})
