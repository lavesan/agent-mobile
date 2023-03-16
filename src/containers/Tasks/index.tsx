import { ScrollView, View } from "react-native";
import { Button, Card, Text, Checkbox } from "react-native-paper";

import { Task } from "@models/task.model";
import { TaskService } from "@services/task.service";
import { useEffect, useState } from "react";
import { useAppContext } from "@hooks/useAppContext";
import { IPageNavigationProps } from "@models/pageNavigation.model";

const Tasks = ({ navigation }: IPageNavigationProps<"Tasks">) => {
  const taskService = TaskService.getInstance();

  const { setIsLoading } = useAppContext();

  const [tasks, setTasks] = useState<Task[]>([]);

  const navigateToTask = (id: string) => {
    navigation.navigate("Task", {
      id,
    });
  };

  const navigateToCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  const fetchTasks = () => {
    setIsLoading(true);
    taskService
      .findAll()
      .then((res) => setTasks(res))
      .catch((err) => {})
      .finally(() => setIsLoading(false));
  };

  const toogleIsDone = async (id: string, isDone: boolean) => {
    await taskService.update(id, { isDone });
    fetchTasks();
  };

  useEffect(() => {
    const loadPageOnNavigate = navigation.addListener("focus", () => {
      fetchTasks();
    });
    return loadPageOnNavigate;
  }, [navigation]);

  return (
    <View>
      <View>
        <Button icon="brush" mode="contained" onPress={navigateToCreateTask}>
          Adicionar tarefa
        </Button>
      </View>
      <ScrollView>
        {tasks.map(({ id, title, description, isDone }) => (
          <Card key={id} onPress={() => navigateToTask(id)}>
            <Card.Title
              title={title}
              right={() => (
                <Checkbox
                  status={isDone ? "checked" : "unchecked"}
                  onPress={() => toogleIsDone(id, !isDone)}
                />
              )}
            />
            <Card.Content>
              <Text variant="bodyMedium">{description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default Tasks;
