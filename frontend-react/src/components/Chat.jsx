import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Paper, Box, Typography, TextField, IconButton, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: 'You' }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', { message: currentInput });
      setMessages([...newMessages, { text: response.data.response, sender: 'DOMinators AI' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { text: 'Sorry, an error occurred.', sender: 'DOMinators AI' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '70vh',
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        width: { xs: '100%', sm: '100%', md: '60%' },
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          pr: 1,
          mb: 2,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3f51b5',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#2c2c2c',
          },
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: 'column',
                alignItems: message.sender === 'You' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: '#bbb', mb: 0.5 }}>
                {message.sender}
              </Typography>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: message.sender === 'You' ? '#3f51b5' : '#424242',
                  borderRadius: '12px',
                  padding: '10px 15px',
                  maxWidth: '70%',
                  color: '#fff',
                }}
              >
                <Typography variant="body1">
                  {message.text}
                </Typography>
              </motion.div>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
            backgroundColor: '#2c2c2c',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#424242' },
            '&:hover fieldset': { borderColor: '#3f51b5' },
            '&.Mui-focused fieldset': { borderColor: '#3f51b5' },
            },
            // Increase font size and change color for the input text
            '& .MuiInputBase-input': {
            color: '#fff',
            fontSize: '1.2rem',
            },
            // Style the placeholder text to match the increased font size
            '& input::placeholder': {
            color: '#bbb',
            fontSize: '1.2rem',
            },
        }}
        />

                <IconButton
          onClick={sendMessage}
          sx={{
            ml: 1,
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
            transition: 'background-color 0.3s',
          }}
        >
          <SendIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chat;
