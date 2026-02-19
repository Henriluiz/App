# 📱 Zenith – Plataforma Mobile de Conexão entre Pacientes e Psicólogos

> Plataforma de intermediação e gestão de fluxo para atendimentos em saúde mental.

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) do curso Técnico em Desenvolvimento de Sistemas da **ETEC de Guaianazes – São Paulo/SP (2025)** 0  

---

## 📌 Sobre o Projeto

O **Zenith** é uma plataforma digital voltada à conexão entre pacientes e psicólogos, com foco na redução de barreiras logísticas, financeiras e geográficas no acesso à saúde mental.

A aplicação mobile foi desenvolvida para:

- Facilitar a busca por psicólogos
- Permitir agendamento dinâmico de sessões
- Organizar histórico e atividades
- Integrar fluxo financeiro
- Centralizar o acesso às sessões via link externo
- Fornecer recursos complementares de apoio emocional

---

## 🎯 Problema

O acesso à saúde mental no Brasil enfrenta:

- Longas filas no SUS  
- Alto custo na rede privada  
- Distâncias geográficas elevadas  
- Processos fragmentados (agenda, pagamento, atendimento separados)

Essa fragmentação gera:
- Insegurança financeira ao profissional
- Evasão terapêutica
- Sobrecarga administrativa

O Zenith surge como um ecossistema integrado para resolver essa lacuna.

---

## 🧠 Objetivo

Desenvolver uma solução digital integrada que centralize:

- 🔎 Busca por profissionais  
- 📅 Agendamento  
- 💳 Fluxo financeiro  
- 🎥 Integração com videoconferência externa  
- 📊 Organização clínica  

---

## 🏗 Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- React Navigation

---

## 📱 Funcionalidades (Mobile)

### 👤 Paciente
- Cadastro
- Login
- Pesquisa de psicólogos
- Visualização de perfil profissional
- Agendamento
- Histórico de sessões
- Chat
- Acesso ao link de videoconferência
- Carteira virtual

### 🧑‍⚕️ Psicólogo
- Cadastro profissional
- Edição de perfil
- Histórico de atendimentos
- Controle de sessões
- Carteira financeira
- Chat com paciente

---

## 🖼️ Imagens

> Substitua pelos prints reais dentro da pasta `/assets/readme/`

### Tela de Login
![Tela de Login](assets/readme/login.png)

### Tela Inicial
![Tela Inicial](assets/readme/home.png)

---

## 🚀 Como Rodar o Projeto

### ⚠️ Instale da seguinte forma, para não ter erro:

```bash
git pull
rm -rf node_modules
npm ci
npx expo start -c
```

---
### 📦 Sempre que alguém adicionar uma dependência:

```
npx expo install nome-da-dependencia
```

Isso evita conflitos de versão com o SDK do Expo.

---
### 📂 Estrutura Base do Projeto

```
/src/page
  /screens
  /navigation
  /services
  /assets
App.js
```
---
### 🔒 Conformidade e Segurança
#### A proposta do projeto considera:
- LGPD
- Resolução CFP 04/2020
- Sigilo ético profissional
- Minimização de vazamento financeiro
- Redução de no-shows via sistema estruturado

---
### 👥 Equipe
#### Este trabalho conta com uma equipe de 8 integrantes; entretanto, a versão exclusiva Mobile foi desenvolvida por:

- André César Chaves
- João Pedro Ribeiro Barros
- Luiz Henrique Paulino Azevedo

---
### 🏫 Instituição
ETEC de Guaianazes – São Paulo/SP
Curso Técnico em Desenvolvimento de Sistemas – 2025-2026 (1,5 ano)

