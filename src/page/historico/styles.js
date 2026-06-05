import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#A383FB',        // roxo principal do fundo
  proximaCard: '#6FD6C5',       // verde-água do card de próxima consulta
  white: '#FFFFFF',
  doctorNameProxima: '#FFFFFF',
  dateProxima: '#FFFFFF',
  onlineBadgeBg: '#5BC4B3',
  onlineBadgeText: '#FFFFFF',
  entrarButton: '#FFFFFF',
  entrarButtonText: '#6FD6C5',
  sectionTitle: '#FFFFFF',
  historicoCardBg: '#FFFFFF',
  historicoDoctorName: '#2D2D2D',
  historicoDate: '#888888',
  // Status: Realizada
  realizadaBg: '#EAF7F5',
  realizadaText: '#28a745',
  realizadaBorder: '#B2E8E0',
  // Status: Cancelada
  canceladaBg: '#FFF0F0',
  canceladaText: '#E05252',
  canceladaBorder: '#F5C6C6',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A383FB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // ── Títulos de seção ──────────────────────────────────────────────
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.sectionTitle,
    marginBottom: 14,
    marginTop: 8,
  },

  // ── Card Próxima Consulta ─────────────────────────────────────────
  proximaCard: {
    backgroundColor: COLORS.proximaCard,
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  proximaCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  proximaDoctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.doctorNameProxima,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.onlineBadgeBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  onlineIcon: {
    fontSize: 12,
  },
  onlineBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onlineBadgeText,
  },
  proximaDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  calendarIcon: {
    fontSize: 13,
  },
  proximaDate: {
    fontSize: 13,
    color: COLORS.dateProxima,
    fontWeight: '500',
  },
  entrarButton: {
    backgroundColor: COLORS.entrarButton,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  entrarButtonText: {
    color: COLORS.entrarButtonText,
    fontSize: 15,
    fontWeight: '600',
  },

  // ── Cards Histórico ───────────────────────────────────────────────
  historicoCard: {
    backgroundColor: COLORS.historicoCardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  historicoCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historicoInfo: {
    flex: 1,
    marginRight: 12,
  },
  historicoDoctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.historicoDoctorName,
    marginBottom: 4,
  },
  historicoDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clockIcon: {
    fontSize: 12,
  },
  historicoDate: {
    fontSize: 13,
    color: COLORS.historicoDate,
    fontWeight: '400',
  },

  // ── Badges de status ──────────────────────────────────────────────
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Realizada
  badgeRealizada: {
    backgroundColor: COLORS.realizadaBg,
    borderColor: COLORS.realizadaBorder,
  },
  badgeTextRealizada: {
    color: COLORS.realizadaText,
  },
  // Cancelada
  badgeCancelada: {
    backgroundColor: COLORS.canceladaBg,
    borderColor: COLORS.canceladaBorder,
  },
  badgeTextCancelada: {
    color: COLORS.canceladaText,
  },
  centroTela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
   },
    textoCarregando: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 12,
    },
    textoErro: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
    },
    btnTentarNovamente: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 28,
    },
    btnTentarNovamenteTexto: {
        color: '#A78BDA',
        fontSize: 14,
        fontWeight: '700',
    },
});

export default styles;