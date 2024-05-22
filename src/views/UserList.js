import React, { useContext } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import UsersContext from "../context/usersContext";

export default props => {
    
    const {state} = useContext(UsersContext)
    const isListEmpty = Object.entries(state.users).length === 0 

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

            <ListItem.Chevron onPress={() => props.navigation.navigate('UserForm', user)}/>
        </ListItem>
        )
    }

    return (
        <View style={styles.view}>
            {
                !isListEmpty
                ? <FlatList 
                    style={styles.list}
                    keyExtractor={user => user .id.toString()} 
                    data={state.users}
                    renderItem={getUserItem}
                 />
                : <Text>Parece que a lista está vazia :(</Text>

            }

        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})