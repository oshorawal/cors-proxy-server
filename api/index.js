const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define a route to handle CORS requests and proxy to the target URL
app.get("/api", async (req, res) => {
  try {
    const targetURL = req.query.url; // Get the URL to proxy from the query parameters
    console.log(targetURL);
    const response = await axios.get(targetURL, {
      headers: {
        // Set the CORS headers to allow all origins (adjust as needed)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).send("Proxy Error (((((( (((((( ))))))))");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});

