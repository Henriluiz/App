import api from "./api";

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
  formData.append("termos", data.termos ? "1" : "0");

  if (data.foto_perfil) {
    const filename = data.foto_perfil.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("foto", {
      uri: data.foto_perfil,
      name: filename,
      type,
    });
  }

  // console.log("📦 FormData entries:");
  // for (let pair of formData._parts) {
  //   console.log(pair[0], "=>", pair[1]);
  // }

  // try {
  //   const response = await api.post("/registerPaciente", formData, {
  //     headers: {
  //       "Content-Type": undefined,
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.log("❌ Status:", error.response?.status);
  //   console.log("❌ Erro completo:", JSON.stringify(error.response?.data, null, 2));
  //   throw error;
  // }
  try {
    const response = await fetch("http://10.148.229.116:8000/api/registerPaciente", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();
    console.log("✅ Resposta:", JSON.stringify(json, null, 2));
    return json;
  } catch (error) {
    console.log("❌ Erro fetch:", error.message);
    throw error;
  }
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

export async function solicitarCancelamento(id_sessao, dados) {
  try {
      const response = await api.post(`/solicitarCancelamento/${id_sessao}`, dados)

      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível solicitar o cancelamento da consulta.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function solicitarReagendamento(id_sessao, dados) {
  try {
      const response = await api.post(`/solicitarReagendamento/${id_sessao}`, dados)
      console.log(response)
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

export async function minhasSessoes(id_sessao) {
  try {
      const response = await api.get('/minhasSessoes')
      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível visualizar as minhas sessões.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

export async function pacienteHistorico(id_sessao) {
  try {
      const response = await api.get('/pacienteHistorico')
      return response.data
  } catch (error) {
    console.log('Erro', "Não foi possível visualizar as minhas sessões anteriores.{'\n}", error)

    // 👇 FORÇA quem chama a tratar erro
    throw error;
  }
}

