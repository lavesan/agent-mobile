import { View } from "react-native";
import { Card, Text, Checkbox, IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import toast from "react-native-toast-message";

import { useAppContext } from "@hooks/useAppContext";
import { RootStackParamList } from "@models/pageNavigation.model";
import { TaskService } from "@services/task.service";

import { styles } from "./styles";

interface ITaskCardProps {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  fetchTasks: VoidFunction;
}

export const TaskCard = ({
  id,
  title,
  description,
  isDone,
  fetchTasks,
}: ITaskCardProps) => {
  const taskService = TaskService.getInstance();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  const { setIsLoading } = useAppContext();

  const navigateToTask = (id: string) => {
    navigation.navigate("Task", {
      id,
    });
  };

  const toogleIsDone = async (id: string, isDone: boolean) => {
    setIsLoading(true);

    await taskService.update(id, { isDone }).catch(() =>
      toast.show({
        type: "error",
        text1: `Aconteceu um erro ao ${
          isDone ? "concluir" : "desmarcar"
        } a tarefa`,
      })
    );
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    await taskService.delete(id).catch(() =>
      toast.show({
        type: "error",
        text1: "Aconteceu um erro ao excluir a tarefa",
      })
    );
    fetchTasks();
  };

  return (
    <Card onPress={() => navigateToTask(id)} style={styles.cardContainer}>
      <Card.Title
        title={title}
        right={() => (
          <View style={styles.cardContainerActions}>
            <IconButton
              icon="trash-can"
              iconColor={colors.error}
              onPress={() => deleteTask(id)}
            />
            <Checkbox
              status={isDone ? "checked" : "unchecked"}
              onPress={() => toogleIsDone(id, !isDone)}
            />
          </View>
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
    </Card>
  );
};
