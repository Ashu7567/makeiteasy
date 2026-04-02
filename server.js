const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));

app.get("/fetch-metadata", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing url");
  }

  try {
    const r = await fetch(targetUrl, {
      headers: {
        Accept: "application/xml,text/xml,*/*",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await r.text();
    res.set("Content-Type", r.headers.get("content-type") || "application/xml; charset=utf-8");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).send(`Fetch failed: ${e.message}`);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
