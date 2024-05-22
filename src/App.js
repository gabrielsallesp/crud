import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UserForm from "./views/UserForm";
import UserList from "./views/UserList";
import { Button, Icon } from "@rneui/themed";
import UsersContext, { UsersProvider } from "./context/usersContext";

const Stack = createNativeStackNavigator()

export default props => {
    const {state, dispatch} = useContext(UsersContext)

    return (
        <UsersProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="UserList"
                    screenOptions={screenOptions}>

                    <Stack.Screen name="UserList" component={UserList}
                                options={({navigation}) => {
                                    return {
                                        title: 'Lista',
                                        headerRight: () => (
                                            <Button 
                                                type='clear'
                                                icon={<Icon name="add-circle" size={25} color='#FFF'/>}
                                                onPress={() => navigation.navigate('UserForm', {inclusao: true})}
                                            />
                                        )
                                    }
                                }}/>

                    <Stack.Screen name="UserForm" 
                                  component={UserForm}
                                  options={ {title: 'Formulario' } } />

                </Stack.Navigator>
            </NavigationContainer>
        </UsersProvider>
    )
}

const screenOptions = {
    headerStyle: {backgroundColor: '#5a9367'},
    headerTitleStyle: {fontWeight: 'bold'},
    headerTintColor: '#FFF'
}