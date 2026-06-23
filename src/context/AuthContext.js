import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  getPerfil,
  logout,
  deleteConta,
  patchPerfil,
  verificarCPF,
  verificarUsername,
  enviarEmail,
  verificarCodSenha,
  redefinirSenhaC,
  verificarEmail,
  verificarEmailConfirmar,
  mPagamentoPendente,
  mAnexarComprovante,
  PerfilPsicologo,
  notificacao,
  detalhesConsultaC,
  iniciarChat,
  enviarMensagem,
  historicoChat,
  visualizarChat,
  aprovarSessaoC,
  recusarSessaoC,
  PesquisaPsicologo,
  horariosDisponiveis,
  avaliar,
  linkSessão,
  pixchave,
  agendarSessao,
  solicitarCancelamento,
  solicitarReagendamento,
  detalhesConsulta,
  minhasSessoes,
  pacienteHistorico,
  listarMeusPsicologos
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
    const token = await getToken();
    console.log("🔑 Token atual:", token); // ← deve aparecer um token JWT, não null
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
      console.log(
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
      console.log("ERRO COMPLETO (verPsicólogo):", e.response?.data);

      return {
        user: false,
        psicologo: false,
      };
    }
  }
  async function avaliarC(id_psicologo, nota) {
    try {
      const response = await avaliar(id_psicologo, nota);
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log("ERRO COMPLETO (avaliarC):", e.response?.data);

      return {
        error: true,
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
      console.log("ERRO COMPLETO (listarPsicologos):", e.response?.data);

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
      console.log(
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
      console.log("Erro completo (agendarSessao):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  async function detalhesConsulta(id_sessao) {
    try {
      const resposta = await detalhesConsultaC(id_sessao);
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (detalhesConsulta):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  async function SolCancelamentoCons(id_sessao, motivo) {
    try {
      const resposta = await solicitarCancelamento(id_sessao, motivo);
      return resposta;
    } catch (e) {
      console.log("Erro completo (SolCancelamentoCons):", e.response?.data);
      return null;
    }
  }

  async function SolReagendarCons(id_sessao, dados) {
    try {
      const resposta = await solicitarReagendamento(id_sessao, dados);
      return resposta;
    } catch (e) {
      console.log("Erro completo (SolReagendarCons):", e.response?.data);
      return null;
    }
  }

  async function centralNotificacao() {
    try {
      const resposta = await notificacao();
      return resposta;
    } catch (e) {
      console.log("Erro completo (centralNotificacao):", e.response?.data);
      return null;
    }
  }

  async function PagamentoPendente() {
    try {
      const resposta = await mPagamentoPendente();
      return resposta;
    } catch (e) {
      console.log("Erro completo (PagamentoPendente):", e.response?.data);
      return null;
    }
  }
  async function AnexarComprovante(id_pagamento, fotoUri) {
    console.log("🟡 mAnexarComprovante chamada:", id_pagamento, fotoUri); // ← adicione isso
    try {
      const resposta = await mAnexarComprovante(id_pagamento, fotoUri);
      return resposta;
    } catch (e) {
      console.log("Erro completo (AnexarComprovante):", e.response?.data);
      console.log("Status:", e.response?.status);
      console.log("Message:", e.message);        // ← qual erro de rede
      console.log("Code:", e.code);    
      return null;
    }
  }

  async function EnviarEmailCont(email) {
    try {
      const resposta = await enviarEmail(email);
      return resposta;
    } catch (e) {
      console.log("Erro completo (EnviarEmailCont):", e.response?.data);
      return null;
    }
  }
  
  async function linkSessãoEntrar(id_sessao) {
    try {
      const resposta = await linkSessão(id_sessao);
      return resposta;
    } catch (e) {
      console.log("Erro completo (linkSessãoEntrar):", e.response?.data);
      return e?.response?.data ?? { error: true, code: 'ERRO_INTERNO' };
    }
  }

  async function chavepix(id_pagamento) {
    try {
      const resposta = await pixchave(id_pagamento);
      return resposta;
    } catch (e) {
      console.log("Erro completo (chavepix):", e.response?.data);
      return e?.response?.data ?? { error: true, code: 'ERRO_INTERNO' };
    }
  }

  async function verificarEmailC(email) {
    try {
      const resposta = await verificarEmail(email);
      return resposta;
    } catch (e) {
      console.log("Erro completo (verificarEmailC):", e.response?.data);
      return null;
    }
  }

  async function verificarCodigoSenha(email, code) {
    try {
      const resposta = await verificarCodSenha(email, code);
      return resposta;
    } catch (e) {
      console.log("Erro completo (verificarCodigoSenha):", e.response?.data);
      return null;
    }
  }

  async function aprovarSessao(id_sessao) {
    try {
      const resposta = await aprovarSessaoC(id_sessao);
      return resposta;
    } catch (e) {
      console.log("Erro completo (aprovarSessao):", e.response?.data);
      return null;
    }
  }

  async function recusarSessao(id_sessao, motivo) {
    try {
      const resposta = await recusarSessaoC(id_sessao, motivo);
      return resposta;
    } catch (e) {
      console.log("Erro completo (recusarSessao):", e.response?.data);
      return null;
    }
  }

  async function redefinirSenha(email, code, senha, confirmar_senha) {
    try {
      const resposta = await redefinirSenhaC(email, code, senha, confirmar_senha);
      return resposta;
    } catch (e) {
      console.log("Erro completo (redefinirSenha):", e.response?.data);
      return null;
    }
  }
  async function verificarEmailConfirmarC(email, code) {
    try {
      const resposta = await verificarEmailConfirmar(email, code);
      return resposta;
    } catch (e) {
      console.log("Erro completo (verificarEmailConfirmar):", e.response?.data);
      return null;
    }
  }

  async function detalhesCons(id_sessao) {
    try {
      const resposta = await detalhesConsulta(id_sessao);
      return resposta;
    } catch (e) {
      console.log("Erro completo (detalhesCons):", e.response?.data);
      return null;
    }
  }

  async function mSessoes() {
    try {
      const resposta = await minhasSessoes();
      return resposta;
    } catch (e) {
      console.log("Erro completo (mSessoes):", e.response?.data);
      return null;
    }
  }

  async function historico() {
    try {
      const resposta = await pacienteHistorico();
      return resposta;
    } catch (e) {
      console.log("Erro completo (historico):", e.response?.data);
      return null;
    }
  }

  // ─── CHAT ────────────────────────────────────────────────────────────────────

  // Inicia ou recupera um chat com um psicólogo
  // dados: { psicologo_id: number }
  async function iniciarChatCont(dados) {
    console.log("USER:", user);
    console.log("PACIENTE:", user?.paciente);
    console.log("ID PACIENTE:", user?.paciente?.id_paciente);
    try {
      const resposta = await iniciarChat({
        ...dados,
        id_paciente: user?.paciente?.id_paciente,
      });
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (iniciarChatCont):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  // Envia uma mensagem em um chat
  // dados: { chat_id: number, mensagem: string }
  async function enviarMensagemCont(dados) {
    try {
      const resposta = await enviarMensagem(dados);
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (enviarMensagemCont):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  // Busca o histórico de mensagens de um chat
  // id: number (id do chat)
  async function historicoChatCont(id) {
    try {
      const resposta = await historicoChat(id);
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (historicoChatCont):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  // Marca as mensagens de um chat como visualizadas
  // id_chat: number
  async function visualizarChatCont(id_chat) {
    try {
      const resposta = await visualizarChat(id_chat);
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (visualizarChatCont):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
    }
  }

  // Lista os psicólogos que já atenderam o paciente
  async function listarMeusPsicologosCont() {
    try {
      const resposta = await listarMeusPsicologos();
      return { sucesso: true, dados: resposta };
    } catch (e) {
      console.log("Erro completo (listarMeusPsicologosCont):", e.response?.data || e.message);
      return { sucesso: false, erro: e.response?.data?.message || "Erro desconhecido" };
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
        EnviarEmailCont,
        verificarCodigoSenha,
        redefinirSenha,
        verificarEmailC,
        verificarEmailConfirmarC,
        PagamentoPendente,
        AnexarComprovante,
        centralNotificacao,
        detalhesConsulta,

        aprovarSessao,
        recusarSessao,
        avaliarC,
        chavepix,

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
        linkSessãoEntrar,

        // Chat
        listarMeusPsicologosCont,
        iniciarChatCont,
        enviarMensagemCont,
        historicoChatCont,
        visualizarChatCont,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
