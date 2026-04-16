const express = require("express")
const fs = require("fs-extra")

const app = express()

const PORT = process.env.PORT || 3000

app.get("/", async (req, res) => {
    let data = { contatos: [], links: [] }

    if (fs.existsSync("./data.json")) {
        data = await fs.readJson("./data.json")
    }

    res.send(`
        <h1>🤖 PAINEL BOT</h1>
        <p>📱 Contatos: ${data.contatos.length}</p>
        <p>🔗 Links: ${data.links.length}</p>
    `)
})

app.get("/links", async (req, res) => {
    if (!fs.existsSync("./data.json")) {
        return res.json([])
    }

    const data = await fs.readJson("./data.json")
    res.json(data.links)
})

app.listen(PORT, () => console.log("🌐 Painel rodando na porta " + PORT))