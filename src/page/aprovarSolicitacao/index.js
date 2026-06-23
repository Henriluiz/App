import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import ModalApp from "../../components/modalApp";
import styles from "./styles";

export default function AprovacaoSol({ route }) {
  const navigation = useNavigation();
  const { aprovarSessao, recusarSessao, detalhesConsulta } = useAuth();

  const { tipo, id_sessao } = route.params ?? {};

  const [sessao, setSessao]             = useState(null);
  const [buscando, setBuscando]         = useState(true);
  const [erroBusca, setErroBusca]       = useState(null);

  const [carregando, setCarregando]     = useState(false);
  const [acao, setAcao]                 = useState(null);
  const [motivo, setMotivo]             = useState("");
  const [erroMotivo, setErroMotivo]     = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [textoSucesso, setTextoSucesso] = useState("");

  // ── Busca inicial ─────────────────────────────────────────────────────────────
  useEffect(() => {
    async function buscar() {
      setBuscando(true);
      setErroBusca(null);
      const resultado = await detalhesConsulta(id_sessao);
      console.log("DETALHES DA CONSULTA:",resultado)
      if (resultado.sucesso) {
        setSessao(resultado.dados.sessao);
      } else {
        setErroBusca(resultado.erro);
      }
      setBuscando(false);
    }
    buscar();
  }, [id_sessao]);

  // ── Formatadores ──────────────────────────────────────────────────────────────
  const DIAS_SEMANA = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
  const MESES       = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

  const formatarData = (dataStr) => {
    if (!dataStr) return "—";
    const [ano, mes, dia] = dataStr.split("-").map(Number);
    const date = new Date(ano, mes - 1, dia);
    return `${DIAS_SEMANA[date.getDay()]}, ${dia} de ${MESES[mes - 1]}`;
  };

  const formatarHora = (hora) => hora?.slice(0, 5) ?? "—";

  // ── Dados derivados ───────────────────────────────────────────────────────────
  const isCancelamento    = tipo === "cancelamento";
  const tituloBadge       = isCancelamento ? "Solicitação de Cancelamento" : "Solicitação de Reagendamento";
  const iconeBadge        = isCancelamento ? "close-circle-outline" : "calendar-outline";
  const corBadge          = isCancelamento ? "#FF5A5F" : "#F59E0B";
  const corBadgeBg        = isCancelamento ? "#FFF1F1" : "#FFFBEB";

  const nomePsicologo     = sessao?.psicologo?.usuario?.nome ?? "—";
  const especialidade =
  Array.isArray(sessao?.psicologo?.especialidades)
    ? sessao.psicologo.especialidades[0]?.nome        // array de objetos
        ?? sessao.psicologo.especialidades[0]          // array de strings
        ?? ""
    : sessao?.psicologo?.especialidade                 // string direta
        ?? sessao?.psicologo?.biografia                // fallback bio
        ?? "";
  const dataOriginal      = formatarData(sessao?.data_sessao);
  const horaOriginal      = formatarHora(sessao?.hora_inicio);
  const dataNovaFormatada = formatarData(sessao?.data_solicitada);
  const horaNovaFormatada = formatarHora(sessao?.hora_solicitada);
  const motivoCancelamento = sessao?.observacoes?.trim();

  // ── Ações ─────────────────────────────────────────────────────────────────────
  const abrirModal = (tipoAcao) => {
    setAcao(tipoAcao);
    setMotivo("");
    setErroMotivo(false);
    setModalConfirm(true);
  };

  const handleConfirmar = async () => {
    // Recusar exige motivo (backend obriga)
    if (acao === "recusar" && !motivo.trim()) {
      setErroMotivo(true);
      return;
    }

    setCarregando(true);
    setModalConfirm(false);

    try {
      if (acao === "aceitar") {
        // aprovarSessao só precisa do id
        await aprovarSessao(id_sessao);
        setTextoSucesso(isCancelamento ? "Cancelamento aceito" : "Reagendamento aceito");
      } else {
        // recusarSessao precisa do id e do motivo
        await recusarSessao(id_sessao, motivo.trim());
        setTextoSucesso(isCancelamento ? "Cancelamento recusado" : "Reagendamento recusado");
      }

      setModalSucesso(true);
      await new Promise((r) => setTimeout(r, 3000));
      setModalSucesso(false);
      navigation.replace("menu");
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  // ── Textos do modal ───────────────────────────────────────────────────────────
  const modalTitulo =
    acao === "aceitar"
      ? isCancelamento ? "Aceitar cancelamento?" : "Aceitar reagendamento?"
      : isCancelamento ? "Recusar cancelamento?" : "Recusar reagendamento?";

  const modalMensagem =
    acao === "aceitar"
      ? isCancelamento
        ? "Ao aceitar, a sessão será cancelada definitivamente."
        : "Ao aceitar, a sessão será remarcada para a nova data."
      : isCancelamento
        ? "A sessão continuará mantida na data original."
        : "A data atual da sessão será mantida.";

  // ── Loading / erro ────────────────────────────────────────────────────────────
  if (buscando) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#8E7CFF" />
        <Text style={{ marginTop: 12, color: "#888" }}>Carregando sessão...</Text>
      </View>
    );
  }

  if (erroBusca || !sessao) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 24 }]}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF5A5F" />
        <Text style={{ marginTop: 12, color: "#FF5A5F", textAlign: "center" }}>
          {erroBusca ?? "Não foi possível carregar a sessão."}
        </Text>
        <Pressable onPress={() => navigation.navigate("menu")} style={{ marginTop: 20 }}>
          <Text style={{ color: "#8E7CFF" }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={[styles.badge, { backgroundColor: corBadgeBg, borderColor: corBadge }]}>
          <Ionicons name={iconeBadge} size={22} color={corBadge} />
          <Text style={[styles.badgeTexto, { color: corBadge }]}>{tituloBadge}</Text>
        </View>

        <Text style={styles.subtitulo}>
          {isCancelamento
            ? "Seu psicólogo solicitou o cancelamento desta sessão. Verifique os detalhes e decida como proceder."
            : "Seu psicólogo propôs um novo horário para esta sessão. Confira e responda."}
        </Text>

        {/* CARD PSICÓLOGO */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Psicólogo</Text>
          <View style={styles.psicRow}>

            {/* Foto ou avatar fallback */}
            {sessao?.psicologo?.foto_url ? (
              <Image
                source={{ uri: sessao.psicologo.foto_url }}
                style={styles.avatarFoto}
              />
            ) : (
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={28} color="#8E7CFF" />
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.psicNome}>
                {nomePsicologo}
              </Text>
            </View>

          </View>
        </View>

        {/* CARD MOTIVO — só aparece se houver observação preenchida */}
        {motivoCancelamento && (
          <View style={[styles.card, styles.cardMotivo]}>
            <View style={styles.cardMotivoHeader}>
              <Ionicons name="chatbox-ellipses-outline" size={18} color="#FF5A5F" />
              <Text style={[styles.cardTitulo, { marginBottom: 0, marginLeft: 6, color: "#FF5A5F" }]}>
                Motivo informado
              </Text>
            </View>
            <Text style={styles.motivoTexto}>{motivoCancelamento}</Text>
          </View>
        )}

        {/* CARD SESSÃO ORIGINAL */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>
            {isCancelamento ? "Sessão a ser cancelada" : "Sessão atual"}
          </Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValor}>{dataOriginal}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValor}>{horaOriginal}</Text>
          </View>
        </View>

        {/* CARD NOVA DATA — só reagendamento */}
        {!isCancelamento && (
          <View style={[styles.card, styles.cardNovo]}>
            <View style={styles.cardNovoHeader}>
              <Ionicons name="arrow-forward-circle" size={18} color="#8E7CFF" />
              <Text style={[styles.cardTitulo, { marginBottom: 0, marginLeft: 6, color: "#8E7CFF" }]}>
                Nova proposta
              </Text>
            </View>
            <View style={[styles.infoBox, styles.infoBoxNovo]}>
              <Text style={styles.infoLabel}>Nova data</Text>
              <Text style={styles.infoValor}>{dataNovaFormatada}</Text>
            </View>
            <View style={[styles.infoBox, styles.infoBoxNovo]}>
              <Text style={styles.infoLabel}>Novo horário</Text>
              <Text style={styles.infoValor}>{horaNovaFormatada}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.botaoAceitar, carregando && { opacity: 0.6 }]}
          onPress={() => abrirModal("aceitar")}
          disabled={carregando}
        >
          {carregando && acao === "aceitar" ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.botaoAceitarTexto}>
                {isCancelamento ? "Aceitar cancelamento" : "Aceitar reagendamento"}
              </Text>
            </>
          )}
        </Pressable>

        <Pressable
          style={[styles.botaoRecusar, carregando && { opacity: 0.6 }]}
          onPress={() => abrirModal("recusar")}
          disabled={carregando}
        >
          {carregando && acao === "recusar" ? (
            <ActivityIndicator size="small" color="#FF5A5F" />
          ) : (
            <>
              <Ionicons name="close" size={18} color="#FF5A5F" style={{ marginRight: 6 }} />
              <Text style={styles.botaoRecusarTexto}>
                {isCancelamento ? "Manter sessão" : "Manter data atual"}
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {/* MODAL DE CONFIRMAÇÃO */}
      <ModalApp
        visible={modalConfirm}
        titulo={modalTitulo}
        mensagem={modalMensagem}
        tipo={acao === "aceitar" ? "aviso" : "erro"}
        duplo
        confirmarTexto="Confirmar"
        onConfirmar={handleConfirmar}
        confirmarLoading={carregando}
        cancelarTexto="Voltar"
        onCancelar={() => setModalConfirm(false)}
      >
        {/* Campo de motivo aparece só ao recusar */}
        {acao === "recusar" && (
          <View style={{ marginTop: 12 }}>
            <TextInput
              placeholder="Informe o motivo..."
              placeholderTextColor="#aaa"
              value={motivo}
              onChangeText={(t) => { setMotivo(t); setErroMotivo(false); }}
              multiline
              numberOfLines={3}
              style={{
                borderWidth: 1,
                borderColor: erroMotivo ? "#FF5A5F" : "#ddd",
                borderRadius: 8,
                padding: 10,
                fontSize: 14,
                color: "#333",
                textAlignVertical: "top",
                minHeight: 80,
              }}
            />
            {erroMotivo && (
              <Text style={{ color: "#FF5A5F", fontSize: 12, marginTop: 4 }}>
                O motivo é obrigatório para recusar.
              </Text>
            )}
          </View>
        )}
      </ModalApp>

      {/* MODAL SUCESSO */}
      <Modal
        visible={modalSucesso}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSucesso(false)}
      >
        <View style={styles.successOverlay}>
          <View style={styles.successContainer}>
            <View style={styles.successIconWrap}>
              <Ionicons
                name={acao === "aceitar" ? "checkmark-circle" : "close-circle"}
                size={120}
                color={acao === "aceitar" ? "#22C55E" : "#FF5A5F"}
              />
            </View>
            <Text style={styles.successTexto}>{textoSucesso}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}