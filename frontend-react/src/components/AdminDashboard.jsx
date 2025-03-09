import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Chat from './Chat';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    university: '',
    category: '',
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBowled: 0,
    runsConceded: 0,
  });
  const [showChat, setShowChat] = useState(false);
  const [showTable, setShowTable] = useState(true); // State to control table visibility

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleAddPlayer = async () => {
    if (!newPlayer.name || !newPlayer.university) {
      alert('Name and University are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/players', newPlayer);
      setPlayers([...players, response.data]);
      setNewPlayer({
        name: '',
        university: '',
        category: '',
        totalRuns: 0,
        ballsFaced: 0,
        inningsPlayed: 0,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'university', headerName: 'University', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'totalRuns', headerName: 'Total Runs', flex: 1, type: 'number' },
    { field: 'ballsFaced', headerName: 'Balls Faced', flex: 1, type: 'number' },
    { field: 'inningsPlayed', headerName: 'Innings Played', flex: 1, type: 'number' },
    { field: 'wickets', headerName: 'Wickets', flex: 1, type: 'number' },
    { field: 'oversBowled', headerName: 'Overs Bowled', flex: 1, type: 'number' },
    { field: 'runsConceded', headerName: 'Runs Conceded', flex: 1, type: 'number' },
  ];

  const handleSpiriterClick = () => {
    setShowChat(!showChat);
    setShowTable(false); // Hide table when showing chat
  };

    const handleTableClick = () => {
        setShowTable(true);
        setShowChat(false); //hide chat when showing table.
    };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Box>
            <Button variant="contained" onClick={handleSpiriterClick} sx={{mr:1}}>
              Spiriter
            </Button>
            {showChat && (
                <Button variant="contained" onClick={handleTableClick}>
                    Table
                </Button>
            )}
          </Box>
        </Box>

        {showChat ? (
          <Chat />
        ) : (
          <>
          {showTable && (
            <>
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', width: '100%' }}>
              <TextField label="Name" variant="outlined" value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} sx={{ flex: '1 1 200px' }} />
              <TextField label="University" variant="outlined" value={newPlayer.university} onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })} sx={{ flex: '1 1 200px' }} />
              <TextField label="Category" variant="outlined" value={newPlayer.category} onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })} sx={{ flex: '1 1 200px' }} />
              <TextField label="Total Runs" type="number" variant="outlined" value={newPlayer.totalRuns} onChange={(e) => setNewPlayer({ ...newPlayer, totalRuns: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <TextField label="Balls Faced" type="number" variant="outlined" value={newPlayer.ballsFaced} onChange={(e) => setNewPlayer({ ...newPlayer, ballsFaced: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <TextField label="Innings Played" type="number" variant="outlined" value={newPlayer.inningsPlayed} onChange={(e) => setNewPlayer({ ...newPlayer, inningsPlayed: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <TextField label="Wickets" type="number" variant="outlined" value={newPlayer.wickets} onChange={(e) => setNewPlayer({ ...newPlayer, wickets: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <TextField label="Overs Bowled" type="number" variant="outlined" value={newPlayer.oversBowled} onChange={(e) => setNewPlayer({ ...newPlayer, oversBowled: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <TextField label="Runs Conceded" type="number" variant="outlined" value={newPlayer.runsConceded} onChange={(e) => setNewPlayer({ ...newPlayer, runsConceded: parseInt(e.target.value, 10) || 0 })} sx={{ flex: '1 1 150px' }} />
              <Button variant="contained" onClick={handleAddPlayer} sx={{ flex: '1 1 100px' }}>Add Player</Button>
            </Box>

            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid rows={players} columns={columns} pageSize={10} sx={{ backgroundColor: 'background.paper' }} />
            </Box>
            </>
          )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;