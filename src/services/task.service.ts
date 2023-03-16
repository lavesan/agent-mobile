import {
  ICreateTaskReq,
  IGetTasksReportRes,
  IUpdateTaskReq,
} from "models/task.service.model";
import { AsyncService } from "./async.service";
import { Task } from "@models/task.model";

export class TaskService extends AsyncService {
  private static INSTANCE: TaskService;

  async create({ title, description }: ICreateTaskReq): Promise<void> {
    const task = new Task();
    Object.assign(task, {
      title,
      description,
    });
    const tasks = await this.getTasks();
    tasks.push(task);
    this.setTasks(tasks);
  }

  findAll(): Promise<Task[]> {
    return this.getTasks();
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = await this.getTasks();
    return tasks.find(({ id: dbId }) => dbId === id) || null;
  }

  async update(taskId: string, body: IUpdateTaskReq): Promise<void> {
    const tasks = await this.getTasks();
    const task = tasks.find(({ id }) => taskId === id);

    if (!task) throw new Error("task not found");

    Object.assign(task, body);

    const updatedTasks = tasks.map((dbTask) => {
      if (dbTask.id === task.id) {
        return task;
      }

      return dbTask;
    });

    await this.setTasks(updatedTasks);
  }

  async getTasksReport(): Promise<IGetTasksReportRes> {
    const tasks = await this.getTasks();

    return {
      total: tasks.length,
      done: tasks.filter(({ isDone }) => isDone).length,
      notDone: tasks.filter(({ isDone }) => !isDone).length,
    };
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new TaskService();
    return this.INSTANCE;
  }
}
