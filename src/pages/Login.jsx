import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Wrapper} from '../components/atoms/Container.jsx';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';



const axios = require('axios').default;
//=====================================================



//=====================================================
//Smart component
const Login = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [loginData,setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  

  useEffect(() => {

    if(data){
      if(data.status == 200){

        localStorage.setItem('playground-response',JSON.stringify({

          token: data.data.data.token,
          user_id: data.data.data.id,
          tenant_id: data.data.data.tenant_id,

        }));

        navigate('/home');
      }
    }
  },[data]);


  // Getting user login information
  const changeHandler = ({target}) => {
    setLoginData({
      ...loginData,
      [target.name]: target.value
    })
  }
  
  

  const submitHandler = () => {

    setLoading(true);

    // Fetching access data information
    axios({

      method: 'post', //Getting user data from endpoint:
      url: 'https://playground-course-api.digitalhouse.com/v1/api/auth/native',
      data: {
        username: loginData.email,
        password: loginData.password
      },
      headers: {
        'tenant-id': '7d240b5a-ea77-4488-afdc-64b861c2fd94'
      }

    }).then( res => {
      setLoading(false);
      setData(res);
    })
    .catch( error => {
      setData(error.response);
      setLoading(false)
    });

  }


  return <LoginView loading={loading} changeHandler={changeHandler} submitHandler={submitHandler}/>

}


//=====================================================
//UI component
const LoginView = ({submitHandler,changeHandler,loading}) => {

  return (
      <>
        <Wrapper>
          <Container>
            <img 
              src={Logo} 
              alt="logo" 
              style={{
                margin:"0 0 18px 0",
                width:"200px",
                alignSelf:"center"
              }}
              />
            
            <TextField 
              name="email"
              size="small" 
              label="Email" 
              type="email" 
              onBlur={changeHandler}
              variant="outlined"></TextField>

            <TextField 
              name="password"
              size="small" 
              label="Contraseña" 
              type="password" 
              onBlur={changeHandler}
              variant="outlined"></TextField>

            <Button 
              variant="contained"
              sx={{
                backgroundColor: '#272c91',
              }}
              onClick={submitHandler} 
              >{loading?"Cargando":"Ingresar"}</Button>

          </Container>
        </Wrapper>
      </>
  )
}

export default Login