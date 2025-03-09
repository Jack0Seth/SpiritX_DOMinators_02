const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json()); // Allow JSON data in requests

// POST route to add a player
app.post('/api/players', async (req, res) => {
  try {
    const { name, team, runs, wickets } = req.body;
    
    if (!name || !team) {
      return res.status(400).json({ error: 'Name and Team are required' });
    }

    const newPlayer = {
      name,
      team,
      runs: runs || 0,
      wickets: wickets || 0,
    };

    const docRef = await db.collection('players').add(newPlayer);
    res.status(201).json({ id: docRef.id, ...newPlayer });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ error: 'Failed to add player' });
  }
});

// GET route to retrieve players
app.get('/api/players', async (req, res) => {
  try {
    const snapshot = await db.collection('players').get();
    const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
