import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import users from "../data/users";
import { Avatar, Button, Icon, ListItem } from "@rneui/themed";

export default props => {

    function confirmDelete(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', 
            [
                {text: 'Sim', onPress() {console.warn('será excluído!')} },
                {text: 'Não'}
            ]
        )
    }
    
    function getActions(user) {
        return (
            <>
                <ListItem.Chevron onPress={() => props.navigation.navigate('UserForm', user)}/>
                <Button 
                    type="clean"
                    icon={ <Icon name='delete' size={20} color='red'/> }
                    onPress={() => confirmDelete(user)}
                />
            </>
        )
    }


    function getUserItem({item: user}) {
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('UserForm', user)}>

            {
             user.avatarUrl
             ? <Avatar rounded source={{ uri: user.avatarUrl }}/>
             : <Avatar rounded title={(user.name).substring(0,1)} containerStyle={{ backgroundColor: "grey" }} />
            }

            <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>

            {getActions(user)}
        </ListItem>
        )
    }

    return (
        <View>
            <FlatList 
                keyExtractor={user => user .id.toString()} 
                data={users}
                renderItem={getUserItem}
            />

        </View>
    )
}
 