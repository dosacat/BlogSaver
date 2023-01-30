import './App.css';
import { Container,Card,Grid} from '@mui/material';

import Display from './components/display';
import Login from './components/login';
import Footer from './components/footer';
import {Typography, AppBar} from '@mui/material';

function App() {
  
return (
  <Container>
    <AppBar position="static" sx={{p:2, backgroundColor: '#9C27B0'}}>
      <Typography variant="h5" sx={{p:1}}>Curate.io</Typography>
      <Typography variant="h7" xs={{p:1}}>content curation for your audience</Typography>
    </AppBar>
    <Login/>
    <Display/>
    <Footer/>

  
    
    
  </Container>
)
    
}

export default App;
