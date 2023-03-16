import { View } from "react-native";
import { Button } from "react-native-paper";
import toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { REQUIRED_MSG } from "@helpers/validation.helper";
import { IPageNavigationProps } from "@models/pageNavigation.model";
import { formStyles } from "@styles/form.styles";
import { screenStyles } from "@styles/screen.styles";

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

  const { handleSubmit, setValue, control } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((form) => {
    setIsLoading(true);

    taskService
      .create(form)
      .then(() => {
        toogleShow();
        setValue("title", "", {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
        setValue("description", "", {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
      })
      .catch(() =>
        toast.show({
          type: "error",
          text1: "Aconteceu um erro ao salvar a tarefa",
        })
      )
      .finally(() => setIsLoading(false));
  });

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
        style={formStyles.lastField}
      />
      <Button onPress={onSubmit} mode="contained">
        Criar
      </Button>
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
