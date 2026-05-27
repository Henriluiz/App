import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A383FB', // Roxo Zenith
  },
  header: {
    backgroundColor: '#66E4D5', // Verde Água
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 25,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#A569BD',
    marginTop: 5,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -50, // Card flutuando sobre o header
  },
  cardSessao: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    // Sombra Android
    elevation: 8,
    // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
  sessaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#F0FDFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sessaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  infoDoutora: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F4F0FF',
    padding: 15,
    borderRadius: 15,
  },
  labelProfissional: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  nomeDoutora: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  especialidade: {
    fontSize: 16,
    color: '#95A5A6',
  },
  tempoContainer: {
    alignItems: 'flex-end',
  },
  labelHoje: {
    fontSize: 14,
    color: '#95A5A6',
  },
  horario: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#66E4D5',
  },
  btnEntrar: {
    backgroundColor: '#66E4D5',
    paddingVertical: 14, // 
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  btnAgendar: {
    backgroundColor: '#66E4D5',
    paddingVertical: 14, 
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 25,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  grid: {
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 15,
  },
  pressableBase: {
    backgroundColor: '#FFF',
    width: (width / 2) - 28, 
    padding: 18,
    borderRadius: 22,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  miniCardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2C3E50',
    marginTop: 10,
  },
  miniCardSub: {
    fontSize: 11,
    color: '#95A5A6',
  },
  secaoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 15,
  },
  // Remova marginBottom: 120 do cardHistorico e atualize:
  cardHistorico: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  // Novos:
  flatListItem: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  flatListContent: {
    paddingTop: 4,
    paddingBottom: 100, // espaço acima da NavBar
  },
  emptyHistorico: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  historicoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historicoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historicoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  historicoData: {
    fontSize: 16,
    color: '#95A5A6',
  },
});