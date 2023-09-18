import { ThemeProvider } from "@emotion/react";
import Header from  "../layout/Header";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import { useAPPDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/BasketSlice";
function App() {
  // const {setBasket}=useStoreContext();
  const dispatch =useAPPDispatch();
  const [loading,setLoading]=useState(true);
  const [darkMode,setDarkMode]=useState(false);
  useEffect(()=>{
    const buyerId= getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
         .then(basket=>dispatch(setBasket(basket)))
         .catch(error=>console.log(error))
         .finally(()=>setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[dispatch])


  const paletteType=darkMode?'dark':'light';
  const theme=createTheme({
    palette:{
      mode:paletteType,
      background:{
        default:paletteType==='dark'?'#121212':'#eaeaea'
      }
    }
  })
  if(loading) return <h2>Initilizing app...</h2>
  const onSwitchHandler=()=>{
    setDarkMode(!darkMode);
   }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkMode={darkMode} onSwitchHandler={onSwitchHandler}/>
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
