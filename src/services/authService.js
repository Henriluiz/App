import { refFromURL } from "@react-native-firebase/app/dist/module/internal/web/firebaseDatabase";
import api from "./api";

export async function cadastroPaciente(data) {

  const response = await api.post("/registerPaciente", data);

  return response.data;

}

export async function login(login, senha) {

  const response = await api.post("/login", {
    login,
    senha
  });

  return response.data;
}

export async function getPerfil() {

  const response = await api.get("/perfil");

  return response.data.user;

}

export async function logout() {

  const response = await api.post("/logout");

  return response.data;

}

export async function getUserCPF(username, cpf) {
  
  const response = await api.post("/verificarUserCPF", {
    username,
    cpf,
  });

  return response.data;

}

export async function patchPerfil(data) {

  const response = await api.patch("/update", data);

  return response.data.user;

}

export async function deleteConta() {
  const response = await api.delete("/delete");
  return response.data;
}

export async function solicitarCodigo(email) {
  try {
      const response = await api.post("/recuperacao/enviar", {email: email})
      
      const data = response.data;
      console.log('Sucesso', data.message);
      return true
    } catch (error) {
      console.log('Error', error);
      return false
  }
}

export async function verificarCodigo(email, codigo) {
  try {
      const response = await api.post("/recuperacao/verificar", {
        email, codigo
      })

      const data = await response.json();

      if (response.ok) {
          console.log('Sucesso', data.message);
          return true;
          // navegue para a tela de nova senha
      } else {
          console.log('Erro', data.message);
          return false;
      }
  } catch (error) {
      console.log('Erro', 'Não foi possível verificar o código.');
  }
}

export async function PerfilPiscologo(id) {
  try { // /verPsicologo/{id}
      const response = await api.get(`/verPsicologo/${id}`)

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível verificar o código.")
  }
}