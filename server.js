const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve your HTML file
app.use(express.static(__dirname));

// Backend route to proxy the API request
app.get('/api/generate', async (req, res) => {
  const { text, voice, language } = req.query;

  if (!text) {
    return res.status(400).json({ success: false, message: 'Text is required' });
  }

  const targetUrl = `https://api.omegatech.app/api/ai/text2speech-v3?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&language=${encodeURIComponent(language)}`;

  try {
    // Node.js native fetch (available in Node 18+, which Render uses)
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'Failed to reach API' });
  }
});

// Catch-all to serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
