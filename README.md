# 🤖 DIV ZAP BYERE BX LINDO

Sistema de automação para WhatsApp com comandos de captura de links e envio de mensagens em massa.

---

## 🚀 Funcionalidades

✅ Comando `/entrar` para salvar links de grupos  
✅ Comando `/bc` para envio de mensagens (broadcast)  
✅ Painel web simples  
✅ Armazenamento local (JSON)  
✅ Sistema básico anti-ban (delay automático)

---

## 📦 Estrutura do Projeto
📁 bot/
 ├── index.js        # Bot principal (comandos e lógica)
 ├── server.js       # Servidor web (painel)
 ├── package.json    # Dependências do projeto
 ├── data.json       # Banco de dados (auto gerado)
 └── auth/           # Sessão do WhatsApp (auto gerado)
⚙️ Instalação
INSTALAR DEPENDENCIAS npm install
INICIAR O BOT npm start

📱 Como conectar o WhatsApp
	1.	Após iniciar, abra os logs do servidor
	2.	Um QR Code será exibido
	3.	No celular, abra o WhatsApp
	4.	Vá em Aparelhos conectados
	5.	Escaneie o QR Code

💬 Comandos disponíveis
/entrar https://chat.whatsapp.com/xxxxx
/bc Sua mensagem aqui

🔐 Configuração
Edite no arquivo index.js:const dono = "SEUNUMERO@s.whatsapp.net"
✔️ Exemplo: 5511999999999@s.whatsapp.net

🌐 Painel Web

Após iniciar, o painel estará disponível no navegador:
	•	Mostra total de contatos
	•	Mostra links salvos
	•	Endpoint: /links retorna lista em JSON

📊 Banco de Dados
data.json
{
  "contatos": [],
  "links": []
}

⚠️ Boas práticas (IMPORTANTE)
	•	❌ Não usar para spam massivo
	•	❌ Não enviar mensagens em excesso
	•	❌ Não automatizar entrada em grupos

✔️ Recomendado:
	•	Usar com contatos autorizados
	•	Enviar mensagens com intervalo
	•	Trabalhar com listas qualificadas

⸻

🛠️ Tecnologias utilizadas
	•	Node.js
	•	Baileys (WhatsApp Web API)
	•	Express
	•	fs-extra

AUTOR 👑
BY ERE BX LINDO