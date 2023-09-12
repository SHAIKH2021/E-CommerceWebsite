import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";
interface Props{
    darkMode:boolean;
    onSwitchHandler:()=>void;
}
const Header=({darkMode, onSwitchHandler}:Props)=>{
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">
                    E-Commerce Website
                </Typography>
                <Switch checked={darkMode} onChange={onSwitchHandler}/>
            </Toolbar>
        </AppBar>
    )
}
export default Header;