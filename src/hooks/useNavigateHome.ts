import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@models/pageNavigation.model";

export const useNavigateHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return {
    navigateHome() {
      navigation.navigate("Tasks");
    },
  };
};
