const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app's build directory
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Catch-all handler to serve the React app for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start the HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
