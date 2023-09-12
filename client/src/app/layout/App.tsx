import { ThemeProvider } from "@emotion/react";
import Catalog from "../../features/catalog/Catalog";
import Header from  "../layout/Header";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { useState } from "react";
function App() {
  const [darkMode,setDarkMode]=useState(false);
  const paletteType=darkMode?'dark':'light';
  const theme=createTheme({
    palette:{
      mode:paletteType,
      background:{
        default:paletteType==='dark'?'#121212':'#eaeaea'
      }
    }
  })
  const onSwitchHandler=()=>{
    setDarkMode(!darkMode);
   }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkMode={darkMode} onSwitchHandler={onSwitchHandler}/>
      <Container>
       <Catalog/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
