import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@models/task.model";

const TASK_KEY = "task_schema";

export class AsyncService {
  protected async getTasks(): Promise<Task[]> {
    const stringTasks = await AsyncStorage.getItem(TASK_KEY);
    if (!stringTasks) return [];
    return JSON.parse(stringTasks);
  }

  protected async setTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  }
}
