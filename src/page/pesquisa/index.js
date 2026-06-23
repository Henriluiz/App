// 🔹 IMPORTAÇÕES
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import styles from "./styles";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";

export default function Pesquisa({ route }) {
  const {
    listarPsicologos,
    verHorariosDisponiveis,
    agendarSessaoCont,
    FOTO,
  } = useAuth();

  const { buscaInicial } = route.params ?? {};

  const [busca, setBusca] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFiltro, setModalFiltro] = useState(false);

  const [selecionado, setSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);

  const [agendados, setAgendados] = useState({});

  // 🔥 FILTROS
  const [especialidadeFiltro, setEspecialidadeFiltro] = useState([]);
  const [abordagemFiltro, setAbordagemFiltro] = useState([]);
  const [precoMax, setPrecoMax] = useState(200);

  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avaliacaoMin, setAvaliacaoMin] = useState(0.1);

  const navigation = useNavigation();

  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const [horarios, setHorarios] = useState(null);

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
    if (!lista) return [];
    return lista.filter((item) => {
      if (busca) {
        const texto = busca.toLowerCase();
        const match =
          item.nome.toLowerCase().includes(texto) ||
          item.especialidade.toLowerCase().includes(texto) ||
          item.area.toLowerCase().includes(texto) ||
          (item.abordagem || "").toLowerCase().includes(texto);
        if (!match) return false;
      }

      if (
        especialidadeFiltro.length > 0 &&
        !especialidadeFiltro.some((esp) =>
          item.area.toLowerCase().includes(esp.toLowerCase()),
        )
      )
        return false;

      if (
        abordagemFiltro.length > 0 &&
        !abordagemFiltro.some((ab) =>
          (item.abordagem || "").toLowerCase().includes(ab.toLowerCase()),
        )
      )
        return false;

      if (item.preco > 0 && item.preco > precoMax) return false;

      if (
        item.totalAvaliacoes > 0 &&
        item.avaliacao < avaliacaoMin
      ) {
        return false;
      };

      return true;
    });
  };

  const recomendadosFiltrados = filtrarLista(
    psicologos.filter((p) => p.avaliacao >= 4.5),
  );

  const disponiveisFiltrados = filtrarLista(
    psicologos.filter((p) => p.avaliacao < 4.5)
  ).sort((a, b) => b.avaliacao - a.avaliacao);

  const carregarHorarios = async (id, data) => {
    const dados = await verHorariosDisponiveis(id, data);
    console.log(dados);
    setHorarios(dados);
  };

  // 🔹 CARD
  const renderCard = (item) => {
    const agendado = agendados[item.nome];

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
        onPress={() => navigation.navigate("visualizarPsi", { id: item.id })}
      >
        <View style={styles.topoCard}>
          {item.foto_perfil ? (
            <Image
              source={{
                uri: `${FOTO}${item.foto_perfil}`,
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatar} />
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.area}>{item.area}</Text>
          </View>

          <View style={styles.rating}>
            {[1].map((star) => (
                <Ionicons
                  key={star}
                  name={"star"}
                  size={18}
                  color="#F7B731"
                />
              ))}
            <Text>
              {item.totalAvaliacoes > 0
                ? `${item.avaliacao.toFixed(1)}/${item.totalAvaliacoes}`
                : "N/A"}
            </Text>
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
        </View>
      </Pressable>
    );
  };

  // 🔹 BUSCA DA API AO MONTAR
  useEffect(() => {
    const carregarPsicologos = async () => {
      try {
        const resposta = await listarPsicologos();
        console.log(
          "=== RESPOSTA COMPLETA ===",
          JSON.stringify(resposta, null, 2),
        );

        if (!resposta || !resposta.psicologos) {
          console.error("❌ Resposta inválida - psicologos não encontrado");
          setLoading(false);
          return;
        }

        console.log("Total de usuários:", resposta.psicologos.length);

        if (resposta.psicologos.length > 0) {
          const primeiro = resposta.psicologos[0];
          console.log(
            "=== PRIMEIRO USUÁRIO BRUTO ===",
            JSON.stringify(primeiro, null, 2),
          );
          console.log("Chaves do usuário:", Object.keys(primeiro));
          if (primeiro.psicologo) {
            console.log(
              "Chaves do psicologo:",
              Object.keys(primeiro.psicologo),
            );
          }
        }

        const mapeados = (resposta.psicologos || [])
          .filter((u) => u && u.psicologo)
          .map((u, idx) => {
            // 🔍 Tentar encontrar os IDs corretamente
            const id = u.id_usuario || u.id || u.userId || null;
            const id_psi =
              u.psicologo?.id_psicologo ||
              u.psicologo?.id ||
              u.psicologo?.idPsicologo ||
              null;

            if (!id) {
              console.warn(`⚠️ Usuário ${u.nome} sem ID de usuário`, u);
            }
            if (!id_psi) {
              console.warn(
                `⚠️ Psicólogo ${u.nome} sem ID de psicólogo`,
                u.psicologo,
              );
            }

            const objeto = {
              id: id || u.nome, // Fallback para nome se não houver ID
              id_psi: id_psi || u.nome,
              nome: u.nome || "Sem nome",
              especialidade:
                u.psicologo?.especialidades?.map((e) => e.nome).join(", ") ||
                "Psicólogo",
              abordagem:
                u.psicologo?.abordagens?.map((a) => a.nome).join(", ") || "",
              area:
                u.psicologo?.especialidades?.map((e) => e.nome).join(", ") ||
                "",
              preco: parseFloat(u.psicologo?.preco_sessao) || 0,
              avaliacao: parseFloat(u.psicologo?.avaliacao?.media) || 0,
              totalAvaliacoes: u.psicologo?.avaliacao?.total || 0,
              horario: "A combinar",
              foto_perfil: u.foto_perfil,
              atendimento:
                u.psicologo?.atendimentos
                  ?.map((a) => a.modalidade)
                  .join(", ") || "",
            };

            if (idx === 0) {
              console.log(
                "=== OBJETO MAPEADO (Primeiro) ===",
                JSON.stringify(objeto, null, 2),
              );
            }

            return objeto;
          });

        setPsicologos(mapeados);
        console.log("=== TOTAL MAPEADOS ===", mapeados.length, mapeados);
      } catch (error) {
        console.error("❌ Erro ao carregar psicólogos:", error);
        alert("Erro ao carregar psicólogos: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    carregarPsicologos();
  }, []);

  const gerarDataPorDia = (dia) => {
    const agora = new Date();

    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);

    const mapa = {
      Dom: 0,
      Seg: 1,
      Ter: 2,
      Qua: 3,
      Qui: 4,
      Sex: 5,
      Sab: 6,
    };

    const alvo = mapa[dia];
    const atual = dataLocal.getDay();

    let diff = alvo - atual;
    if (diff <= 0) diff += 7;

    const proximaData = new Date(dataLocal);
    proximaData.setDate(proximaData.getDate() + diff);

    // Formatar como ISO (YYYY-MM-DD)
    const ano = proximaData.getFullYear();
    const mes = String(proximaData.getMonth() + 1).padStart(2, "0");
    const data = String(proximaData.getDate()).padStart(2, "0");

    const dataISO = `${ano}-${mes}-${data}`;
    console.log(
      `📅 Data gerada para ${dia}: ${dataISO} (Dia semana: ${proximaData.getDay()})`,
    );

    return dataISO;
  };

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );

  // 🔹 RENDER
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Pressable>
            <Ionicons name="search" size={20} color="#aaa" />
          </Pressable>
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
            style={({ pressed }) => [
              styles.filtroBtn,
              pressed && { opacity: 0.6 },
            ]}
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCard(item)}
        contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
        bounces={false}
      />

      {/* MODAL AGENDAR */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay} importantForAccessibility="yes">
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
                  onPress={async () => {
                    setDiaSelecionado(dia);

                    if (selecionado) {
                      const data = gerarDataPorDia(dia);
                      await carregarHorarios(selecionado.id_psi, data);
                    }
                  }}
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
              {horarios === null ? null : Array.isArray(horarios) &&
                horarios.length > 0 ? (
                horarios.map((hora) => (
                  <Pressable
                    key={hora}
                    style={[
                      styles.chip,
                      horaSelecionada === hora && {
                        backgroundColor: "#8E7CFF",
                      },
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
                ))
              ) : (
                <Text style={styles.aviso}>
                  Nenhum horário disponível para este dia
                </Text>
              )}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  setHorarios(null);
                }}
              >
                <Text style={{ color: "red" }}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.btnConfirmar}
                onPress={async () => {
                  if (!diaSelecionado || !horaSelecionada || !selecionado) {
                    alert("Selecione dia e horário");
                    return;
                  }

                  console.log("DEBUG AGENDAMENTO:", {
                    id: selecionado.id,
                    id_psi: selecionado.id_psi,
                    nome: selecionado.nome,
                  });

                  const payload = {
                    id_psicologo: selecionado.id_psi, // ✅ USAR ID_PSI
                    id_paciente: selecionado.id, // ✅ USAR ID DO USUÁRIO
                    data_sessao: gerarDataPorDia(diaSelecionado),
                    hora_inicio: horaSelecionada,
                  };

                  console.log("Payload enviado:", payload);

                  try {
                    await agendarSessaoCont(payload);

                    // ✅ CORRIGIDO: Usar selecionado.nome como chave
                    setAgendados({
                      ...agendados,
                      [selecionado.nome]: {
                        dia: diaSelecionado,
                        hora: horaSelecionada,
                      },
                    });

                    alert("Sessão agendada com sucesso! ✅");
                    setModalVisible(false);
                    setHorarios(null);
                    setSelecionado(null);
                  } catch (e) {
                    console.error("Erro ao agendar:", e);
                    if (e.response?.status === 400) {
                      alert("Esse horário já foi ocupado.");
                    } else {
                      alert("Erro ao agendar sessão: " + (e.message || e));
                    }
                  }
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
        <View style={styles.modalOverlay} importantForAccessibility="yes">
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
                    toggleItem(
                      item,
                      especialidadeFiltro,
                      setEspecialidadeFiltro,
                    )
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
                    abordagemFiltro.includes(item) && {
                      backgroundColor: "#8E7CFF",
                    },
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
              maximumValue={200}
              value={precoMax}
              onValueChange={(value) => setPrecoMax(value)}
              style={{ width: "100%" }}
            />

            <Pressable
              onPress={() => {
                setEspecialidadeFiltro([]);
                setAbordagemFiltro([]);
                setPrecoMax(200);
              }}
            >
              <Text style={{ color: "#6B5EFF", marginTop: 10 }}>
                Limpar filtros
              </Text>
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

      {/* NAVBAR */}
      <NavBar tela="pesquisa" />
    </View>
  );
}
