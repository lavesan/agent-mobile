import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tasks: undefined;
  Task: { id: string };
  CreateTask: undefined;
  TaskReport: undefined;
};

export interface IPageNavigationProps<Page extends keyof RootStackParamList>
  extends NativeStackScreenProps<RootStackParamList, Page> {}
