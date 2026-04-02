const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/fetch-metadata", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing url");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "application/xml,text/xml,*/*",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const body = await response.text();

    res
      .status(response.status)
      .set(
        "Content-Type",
        response.headers.get("content-type") || "application/xml; charset=utf-8"
      )
      .send(body);
  } catch (err) {
    res.status(500).send(`Fetch failed: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
