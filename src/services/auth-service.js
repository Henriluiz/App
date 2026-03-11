import api from "./api";

export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function refreshSession(refreshToken) {
  const response = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  return response.data;
}


export async function getMe() {
  const response = await api.get("/me");
  return response.data;
}

// * No uso na prática
// try {
//   await signIn(email, senha);
// } catch (error) {

//   if (error.response) {
//     // erro vindo da API
//     Alert.alert("Erro", error.response.data.detail || "Erro no login");
//   } else {
//     // erro de rede
//     Alert.alert("Erro", "Problema de conexão");
//   }

// }