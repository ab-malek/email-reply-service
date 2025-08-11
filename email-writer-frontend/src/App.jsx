import { useState } from 'react'
import './App.css'
import { 
    Box, 
    Typography, 
    TextField, 
    Container,
    Select,
    MenuItem,
    FormControl,
    Button,
    CircularProgress,
    InputLabel 
} from '@mui/material';
import axios from 'axios';

function App() {

  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('friendly');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try{
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }catch (err) {
      console.log("malek");
      setError('Failed to generate reply. Please try again.');
      console.error(err);
    }finally {
      setLoading(false);
    }
  }


  return (
      <Container maxWidth="sm" sx={{py:4}}>
        <Typography variant='h3' component={'h1'} gutterBottom>
          Email reply generator
        </Typography>

        <Box sx={{mx:3}}>
          <TextField
            fullWidth
            multiline
            variant='outlined'
            rows={6}
            label="Original Email"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{mb:2}}/>

            <FormControl fullWidth sx={{mb:2}}>
              <Select 
               value={tone || ''}
               label = "Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">Nono</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled = {!emailContent || loading}>
              {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
                
            </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{mt:2}}>
            {error}
          </Typography>)}


        {generatedReply && (
          <Box sx={{mt:4}}>
            <Typography variant='h5' gutterBottom>
              Generated Reply
            </Typography>
            <TextField
              fullWidth
              multiline
              variant='outlined'
              rows={6}
              value={generatedReply}
              InputProps={{ readOnly: true }}/>

            <Button
              variant="contained"
              sx={{mt:2}}
              onClick={() => navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>

  )
}

export default App
