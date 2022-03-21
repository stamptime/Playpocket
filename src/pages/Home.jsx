import React , {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Card from '../components/molecules/Card.jsx';


const Home = () => {

  return (
    <HomeView/>
  )

}

const HomeView = () => {
  return (
    <>            
      <Box component="span" sx={{
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        
        <Card className="card-animation"/>

      </Box>
      <AppBar 
        position="absolute" 
        sx={{ 
          top: 'auto', 
          bottom: 0, 
          backgroundColor:"#fff",
          color:"#272c91"}}>

        <Toolbar>

          <Button 
            color="inherit"  
            aria-label="open drawer">

            <PersonOutlineOutlinedIcon/>

          </Button>

          <Box sx={{ flexGrow: 1 }} />

        </Toolbar>
      </AppBar> 
    </>
  )
}

export default Home