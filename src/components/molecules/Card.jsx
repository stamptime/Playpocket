import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const Card = () => {

  const [data, setData] = useState(false);
  const [templateData, setTemplateData] = useState(false);  

  const [actualClass, setActualClass] = useState(false);
  const [nextClass, setNextClass] = useState(false); 
  
  // Loaders states
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const storedData = JSON.parse(localStorage.getItem('playground-response'));


  const normalizeData = ({data}) => {

    if(data){

      if(data.code== 200){
        console.log(data)
        const asignaturesList = data.data
        
        const templateData = asignaturesList
        .filter(asignature => asignature.lesson.nextOnSite != null)
        .map(asignature => {return({
          
          id: asignature.id,
          name: asignature.name,
          alias: asignature.alias,
          lesson: asignature.live_class_url,
          date: asignature.lesson.nextOnSite,

        })})
        
        setTemplateData(templateData);

      }

    };

  }

  const getActualClass = (templateData) => {
    
    // const templateData = [
    //   {date: new Date(2022,2,19,12,0,0), name: "Matematicas"},
    //   {date: new Date(2022,2,19,13,27,0), name: "Sociales"},
    //   {date: new Date(2022,2,19,14,0,0), name: "Lenguaje"},
    // ]

    try{

      const resultData = templateData
      .filter(asignature => new Date(asignature.date) < new Date())
      .sort((a,b) => new Date(b.date) - new Date(a.date))
  
      resultData[0]['status'] = "now"
      setActualClass(resultData[0]);

    }catch(error){

      setActualClass(false);

    }
    
  }

  const getNextClass = (templateData) => {

    // const templateData = [
    //   {date: new Date(2022,2,19,12,0,0), name: "Matematicas"},
    //   {date: new Date(2022,2,19,13,27,0), name: "Sociales"},
    //   {date: new Date(2022,2,19,14,0,0), name: "Lenguaje"},
    // ]

    const resultData = templateData
    .filter(asignature => new Date(asignature.date) >= new Date())
    .sort((a,b) => new Date(a.date) - new Date(b.date))

    resultData[0]['status'] = "next";
    setNextClass(resultData[0]);
    
  }

  const handleReloadClick = () => {
    setReload(true);
  }

// Getting de data

  useEffect(() => {

    setLoading(true);
    setReload(false);

    axios.get("https://playground-course-api.digitalhouse.com/v1/api/students/ad189324-5321-45b7-8d64-bdd0fe025e41/enrolments",
    {
      headers:{
        'tenant-id': storedData.tenant_id,
        authorization: storedData.token
      }
    })
    .then(res => {
      setData(res);
    })
    .catch(err => {
      setData(err.response);
    })    

  }, [reload])

// Manipulating data

  useEffect(()=> {

    // Find the next class
    if(templateData){ 

      getActualClass(templateData);
      getNextClass(templateData);

      setLoading(false);

    }else{      

      normalizeData(data);

    }

  },[data,templateData])


  const handleClick = (classid, url) => {
    if(url!=undefined && classid!=undefined){
      window.open(url, '_blank')
      axios.post(`https://playground-course-api.digitalhouse.com/v1/api/students/${storedData.user_id}/courses/${classid}/attendance`,{},{
        headers:{
          'tenant-id': storedData.tenant_id,
          authorization: storedData.token
        }
      }).then(res => console.log('Asistencia registrada correctamente')).catch(err => console.log('ocurrio un error al marcar asistencia'))
  
    };
  
  }


  return (
    <>
      <CardView handleClick={handleClick} nextClass={nextClass} actualClass={actualClass}/>
    </>
  )

}



const CardView = ({handleClick, nextClass, actualClass}) => {

  const resultClass = actualClass ? actualClass : nextClass;



  return (
      <>
        <Box component="span" sx={{
            
            position:"absolute",
            boxSizing: "border-box",
            padding:"20px 30px 20px 30px",
            width: '350px', 
            top:"32", 
            justifyContent: "space-between",
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(to right, #000872, #0080ce)',
            borderRadius: '10px',
            boxShadow: '3px 5px 10px #ccc',
            
        }}>
            <div>

                <Typography variant="subtitle1" component="h2" sx={{

                color: 'white',
                fontWeight: '',

                }}>{resultClass.status=="now"?'En curso':'Siguiente clase' || ""}</Typography>

                <Typography variant="h5" component="div" sx={{

                  color: 'white',
                  fontWeight: 'bold',

                }}>{resultClass.alias || "❤"}</Typography>

            </div>  

              <Button onClick={() => handleClick(resultClass.id,resultClass.lesson)} variant="contained" color="secondary" sx={{ 
                backgroundColor: '#4f23a1',
              }}>{resultClass && "Ir a la reunion"}</Button>
              

              <Button size="small" color="primary" variant="outlined" sx={{
                position: 'absolute',
                borderRadius: '25px',
                border: '1px solid #06ff00',
                padding:'0 10px',
                right: '10',
                top:'10',
                color: '#fff',
              }}>

                {/* <RestartAltOutlinedIcon />  */}
                {resultClass && new Date(resultClass.date).toLocaleString()}

              </Button>
        </Box>

      </>
  )

}

export default Card