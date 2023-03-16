export interface ICreateTaskReq {
  title: string;
  description: string;
}

export interface IUpdateTaskReq {
  title?: string;
  description?: string;
  isDone?: boolean;
}

export interface IGetTasksReportRes {
  total: number;
  done: number;
  notDone: number;
}
