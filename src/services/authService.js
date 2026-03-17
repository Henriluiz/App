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