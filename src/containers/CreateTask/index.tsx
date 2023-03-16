import { View, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
// import Toast from 'react-native-root-toast';

import { REQUIRED_MSG } from "@helpers/validation.helper";
import { IPageNavigationProps } from "@models/pageNavigation.model";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TaskService } from "@services/task.service";
import { useAppContext } from "@hooks/useAppContext";
import { AppInput } from "@components/AppInput";
import { AppDialog } from "@components/AppDialog";
import { useToogle } from "@hooks/useToogle";
import { useNavigateHome } from "@hooks/useNavigateHome";

interface IForm {
  title: string;
  description: string;
}

const validationSchema = yup.object({
  title: yup.string().required(REQUIRED_MSG),
  description: yup.string().required(REQUIRED_MSG),
});

const CreateTask = ({}: IPageNavigationProps<"CreateTask">) => {
  const taskService = TaskService.getInstance();

  const { setIsLoading } = useAppContext();
  const { show, toogleShow } = useToogle();
  const { navigateHome } = useNavigateHome();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((form) => {
    setIsLoading(true);

    taskService
      .create(form)
      .then(() => {
        ToastAndroid.show("Tarefa salva!", ToastAndroid.TOP);
        reset();
      })
      .catch((err) => {
        ToastAndroid.show(
          "Aconteceu um erro ao salvar os dados",
          ToastAndroid.TOP
        );
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <View>
      <AppInput<IForm> label="Título" control={control} name="title" />
      <AppInput<IForm> label="Descrição" control={control} name="description" />
      <Button onPress={onSubmit}>Criar</Button>
      <AppDialog
        show={show}
        title="Tarefa criada"
        description="Sua tarefa foi criada com sucesso!"
        onClose={toogleShow}
        onPrimaryButtonPress={navigateHome}
        primaryButton="Voltar para a listagem"
        secondaryButton="Continuar criando"
      />
    </View>
  );
};

export default CreateTask;
