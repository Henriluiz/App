import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
 
/**
 * ModalApp — Modal reutilizável para todo o projeto.
 *
 * @param {boolean}  visible           - Controla visibilidade do modal
 * @param {string}   titulo            - Título exibido no topo
 * @param {string}   mensagem          - Mensagem/descrição do modal
 * @param {string}   [tipo]            - Ícone decorativo: "sucesso" | "erro" | "aviso" | "info" (opcional)
 *
 * — MODO PADRÃO (1 botão) —
 * @param {string}   [okTexto]         - Texto do botão único (default: "OK")
 * @param {function} [onOk]            - Ação do botão único
 *
 * — MODO DUPLO (2 botões) —
 * @param {boolean}  [duplo]           - Ativa o modo com dois botões
 * @param {string}   [confirmarTexto]  - Texto do botão de confirmação (default: "Confirmar")
 * @param {function} [onConfirmar]     - Ação do botão de confirmação
 * @param {boolean}  [confirmarLoading]- Exibe spinner no botão confirmar
 * @param {string}   [cancelarTexto]   - Texto do botão de cancelar (default: "Cancelar")
 * @param {function} [onCancelar]      - Ação do botão de cancelar
 *
 * — EXEMPLOS DE USO —
 *
 * // Modo padrão (1 botão OK)
 * <ModalApp
 *   visible={modalVisible}
 *   titulo="Sessão agendada!"
 *   mensagem="Sua consulta foi marcada com sucesso."
 *   tipo="sucesso"
 *   onOk={() => setModalVisible(false)}
 * />
 *
 * // Modo duplo (confirmar + cancelar)
 * <ModalApp
 *   visible={modalVisible}
 *   titulo="Cancelar consulta?"
 *   mensagem="Tem certeza que deseja cancelar esta sessão?"
 *   tipo="aviso"
 *   duplo
 *   confirmarTexto="Sim, cancelar"
 *   onConfirmar={handleCancelar}
 *   confirmarLoading={loading}
 *   cancelarTexto="Voltar"
 *   onCancelar={() => setModalVisible(false)}
 * />
 */
 
const ICONE_CONFIG = {
  sucesso: { nome: "checkmark-circle",  cor: "#4CAF50" },
  erro:    { nome: "close-circle",      cor: "#F44336" },
  aviso:   { nome: "warning",           cor: "#FFA726" },
  info:    { nome: "information-circle", cor: "#8E7CFF" },
};
 
export default function ModalApp({
  visible,
  titulo,
  mensagem,
  tipo,
 
  // Modo padrão
  okTexto = "OK",
  onOk,
 
  // Modo duplo
  duplo = false,
  confirmarTexto = "Confirmar",
  onConfirmar,
  confirmarLoading = false,
  cancelarTexto = "Cancelar",
  onCancelar,
}) {
  const icone = tipo ? ICONE_CONFIG[tipo] : null;
 
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.caixa}>
 
          {/* Ícone decorativo */}
          {icone && (
            <Ionicons
              name={icone.nome}
              size={56}
              color={icone.cor}
              style={styles.icone}
            />
          )}
 
          {/* Título */}
          <Text style={styles.titulo}>{titulo}</Text>
 
          {/* Mensagem */}
          <Text style={styles.mensagem}>{mensagem}</Text>
 
          {/* ── BOTÕES ── */}
          {duplo ? (
            // Modo duplo: confirmar + cancelar
            <View style={styles.botoesLinha}>
              <Pressable style={styles.botaoCancelar} onPress={onCancelar}>
                <Text style={styles.botaoCancelarTexto}>{cancelarTexto}</Text>
              </Pressable>
 
              <Pressable
                style={[styles.botaoConfirmar, confirmarLoading && { opacity: 0.7 }]}
                onPress={onConfirmar}
                disabled={confirmarLoading}
              >
                {confirmarLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.botaoConfirmarTexto}>{confirmarTexto}</Text>
                )}
              </Pressable>
            </View>
          ) : (
            // Modo padrão: botão único OK
            <Pressable style={styles.botaoOk} onPress={onOk}>
              <Text style={styles.botaoOkTexto}>{okTexto}</Text>
            </Pressable>
          )}
 
        </View>
      </View>
    </Modal>
  );
}