import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; 
import NavBar from "../../components/NavBar";
import styles from './styles';

export default function CentralCuidado() {
  //efeito de opacidade ao pressionar
  const getPressableStyle = ({ pressed }) => [
    styles.pressableBase,
    { opacity: pressed ? 0.7 : 1 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B59B6" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }} // Espaço extra para a NavBar fixa
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Central de Cuidado</Text>
          <Text style={styles.subtitle}>Gerencie suas sessões e informações</Text>
        </View>

        <View style={styles.content}>
          {/* Card Próxima Sessão */}
          <View style={styles.cardSessao}>
            <View style={styles.sessaoHeader}>
              <View style={styles.iconCircle}>
                <Feather name="video" size={20} color="#76D7C4" />
              </View>
              <Text style={styles.sessaoTitle}>Próxima Sessão</Text>
            </View>

            <View style={styles.infoDoutora}>
              <View>
                <Text style={styles.labelProfissional}>Profissional</Text>
                <Text style={styles.nomeDoutora}>Dra. Eloísa</Text>
                <Text style={styles.especialidade}>Psicóloga Clínica</Text>
              </View>
              <View style={styles.tempoContainer}>
                <Text style={styles.labelHoje}>Hoje</Text>
                <Text style={styles.horario}>14:00</Text>
              </View>
            </View>

            <Pressable 
              style={({ pressed }) => [
                styles.btnEntrar, 
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => console.log('Entrando no Google Meet...')}
            >
              <Text style={styles.btnText}>Entrar na Sessão</Text>
            </Pressable>
          </View>

          {/* Grid de Atalhos */}
          <View style={styles.grid}>
            <View style={styles.row}>
              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="time-outline" size={24} color="#5DADE2" />
                <Text style={styles.miniCardTitle}>Sessões</Text>
                <Text style={styles.miniCardSub}>Ver histórico</Text>
              </Pressable>

              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="chatbubble-outline" size={24} color="#A569BD" />
                <Text style={styles.miniCardTitle}>Chat</Text>
                <Text style={styles.miniCardSub}>Mensagens</Text>
              </Pressable>
            </View>

            <View style={styles.row}>
              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="document-text-outline" size={24} color="#52BE80" />
                <Text style={styles.miniCardTitle}>Prontuário</Text>
                <Text style={styles.miniCardSub}>Meus dados</Text>
              </Pressable>

              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="card-outline" size={24} color="#EB984E" />
                <Text style={styles.miniCardTitle}>Pagamento</Text>
                <Text style={styles.miniCardSub}>Faturas</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.secaoTitle}>Histórico Recente</Text>
          <View style={styles.cardHistorico}>
              <Text style={styles.nomeDoutora}>Dra. Eloísa</Text>
              <Text style={styles.especialidade}>Sessão concluída em 05/04</Text>
          </View>
        </View>
      </ScrollView>
      <NavBar 
              tela = "central"
            />  
    </SafeAreaView>
  );
}
