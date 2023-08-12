import React, { useState } from "react";
import { useAuth } from './security/AuthContext';
import { Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, List} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';

function DrawerComp({onClose}) {

  const authContext = useAuth()
  // 현재 관리자 가져오기
  const currentUser = authContext.currentUser
  const name = authContext.currentUser && authContext.currentUser.name 

  const [open,setOpen] = useState(false)
  
  const handleDrawerClose = () => {
    setOpen(false);
    if (onClose) {
      onClose(); // 부모 컴포넌트에서 전달받은 onClose 실행
    }
  }

  return (
    <React.Fragment>
      <Drawer open={open} onClose={handleDrawerClose}>
        <List>
        <ListItemButton component={Link} to={`/Landing/${currentUser.name}`} onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeMaxIcon />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/MachinePage" onClick={handleDrawerClose}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="기계" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/TemperaturePage" onClick={handleDrawerClose}>
            <ListItemIcon>
              <ThermostatIcon />
            </ListItemIcon>
            <ListItemText primary="온도" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/Computervision" onClick={handleDrawerClose}>
            <ListItemIcon>
              <ReportGmailerrorredIcon />
            </ListItemIcon>
            <ListItemText primary="불량품" />
          </ListItemButton>

          <ListItemButton component={Link} to="/Administrator" onClick={handleDrawerClose}>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="관리자 DB" />
          </ListItemButton>

        </List>
        </Drawer>
      <IconButton sx={{marginLeft:"auto"}} onClick={()=>setOpen(!open)}>
        <MenuIcon color="white"/>
      </IconButton>
    </React.Fragment>

  )
}

export default DrawerComp