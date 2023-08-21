import React, { useState } from "react";
import { useAuth } from './security/AuthContext';
import { IconButton, ListItemButton, ListItemIcon, List} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';
import { Backdrop, CustomDrawer, WhiteListItemText } from "../stylescomp/DrawerStyle";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';


function DrawerComp({onClose, onLogout}) {

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
      {open && <Backdrop onClick={handleDrawerClose} />}
      <CustomDrawer open={open} onClose={handleDrawerClose}>
        <List>
        <ListItemButton component={Link} to={`/Landing/${currentUser.name}`} onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeMaxIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <WhiteListItemText primary="HOME" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/MachinePage" onClick={handleDrawerClose}>
            <ListItemIcon>
              <BuildIcon sx={{ color: "white" }}/>
            </ListItemIcon>
            <WhiteListItemText primary="기계" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/TemperaturePage" onClick={handleDrawerClose}>
            <ListItemIcon>
              <ThermostatIcon sx={{ color: "white" }}/>
            </ListItemIcon>
            <WhiteListItemText primary="온도" />
          </ListItemButton>
          
          <ListItemButton component={Link} to="/Computervision" onClick={handleDrawerClose}>
            <ListItemIcon>
              <ReportGmailerrorredIcon sx={{ color: "white" }}/>
            </ListItemIcon>
            <WhiteListItemText primary="불량품" />
          </ListItemButton>

          <ListItemButton component={Link} to="/Administrator" onClick={handleDrawerClose}>
            <ListItemIcon>
              <StorageIcon sx={{ color: "white" }}/>
            </ListItemIcon>
            <WhiteListItemText primary="관리자 DB" />
          </ListItemButton>
        </List> 

      </CustomDrawer>

    <Tooltip title='로그아웃'>
      <IconButton sx={{ marginLeft: 'auto' }} onClick={onLogout}>
        <LogoutIcon sx={{ color: 'white', borderColor: 'white' }} />
      </IconButton>
    </Tooltip>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto', marginLeft: { xs: 0, md: 'auto' } }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
  
    </React.Fragment>

  )
}

export default DrawerComp