import { Task } from "@models/task.model";
import mock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

let mockedTasks: Task[] = [
  {
    id: "mock",
    title: "Mock Title",
    description: "mock description",
    isDone: false,
  },
];

export default {
  ...mock,
  getItem: (key: string) => JSON.stringify(mockedTasks),
  setItem: (key: string, newData: string) => {
    const newTasks = JSON.parse(newData);
    mockedTasks = newTasks;
  },
};
