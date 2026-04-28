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

export async function PerfilPsicologo(id) {
  try { // /verPsicologo/{id}
      const response = await api.get(`/verPsicologo/${id}`)

      return { 
        "user" : response.data.user,
        "psicologo" : response.data.psicologo
      }
  } catch (error) {
    console.log('Erro', "Não foi consulta perfil do psicologo.")

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function PesquisaPsicologo(id) {
  try {
      const response = await api.get('/listarPsicologos')

      return { 
        "psicologos" : response.data.psicologos,
      }
  } catch (error) {
    console.log('Erro', "Não foi consulta perfil do psicologo.")

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function horariosDisponiveis(id, data) {
  try {
      const response = await api.get(`/horariosDisponiveis/${id}`, {
        params: { data }
      });

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi consulta perfil do psicologo.")

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function agendarSessao(dados) {
  try {
    const response = await api.post("/agendarSessao", dados);
    return response.data;
  } catch (error) {
    console.log("Erro ao agendar sessão:", error.response?.data || error);
    throw error;
  }
}


// ! Não testado - Apenas criado para poupar tempo
export async function solicitarCancelamento(id_sessao) {
  try {
      const response = await api.get(`/solicitarCancelamento/${id_sessao}`)

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível solicitar o cancelamento da consulta.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function solicitarReagendamento(id_sessao) {
  try {
      const response = await api.get(`/solicitarReagendamento/${id_sessao}`)

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível solicitar o reagendamento da consulta.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function detalhesConsulta(id_sessao) {
  try {
      const response = await api.get(`/detalhesConsulta/${id_sessao}`)

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível visualizar os detalhes da consulta.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}