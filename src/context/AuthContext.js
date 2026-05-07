import React, { createContext, useContext, useEffect, useState } from "react";
import { login, getPerfil, logout, deleteConta, patchPerfil, getUserCPF, PerfilPsicologo, PesquisaPsicologo, horariosDisponiveis, agendarSessao, solicitarCancelamento, solicitarReagendamento, 
  detalhesConsulta, minhasSessoes, pacienteHistorico
} from "../services/authService";
import {
  saveSession,
  clearSession,
  getToken,
  getUser, 
} from "../services/authStogare";
import { authEvents } from "../services/authEvents";
import { errorMonitor } from "events";

const AuthContext = createContext({});

// * SEMPRE QUE FOR ADD UMA FUNCÃO NOVA, ADD ELE NO AuthContext.Provider

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const BASE_URL = "http://10.148.229.116:8000/storage/";

  async function signIn(loginInput, senha) {

    const data = await login(loginInput, senha);

    const token = data.access_token;
    const user = data.user;

    await saveSession(token, user);

    setUser(user);

  }

  // Deslogar
  async function signOut() {

    try {
      await logout();
    } catch (e) {}

    await clearSession();

    setUser(null);

  }

  // Deletar a conta
  async function removeAccount() {

    try {
      await deleteConta();
    } catch (e) {
      console.log("Erro ao deletar conta", e);
    }

    await clearSession();
    setUser(null);

  }

  // Atualizar nome, email e telefone do usuário
  async function updateUser(data) {
    try {

      const updatedUser = await patchPerfil(data);
      
      setUser(updatedUser);
      
      await saveSession(await getToken(), updatedUser);
      
    } catch (error) {
      console.log("Erro ao atualizar usuário", error);
      throw error;
    }
  }

  async function verificarDisponibilidade(username, cpf) {
    try {
      const verificacao = await getUserCPF(username, cpf);

      return {
        usernameDisponivel: verificacao.username_disponivel,
        cpfDisponivel: verificacao.cpf_disponivel,
      };

    } catch (e) {
      console.error("ERRO COMPLETO (verificarDisponibilidade):", e.response?.data);

      return {
        usernameDisponivel: false,
        cpfDisponivel: false,
        erro: true
      };
    }
  };

  async function verPsicologo(id) {
    try {
      const perfil = await PerfilPsicologo(id);

      return {
        user: perfil.user,
        psicologo: perfil.psicologo,
      };
    } catch (e) {
      console.error("ERRO COMPLETO (verPsicólogo):", e.response?.data);

      return {
        user: false,
        psicologo: false
      };
    }
  };

  async function listarPsicologos(id) {
    try {
      const perfil = await PesquisaPsicologo();

      return {
        psicologos: perfil.psicologos
      };
    } catch (e) {
      console.error("ERRO COMPLETO (listarPsicologos):", e.response?.data);

      return {
        user: false,
        psicologos: false
      };
    }
  };

  async function verHorariosDisponiveis(id, data) {
    try {
      const dados = await horariosDisponiveis(id, data);
      console.log(dados)
      return dados;
    } catch (e) {
      console.error("ERRO COMPLETO: (verHorariosDisponiveis)", e.response?.data);
      return [];
    }
  };

  async function agendarSessaoCont(dados) {
    try {
      const resposta = await agendarSessao(dados);
      return resposta;
    } catch (e) {
      console.error("Erro completo (agendarSessao):", e.response?.data);
      return null;
    }
  };

  // ! Não testado - Apenas criado para poupar tempo

  async function SolCancelamentoCons(id_sessao) {
    try {
      const resposta = await solicitarCancelamento(id_sessao);
      return resposta;
    } catch (e) {
      console.error("Erro completo (SolCancelamentoCons):", e.response?.data);
      return null;
    }
  };

  async function SolReagendarCons(id_sessao, dados) {
    try {
      const resposta = await solicitarReagendamento(id_sessao, dados);
      return resposta;
    } catch (e) {
      console.error("Erro completo (SolReagendarCons):", e.response?.data);
      return null;
    }
  };

  async function detalhesCons(id_sessao) {
    try {
      const resposta = await detalhesConsulta(id_sessao);
      return resposta;
    } catch (e) {
      console.error("Erro completo (detalhesCons):", e.response?.data);
      return null;
    }
  };

  async function mSessoes() {
    try {
      const resposta = await minhasSessoes();
      return resposta;
    } catch (e) {
      console.error("Erro completo (mSessoes):", e.response?.data);
      return null;
    }
  };

  async function historico() {
    try {
      const resposta = await pacienteHistorico();
      return resposta;
    } catch (e) {
      console.error("Erro completo (mSessoes):", e.response?.data);
      return null;
    }
  };

  const bootstrap = async () => {

    try {

      const token = await getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const user = await getUser();
      setUser(user);

    } catch (error) {

      console.log("Erro no bootstrap", error);
      setUser(null);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const handleLogout = async () => {
      await clearSession();
      setUser(null);
    };

    authEvents.on("logout", handleLogout);

    return () => {
      authEvents.off("logout", handleLogout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        BASE_URL,

        // CRUD
        signIn,
        signOut,
        removeAccount,
        updateUser,

        // Verificar dados antes de salvar no banco (CPF, Nickname - Unique)
        verificarDisponibilidade,

        // Psicologo
        verPsicologo,
        listarPsicologos,
        verHorariosDisponiveis,
        agendarSessaoCont,

        // Agenda
        SolCancelamentoCons,
        detalhesCons,
        SolReagendarCons,
        mSessoes

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}