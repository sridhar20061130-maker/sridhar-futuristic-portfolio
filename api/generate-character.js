// Optional future API route.
// Keep private API keys on the server, never inside index.html or script.js.

module.exports = function generateCharacter(req, res) {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required." });
  }

  res.json({
    success: true,
    character: {
      name,
      description: `${name} is a futuristic anime-inspired technology explorer.`
    }
  });
};
