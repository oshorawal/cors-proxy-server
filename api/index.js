// const express = require("express");
// const axios = require("axios");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Define a route to handle CORS requests and proxy to the target URL
// app.get("/api", async (req, res) => {
//   try {
//     const targetURL = req.query.url; // Get the URL to proxy from the query parameters
//     console.log(targetURL);
//     const response = await axios.get(targetURL, {
//       headers: {
//         // Set the CORS headers to allow all origins (adjust as needed)
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       },
//     });

//     res.send(response.data);
//   } catch (error) {
//     console.error("Proxy Error:", error);
//     res.status(500).send("Proxy Error (((((( (((((( ))))))))");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Proxy server is running on port ${PORT}`);
// });

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route to handle CORS requests and proxy to the target URL
app.use("/api", allowCors); // Add this middleware to the /api route

app.use(express.json());

// Your existing CORS middleware
function allowCors(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
}

// Define a route to handle the proxying
app.get("/api", async (req, res) => {
  try {
    const targetURL = req.query.url; // Get the URL to proxy from the query parameters
    console.log(targetURL);
    const response = await axios.get(targetURL);

    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).send("Proxy Error (((((( (((((( ))))))))");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});


