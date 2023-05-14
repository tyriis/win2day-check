import * as cheerio from "cheerio"
const WIN2DAY_USER = process.env.WIN2DAY_USER || null
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || null
const DISCORD_PARAMS = {
  username: "win2day",
  content: `Winner of the day: ${WIN2DAY_USER}`,
  embeds: [
    {
      image: {
        url: "https://media.tenor.com/N_i-uDPGLEgAAAAC/feest-emoji.gif",
      },
    },
  ],
}

try {
  let result = await fetch("https://www.win2day.at/gewinner-des-tages")
  const $ = cheerio.load(await result.text())
  let winner = $("table.table-jackpotwinner tbody tr:first td:first").text()
  // console.log(winner)
  if (
    WIN2DAY_USER !== null &&
    WIN2DAY_USER === winner &&
    DISCORD_WEBHOOK !== null
  ) {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(DISCORD_PARAMS),
    })
    console.log(`today you have won :)`)
  } else {
    console.log(`today ${winner} has won :/`)
  }
} catch (err) {
  console.log("Unable to fetch -", err)
}
