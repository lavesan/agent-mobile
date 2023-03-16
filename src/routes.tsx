import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@models/pageNavigation.model";

import Tasks from "@containers/Tasks";
import Task from "@containers/Task";
import CreateTask from "@containers/CreateTask";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Tasks">
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={{ title: "Minhas tarefas" }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{ title: "Editar a tarefa" }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ title: "Criar tarefa" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
