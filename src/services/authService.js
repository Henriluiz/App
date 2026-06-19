import api from "./api";
import { Platform } from "react-native";
import { getToken } from "./authStogare";
import { BASE_URL } from "./api";

export async function cadastroPaciente(data) {
  const formData = new FormData();

  formData.append("nome", data.nome);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("telefone", data.telefone);
  formData.append("genero", data.genero);
  formData.append("senha", data.senha);
  formData.append("data", data.data);
  formData.append("cpf", data.cpf);
  formData.append("code", data.code);
  formData.append("termos", data.termos ? "1" : "0");


  if (data.foto_perfil) {
    // WEB
    if (Platform.OS === "web") {
      const response = await fetch(data.foto_perfil.uri);
      const blob = await response.blob();

      formData.append("foto", blob, "foto.jpg");
    } else {
      // MOBILE
      const filename = data.foto_perfil.uri.split("/").pop();

      const match = /\.(\w+)$/.exec(filename);

      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("foto", {
        uri: data.foto_perfil.uri,
        name: filename,
        type,
      });
    }
  }

  console.log("📦 FormData entries:");
  for (let pair of formData._parts) {
    console.log(pair[0], "=>", pair[1]);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/registerPaciente`, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    console.log("STATUS:", response.status);
    console.log("JSON:", json);

    return json;
  } catch (error) {
    console.log("❌ Erro fetch:", error.message);
    throw error;
  }
}

export async function login(login, senha) {
  const response = await api.post("/login", {
    login,
    senha,
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

export async function verificarCPF(cpf) {
  const response = await api.post("/verificarUserCPF", {
    cpf,
  });

  return response.data;
}

export async function enviarEmail(email) {
  try {
    const response = await api.post(
      `/forgotPassword/`,
      {
        email: email,
      },
    );
    console.log("Resposta de Enviar Email: " + response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível enviar o email para redefinir a senha{'\n}",
      error,
    );

    return error.response?.data ?? { error: true, message: "Erro de conexão." }
  }
}


export async function verificarCodSenha(email, code) {
  try {
    const response = await api.post(
      `/verifyResetCode/`,
      {
        email: email,
        code: code,
      },
    );
    console.log("Resposta ao verificar o código de redefinição de Senha: " + response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível verificar o código do email.{'\n}",
      error,
    );

    return error.response?.data ?? { error: true, message: "Erro de conexão." }
  }
}

export async function redefinirSenhaC(email, code, senha, confirmar_senha) {
  try {
    const response = await api.post(
      `/resetPassword/`,
      {
        email: email,
        code: code,
        senha: senha,
        confirmar_senha: confirmar_senha
      },
    );
    console.log("Resposta ao redefinir Senha: " + response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível redefinir senha.{'\n}",
      error,
    );
    return error.response?.data ?? { error: true, message: "Erro de conexão." }
  }
}

export async function verificarEmail(email) {
  try {
    const response = await api.post(
      `/sendVerificationEmail/`,
      {
        email: email,
      },
    );
    console.log("Resposta de Enviar Email para criar conta: " + response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível enviar o email para criar conta{'\n}",
      error,
    );

    return error.response?.data ?? { error: true, message: "Erro de conexão." }
  }
}
export async function verificarEmailConfirmar(email, code) {
  try {
    const response = await api.post(
      `/verificarEmail/`,
      {
        email: email,
        code: code,
      },
    );
    console.log("Resposta de Enviar Email para criar conta: " + response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível enviar o email para criar conta{'\n}",
      error,
    );

    return error.response?.data ?? { error: true, message: "Erro de conexão." }
  }
}

  // Busca o pagamento pendente (com id_pagamento)
  export async function mPagamentoPendente() {
      const resposta = await api.get('/pagamento/pendente');
      console.log("Status:", resposta.status);
      console.log("Data:", JSON.stringify(resposta.data));
      return resposta.data;
  };

  
  // Envia o comprovante com o id_pagamento correto
  export async function mAnexarComprovante(id_pagamento, fotoUri) {
    const formData = new FormData();
    formData.append('comprovante', {
        uri: fotoUri,
        name: 'comprovante.jpg',
        type: 'image/jpeg',
    });

    // ✅ fetch nativo em vez de Axios para upload de arquivo
    const token = await getToken(); // importe do authStorage
    const resposta = await fetch(`${BASE_URL}/api/anexarComprovante/${id_pagamento}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            // ✅ NÃO setar Content-Type — o fetch define o boundary sozinho
        },
        body: formData,
    });

    const json = await resposta.json();

    if (!resposta.ok) {
        throw { response: { data: json, status: resposta.status } };
    }

    return json;
}

export async function notificacao() {
    const resposta = await api.get('/notifications');
    console.log("Status:", resposta.status);
    console.log("Data:", JSON.stringify(resposta.data));
    return resposta.data;
};

export async function detalhesConsultaC(id_sessao) {
    const resposta = await api.get(`/detalhesConsulta/${id_sessao}`);
    console.log("Status:", resposta.status);
    console.log("Data (detalhesConsulta):", JSON.stringify(resposta.data));
    return resposta.data;
};

export async function verificarUsername(username) {
  const response = await api.post("/verificarUsername", {
    username,
  });

  return response.data;
}

export async function aprovarSessaoC(id_sessao) {
  const response = await api.post(`/aprovarSessao/${id_sessao}`);

  return response.data;
}

export async function recusarSessaoC(id_sessao, motivo) {
  const response = await api.post(`/recusarSessao/{id_sessao}`, { motivo });

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

export async function PerfilPsicologo(id) {
  try {
    // /verPsicologo/{id}
    const response = await api.get(`/verPsicologo/${id}`);

    return {
      user: response.data.user,
      psicologo: response.data.psicologo,
    };
  } catch (error) {
    console.log("Erro", "Não foi consultar perfil do psicologo.");

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function PesquisaPsicologo(id) {
  try {
    const response = await api.get("/listarPsicologos");

    return {
      psicologos: response.data.psicologos,
    };
  } catch (error) {
    console.log("Erro", "Não foi consultar perfil do psicologo.");

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function horariosDisponiveis(id, data) {
  try {
    const response = await api.get(`/horariosDisponiveis/${id}`, {
      params: { data },
    });

    return response.data;
  } catch (error) {
    console.log("Erro", "Não foi consulta perfil do psicologo.");

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function agendarSessao(dados) {
  const response = await api.post("/agendarSessao", dados);
  return response.data;
}

export async function solicitarCancelamento(id_sessao, motivo) {
  try {
    const response = await api.post(`/solicitarCancelamento/${id_sessao}`, {
      motivo: motivo,
    });

    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível solicitar o cancelamento da consulta.{'\n}",
      error,
    );

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function solicitarReagendamento(id_sessao, dados) {
  try {
    const response = await api.post(
      `/solicitarReagendamento/${id_sessao}`,
      dados,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível solicitar o reagendamento da consulta.{'\n}",
      error,
    );

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function detalhesConsulta(id_sessao) {
  try {
    const response = await api.get(`/detalhesConsulta/${id_sessao}`);

    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível visualizar os detalhes da consulta.{'\n}",
      error,
    );

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function minhasSessoes(id_sessao) {
  try {
    const response = await api.get("/minhasSessoes");
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível visualizar as minhas sessões.{'\n}",
      error,
    );

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function pacienteHistorico(id_sessao) {
  try {
    const response = await api.get("/pacienteHistorico");
    return response.data;
  } catch (error) {
    console.log(
      "Erro",
      "Não foi possível visualizar as minhas sessões anteriores.{'\n}",
      error,
    );

    // 👇 FORÇA quem chama a tratar erro
    throw error;
}}
// ─── CHAT ────────────────────────────────────────────────────────────────────

// Cria ou recupera um chat existente com o psicólogo
export async function iniciarChat(dados) {
  const response = await api.post("/chat/iniciar", dados);
  return response.data;
}

// Envia uma mensagem dentro de um chat
export async function enviarMensagem(dados) {
  const response = await api.post("/chat/enviar", dados);
  return response.data;
}

// Busca o histórico de mensagens de um chat pelo ID
export async function historicoChat(id) {
  const response = await api.get(`/chat/historico/${id}`);
  return response.data;
}

// Marca as mensagens de um chat como visualizadas
export async function visualizarChat(id_chat) {
  const response = await api.patch(`/chat/visualizar/${id_chat}`);
  return response.data;
}

// Lista psicólogos do paciente
export async function listarMeusPsicologos() {
  const response = await api.get("/meusPsicologos"); // ajuste a rota conforme seu routes/api.php
  return response.data;
}
