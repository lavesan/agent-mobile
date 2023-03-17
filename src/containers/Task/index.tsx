import { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { formStyles } from "@styles/form.styles";
import { screenStyles } from "@styles/screen.styles";

import { useAppContext } from "@hooks/useAppContext";
import { IPageNavigationProps } from "@models/pageNavigation.model";
import { TaskService } from "@services/task.service";
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
    defaultValues: {
      isDone: false,
    },
  });

  const fetchTask = () => {
    setIsLoading(true);
    taskService
      .findById(id)
      .then((res) => {
        if (!res)
          return toast.show({ type: "error", text1: "Tarefa não encontrada" });

        setValue("title", res.title);
        setValue("description", res.description);
        setValue("isDone", res.isDone);
      })
      .catch(() =>
        toast.show({
          type: "error",
          text1: "Aconteceu um erro ao procurar a tarefa",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const onReturnToTasksList = () => {
    toogleShow();
    navigation.navigate("Tasks");
  };

  const onSubmit = handleSubmit((form) => {
    setIsLoading(true);
    taskService
      .update(id, form)
      .then(() => {
        toogleShow();
      })
      .catch((err: any) =>
        toast.show({
          type: "error",
          text1: "Aconteceu um erro ao atualizar a tarefa",
        })
      )
      .finally(() => setIsLoading(false));
  });

  useEffect(() => {
    const loadPageOnNavigate = navigation.addListener("focus", () => {
      fetchTask();
    });
    return loadPageOnNavigate;
  }, [navigation]);

  return (
    <View style={screenStyles.centerView}>
      <AppInput<IForm>
        label="Título"
        control={control}
        name="title"
        style={formStyles.field}
      />
      <AppInput<IForm>
        label="Descrição"
        control={control}
        name="description"
        style={formStyles.field}
      />
      <AppCheckbox<IForm>
        label="Concluída"
        control={control}
        name="isDone"
        style={formStyles.lastField}
      />
      <Button onPress={onSubmit} mode="contained">
        Editar tarefa
      </Button>
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
