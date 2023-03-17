import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import toast from "react-native-toast-message";

import { IPageNavigationProps } from "@models/pageNavigation.model";
import { IGetTasksReportRes } from "@models/task.service.model";
import { TaskService } from "@services/task.service";
import { useAppContext } from "@hooks/useAppContext";

const TaskReport = ({ navigation }: IPageNavigationProps<"TaskReport">) => {
  const taskService = TaskService.getInstance();

  const { setIsLoading } = useAppContext();

  const [report, setReport] = useState<IGetTasksReportRes>();

  useEffect(() => {
    const loadPageOnNavigate = navigation.addListener("focus", () => {
      setIsLoading(true);
      taskService
        .getTasksReport()
        .then((res) => {
          setReport(res);
        })
        .catch(() =>
          toast.show({
            type: "error",
            text1: "Aconteceu um erro ao procurar o relatório",
          })
        )
        .finally(() => setIsLoading(false));
    });
    return loadPageOnNavigate;
  }, [navigation]);

  return (
    <View>
      {report && (
        <>
          <Text>Completas: {report.done}</Text>
          <Text>Incompletas: {report.notDone}</Text>
          <Text>Total: {report.total}</Text>
        </>
      )}
    </View>
  );
};

export default TaskReport;
