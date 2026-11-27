const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/api/generate', async (req, res) => {
  const { text, voice } = req.query;

  if (!text || !voice) {
    return res.status(400).json({ success: false, message: 'Text and voice are required' });
  }

  // ✅ YOUR NEW API ENDPOINT
  const targetUrl = `https://api.omegatech.app/api/ai/text-to-speech2?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ success: false, message: 'Failed to connect to the API' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
