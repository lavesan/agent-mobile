import { useEffect } from "react";
import { ToastAndroid, View } from "react-native";
import { Button } from "react-native-paper";

import { useAppContext } from "@hooks/useAppContext";
import { IPageNavigationProps } from "@models/pageNavigation.model";
import { TaskService } from "@services/task.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_MSG } from "@helpers/validation.helper";
import { AppInput } from "@components/AppInput";
import { AppCheckbox } from "@components/AppCheckbox";
import { AppDialog } from "@components/AppDialog";
import { useToogle } from "@hooks/useToogle";

interface IForm {
  title: string;
  description: string;
  isDone: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required(REQUIRED_MSG),
  description: yup.string().required(REQUIRED_MSG),
  isDone: yup.boolean().required(REQUIRED_MSG),
});

const Task = ({ route, navigation }: IPageNavigationProps<"Task">) => {
  const { id } = route.params;

  const taskService = TaskService.getInstance();

  const { setIsLoading } = useAppContext();
  const { show, toogleShow } = useToogle();

  const { control, handleSubmit, setValue } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const fetchTask = () => {
    taskService.findById(id).then((res) => {
      if (!res)
        return ToastAndroid.show("Tarefa não encontrada", ToastAndroid.TOP);

      setValue("title", res.title);
      setValue("description", res.description);
      setValue("isDone", res.isDone);
    });
  };

  const onReturnToTasksList = () => {
    toogleShow();
    navigation.navigate("Tasks");
  };

  const onSubmit = handleSubmit((form) => {
    setIsLoading(true);
    taskService
      .update(id, form)
      .then(() => {})
      .catch(() => {})
      .finally(() => setIsLoading(false));
  });

  useEffect(() => {
    const loadPageOnNavigate = navigation.addListener("focus", () => {
      fetchTask();
    });
    return loadPageOnNavigate;
  }, [navigation]);

  return (
    <View>
      <AppInput<IForm> label="Título" control={control} name="title" />
      <AppInput<IForm> label="Descrição" control={control} name="description" />
      <AppCheckbox<IForm> label="Concluída" control={control} name="isDone" />
      <Button onPress={onSubmit}>Editar tarefa</Button>
      <AppDialog
        show={show}
        title="Tarefa editada"
        description="Sua tarefa foi atualizada com sucesso!"
        onClose={toogleShow}
        onPrimaryButtonPress={onReturnToTasksList}
        primaryButton="Voltar para a listagem"
        secondaryButton="Continuar editando"
      />
    </View>
  );
};

export default Task;
