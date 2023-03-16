import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleProp, ViewStyle } from "react-native/types";

import { RootStackParamList } from "@models/pageNavigation.model";

import { screenStyles } from "@styles/screen.styles";

import Tasks from "@containers/Tasks";
import Task from "@containers/Task";
import CreateTask from "@containers/CreateTask";
import TaskReport from "@containers/TaskReport";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = ({ style = {} }: { style: StyleProp<ViewStyle> }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{ contentStyle: [style, screenStyles.view] }}
      initialRouteName="Tasks"
    >
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
      <Stack.Screen
        name="TaskReport"
        component={TaskReport}
        options={{ title: "Relatório de tarefas" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
