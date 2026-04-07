// 🔹 IMPORTAÇÕES
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import styles from "./styles";
import NavBar from "../../components/NavBar";

// 🔹 COMPONENTE
export default function Pesquisa() {
  const [busca, setBusca] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFiltro, setModalFiltro] = useState(false);

  const [selecionado, setSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);

  const [agendados, setAgendados] = useState({});

  // 🔹 MODAL DE CONFIRMAÇÃO CANCELAR
  const [modalCancelarVisible, setModalCancelarVisible] = useState(false);
  const [cancelando, setCancelando] = useState(null);

  // 🔥 FILTROS
  const [especialidadeFiltro, setEspecialidadeFiltro] = useState([]);
  const [abordagemFiltro, setAbordagemFiltro] = useState([]);
  const [precoMax, setPrecoMax] = useState(2000);

  const navigation = useNavigation();

  // 🔹 DADOS (AGORA COM ABORDAGEM)
  const recomendados = [
    {
      nome: "Dra. Maria Silva",
      especialidade: "Psicóloga Clínica",
      abordagem: "Cognitivo",
      area: "Ansiedade, Autoestima, Relacionamentos",
      preco: 80,
      avaliacao: 4.9,
      horario: "Hoje, 9:00",
    },
  ];

  const disponiveis = [
    {
      nome: "Dr. Carlos Oliveira",
      especialidade: "Psicanalista",
      abordagem: "Psicanálise",
      area: "Trauma",
      preco: 200,
      avaliacao: 4.8,
      horario: "Hoje, 9:00",
    },
    {
      nome: "Dra. Beatriz Souza",
      especialidade: "Psicóloga Comportamental",
      abordagem: "Cognitivo",
      area: "Fobias",
      preco: 180,
      avaliacao: 4.7,
      horario: "Hoje, 9:00",
    },
  ];

  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const horarios = ["09:00", "11:00", "14:00", "16:00"];

  const especialidades = ["Ansiedade", "Depressão", "Fobias"];
  const abordagens = ["Humanista", "Cognitivo", "Psicanálise"];

  // 🔥 TOGGLE MULTIPLO
  const toggleItem = (item, lista, setLista) => {
    if (lista.includes(item)) {
      setLista(lista.filter((i) => i !== item));
    } else {
      setLista([...lista, item]);
    }
  };

  // 🔥 FILTRO MELHORADO
  const filtrarLista = (lista) => {
    return lista.filter((item) => {
      // 🔍 BUSCA INTELIGENTE
      if (busca) {
        const texto = busca.toLowerCase();
        const match =
          item.nome.toLowerCase().includes(texto) ||
          item.especialidade.toLowerCase().includes(texto) ||
          item.area.toLowerCase().includes(texto) ||
          (item.abordagem || "").toLowerCase().includes(texto);
        if (!match) return false;
      }

      // 🎯 ESPECIALIDADE
      if (
        especialidadeFiltro.length > 0 &&
        !especialidadeFiltro.some((esp) =>
          item.area.toLowerCase().includes(esp.toLowerCase())
        )
      )
        return false;

      // 🎯 ABORDAGEM CORRIGIDA
      if (
        abordagemFiltro.length > 0 &&
        !abordagemFiltro.some((ab) =>
          (item.abordagem || "").toLowerCase().includes(ab.toLowerCase())
        )
      )
        return false;

      // 💰 PREÇO
      if (item.preco > precoMax) return false;

      return true;
    });
  };

  const recomendadosFiltrados = filtrarLista(recomendados);
  const disponiveisFiltrados = filtrarLista(disponiveis);

  // 🔹 CARD
  const renderCard = (item) => {
    const agendado = agendados[item.nome];

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
        onPress={() =>
          navigation.navigate("visualizarPsi", { psicologo: item })
        }
      >
        <View style={styles.topoCard}>
          <View style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.especialidade}>{item.especialidade}</Text>
            <Text style={styles.area}>{item.area}</Text>
          </View>

          <View style={styles.rating}>
            <Text>⭐ {item.avaliacao}</Text>
          </View>
        </View>

        <View style={styles.footerCard}>
          <View style={styles.linhaInfo}>
            <Text style={styles.horario}>
              🕒 {agendado ? `${agendado.dia}, ${agendado.hora}` : item.horario}
            </Text>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.sessao}>Sessão</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
            </View>
          </View>

          <Pressable
            style={[styles.botao, agendado && { backgroundColor: "#ccc" }]}
            onPress={(e) => {
              e.stopPropagation();

              if (agendado) {
                // Abre modal de confirmação para cancelar
                setCancelando(item);
                setModalCancelarVisible(true);
                return;
              }

              setSelecionado(item);
              setDiaSelecionado(null);
              setHoraSelecionada(null);
              setModalVisible(true);
            }}
          >
            <Text style={[styles.botaoTexto, agendado && { color: "#000" }]}>
              {agendado ? "✔ Agendado" : "Agendar"}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  // 🔹 RENDER
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Buscar psicólogo, especialidade..."
            placeholderTextColor="#999"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <View style={styles.filtros}>
          <Pressable
            style={({ pressed }) => [styles.filtroBtn, pressed && { opacity: 0.6 }]}
            onPress={() => setModalFiltro(true)}
          >
            <Ionicons name="options" size={16} color="#6B5EFF" />
            <Text style={styles.filtroTexto}>Filtros</Text>
          </Pressable>
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>Recomendados</Text>
            {recomendadosFiltrados.map((item, index) => (
              <View key={index}>{renderCard(item)}</View>
            ))}

            <Text style={styles.titulo}>Disponíveis</Text>
          </>
        }
        data={disponiveisFiltrados}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => renderCard(item)}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
      />

      {/* 🔥 SEM RESULTADO */}
      {disponiveisFiltrados.length === 0 &&
        recomendadosFiltrados.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum resultado encontrado 😢
          </Text>
        )}

      {/* MODAL AGENDAR */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Escolha dia e horário</Text>

            <Text>Dias:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {dias.map((dia) => (
                <Pressable
                  key={dia}
                  style={[
                    styles.chip,
                    diaSelecionado === dia && { backgroundColor: "#8E7CFF" },
                  ]}
                  onPress={() => setDiaSelecionado(dia)}
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      diaSelecionado === dia && { color: "#fff" },
                    ]}
                  >
                    {dia}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ marginTop: 10 }}>Horários:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {horarios.map((hora) => (
                <Pressable
                  key={hora}
                  style={[
                    styles.chip,
                    horaSelecionada === hora && { backgroundColor: "#8E7CFF" },
                  ]}
                  onPress={() => setHoraSelecionada(hora)}
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      horaSelecionada === hora && { color: "#fff" },
                    ]}
                  >
                    {hora}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red" }}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.btnConfirmar}
                onPress={() => {
                  if (!diaSelecionado || !horaSelecionada) return;

                  setAgendados({
                    ...agendados,
                    [selecionado.nome]: {
                      dia: diaSelecionado,
                      hora: horaSelecionada,
                    },
                  });

                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL FILTROS */}
      <Modal visible={modalFiltro} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Filtros</Text>

            <Text>Especialidade:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {especialidades.map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.chip,
                    especialidadeFiltro.includes(item) && {
                      backgroundColor: "#8E7CFF",
                    },
                  ]}
                  onPress={() =>
                    toggleItem(item, especialidadeFiltro, setEspecialidadeFiltro)
                  }
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      especialidadeFiltro.includes(item) && { color: "#fff" },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ marginTop: 10 }}>Abordagem:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {abordagens.map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.chip,
                    abordagemFiltro.includes(item) && { backgroundColor: "#8E7CFF" },
                  ]}
                  onPress={() =>
                    toggleItem(item, abordagemFiltro, setAbordagemFiltro)
                  }
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      abordagemFiltro.includes(item) && { color: "#fff" },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ marginTop: 10 }}>
              Preço máximo: R$ {Math.round(precoMax)}
            </Text>

            <Slider
              minimumValue={0}
              maximumValue={2000}
              value={precoMax}
              onValueChange={(value) => setPrecoMax(value)}
            />

            <Pressable
              onPress={() => {
                setEspecialidadeFiltro([]);
                setAbordagemFiltro([]);
                setPrecoMax(2000);
              }}
            >
              <Text style={{ color: "#6B5EFF", marginTop: 10 }}>Limpar filtros</Text>
            </Pressable>

            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalFiltro(false)}>
                <Text style={{ color: "red" }}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.btnConfirmar}
                onPress={() => setModalFiltro(false)}
              >
                <Text style={{ color: "#fff" }}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL CONFIRMAÇÃO CANCELAMENTO */}
      <Modal visible={modalCancelarVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>
              Deseja realmente cancelar este agendamento?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setModalCancelarVisible(false)}
                style={[styles.btnCancelar, { paddingHorizontal: 20 }]}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>Não</Text>
              </Pressable>

              <Pressable
                style={styles.btnConfirmar}
                onPress={() => {
                  if (cancelando) {
                    const novo = { ...agendados };
                    delete novo[cancelando.nome];
                    setAgendados(novo);
                  }
                  setModalCancelarVisible(false);
                  setCancelando(null);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* NAVBAR */}
      <NavBar tela="pesquisa" />
    </View>
  );
}