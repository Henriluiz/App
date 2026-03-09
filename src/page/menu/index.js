import { View, Text } from "react-native";

export default function Menu( {closeAuthUser} ) {

    return (
      <View>
        <Text>Home 1</Text>
      </View>
    );
  }

// * Usa a estrutura para apresentar o usuário e deslogar 
// import { useAuth } from "../context/AuthContext";

// export default function MenuScreen() {
//   const { user, signOut } = useAuth();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bem-vindo, {user?.nome}</Text>
//       <Button title="Sair" onPress={signOut} />
//     </View>
//   );
// }