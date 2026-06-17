import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  getPerfil,
  logout,
  deleteConta,
  patchPerfil,
  verificarCPF,
  verificarUsername,
  PerfilPsicologo,
  PesquisaPsicologo,
  horariosDisponiveis,
  agendarSessao,
  solicitarCancelamento,
  solicitarReagendamento,
  detalhesConsulta,
  minhasSessoes,
  pacienteHistorico,
} from "../services/authService";
import {
  saveSession,
  clearSession,
  getToken,
  getUser,
} from "../services/authStogare";
import { authEvents } from "../services/authEvents";
import { errorMonitor } from "events";
import { registerForPushNotifications } from '../services/pushNotifications';
import * as Notifications from "expo-notifications";
import api from "../services/api";

const AuthContext = createContext({});

// * SEMPRE QUE FOR ADD UMA FUNCÃO NOVA, ADD ELE NO AuthContext.Provider

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const FOTO = "http://192.168.18.99:8000/storage/";

  async function signIn(loginInput, senha) {
    const data = await login(loginInput, senha);
    
    const token_ = data.access_token;
    const user = data.user;
    
    await saveSession(token_, user);
    
    setToken(token_)
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
      const verificacaoUsername = await verificarUsername(username);

      const verificacaoCPF = await verificarCPF(cpf);

      return {
        usernameDisponivel: verificacaoUsername.username_disponivel,
        cpfDisponivel: verificacaoCPF.cpf_disponivel,
      };
    } catch (e) {
      console.error(
        "ERRO COMPLETO (verificarDisponibilidade):",
        e.response?.data,
      );

      return {
        usernameDisponivel: false,
        cpfDisponivel: false,
        erro: true,
      };
    }
  }

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
        psicologo: false,
      };
    }
  }

  async function listarPsicologos(id) {
    try {
      const perfil = await PesquisaPsicologo();

      return {
        psicologos: perfil.psicologos,
      };
    } catch (e) {
      console.error("ERRO COMPLETO (listarPsicologos):", e.response?.data);

      return {
        user: false,
        psicologos: false,
      };
    }
  }

  async function verHorariosDisponiveis(id, data) {
    try {
      const dados = await horariosDisponiveis(id, data);
      console.log(dados);
      return dados;
    } catch (e) {
      console.error(
        "ERRO COMPLETO: (verHorariosDisponiveis)",
        e.response?.data,
      );
      return [];
    }
  }

  async function agendarSessaoCont(dados) {
    try {
      const resposta = await agendarSessao(dados);
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.error("Erro completo (agendarSessao):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  async function SolCancelamentoCons(id_sessao, motivo) {
    try {
      const resposta = await solicitarCancelamento(id_sessao, motivo);
      return resposta;
    } catch (e) {
      console.error("Erro completo (SolCancelamentoCons):", e.response?.data);
      return null;
    }
  }

  async function SolReagendarCons(id_sessao, dados) {
    try {
      const resposta = await solicitarReagendamento(id_sessao, dados);
      return resposta;
    } catch (e) {
      console.error("Erro completo (SolReagendarCons):", e.response?.data);
      return null;
    }
  }

  async function detalhesCons(id_sessao) {
    try {
      const resposta = await detalhesConsulta(id_sessao);
      return resposta;
    } catch (e) {
      console.error("Erro completo (detalhesCons):", e.response?.data);
      return null;
    }
  }

  async function mSessoes() {
    try {
      const resposta = await minhasSessoes();
      return resposta;
    } catch (e) {
      console.error("Erro completo (mSessoes):", e.response?.data);
      return null;
    }
  }

  async function historico() {
    try {
      const resposta = await pacienteHistorico();
      return resposta;
    } catch (e) {
      console.error("Erro completo (historico):", e.response?.data);
      return null;
    }
  }

  const bootstrap = async () => {
    try {
      const token_ = await getToken();

      if (!token_) {
        setUser(null);
        return;
      }

      setToken(token_);

      const user = await getUser();
      setUser(user);
    } catch (error) {
      console.log("Erro no bootstrap", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (!user) return;
    
      async function registerPush() {
        console.log('🔔 Iniciando registro de push...');
        
        const expoToken = await registerForPushNotifications();
        
        console.log('🔔 Token obtido:', expoToken);
        
        if (expoToken) {
          const resposta = await api.post('/save-push-token', { token: expoToken });
          console.log('🔔 Resposta do servidor:', resposta.data);
        } else {
          console.log('🔔 Token nulo — permissão negada ou não é device físico');
        }
      }
    
      registerPush();
  }, [user]);

  
  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const notificationListener =
      Notifications.addNotificationReceivedListener(
        (notification) => {

          console.log(
            "🔔 Notificação recebida:",
            notification
          );

        }
      );

    return () => {
      notificationListener.remove();
    };
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
        FOTO,

        // CRUD
        signIn,
        signOut,
        removeAccount,
        updateUser,

        // Verificar dados antes de salvar no banco (CPF, Nickname - Unique)
        verificarDisponibilidade,
        historico,

        // Psicologo
        verPsicologo,
        listarPsicologos,
        verHorariosDisponiveis,
        agendarSessaoCont,

        // Agenda
        SolCancelamentoCons,
        detalhesCons,
        SolReagendarCons,
        mSessoes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
