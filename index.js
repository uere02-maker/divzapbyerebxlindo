const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const fs = require("fs-extra")

const DB_FILE = "./data.json"

function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeJsonSync(DB_FILE, { contatos: [], links: [] })
    }
    return fs.readJsonSync(DB_FILE)
}

function saveDB(data) {
    fs.writeJsonSync(DB_FILE, data)
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true // 🔥 IMPORTANTE (mostra QR no Railway)
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const texto =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        const from = msg.key.remoteJid

        let db = loadDB()

        // salva contato
        if (!db.contatos.includes(from)) {
            db.contatos.push(from)
        }

        // =====================
        // COMANDO /entrar
        // =====================
        if (texto.startsWith("/entrar")) {
            const link = texto.split(" ")[1]

            if (!link || !link.includes("chat.whatsapp.com")) {
                await sock.sendMessage(from, { text: "Envie um link válido de grupo!" })
                return
            }

            db.links.push(link)
            saveDB(db)

            await sock.sendMessage(from, { text: "✅ Link salvo!" })
        }

        // =====================
        // COMANDO /bc
        // =====================
        if (texto.startsWith("/bc")) {
            const dono = "SEUNUMERO@s.whatsapp.net" // 🔥 TROCA AQUI

            if (from !== dono) {
                await sock.sendMessage(from, { text: "❌ Sem permissão!" })
                return
            }

            const mensagem = texto.replace("/bc ", "")

            await sock.sendMessage(from, { text: "🚀 Enviando broadcast..." })

            for (let contato of db.contatos) {
                try {
                    await sock.sendMessage(contato, { text: mensagem })
                    await new Promise(r => setTimeout(r, 3000)) // 🔥 delay anti-ban
                } catch (e) {}
            }

            await sock.sendMessage(from, { text: "✅ Broadcast finalizado!" })
        }

        saveDB(db)
    })
}

// inicia bot + painel
startBot()
require("./server")