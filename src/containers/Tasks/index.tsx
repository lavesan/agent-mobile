import { ScrollView, View, Platform } from "react-native";
import { Button } from "react-native-paper";
import toast from "react-native-toast-message";

import { styles } from "./styles";

import { Task } from "@models/task.model";
import { TaskService } from "@services/task.service";
import { useEffect, useState } from "react";
import { useAppContext } from "@hooks/useAppContext";
import { IPageNavigationProps } from "@models/pageNavigation.model";
import { TaskCard } from "./TaskCard";

const Tasks = ({ navigation }: IPageNavigationProps<"Tasks">) => {
  const taskService = TaskService.getInstance();

  const { setIsLoading } = useAppContext();

  const [tasks, setTasks] = useState<Task[]>([]);

  const navigateToCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  const navigateToTaskReport = () => {
    navigation.navigate("TaskReport");
  };

  const fetchTasks = () => {
    setIsLoading(true);
    taskService
      .findAll()
      .then((res) => setTasks(res))
      .catch(() =>
        toast.show({
          type: "error",
          text1: "Aconteceu um erro ao procurar as tarefas",
        })
      )
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const loadPageOnNavigate = navigation.addListener("focus", () => {
      fetchTasks();
    });
    return loadPageOnNavigate;
  }, [navigation]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Button
          icon="brush"
          mode="contained"
          onPress={navigateToCreateTask}
          style={styles.headerContainerButton}
        >
          Adicionar tarefa
        </Button>
        <Button
          icon="file-cabinet"
          mode="contained"
          onPress={navigateToTaskReport}
          style={styles.headerContainerButton}
        >
          Ver relatório
        </Button>
      </View>
      <ScrollView
        style={Platform.OS === "android" ? styles.tasksContainerMargin : {}}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} fetchTasks={fetchTasks} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Tasks;
