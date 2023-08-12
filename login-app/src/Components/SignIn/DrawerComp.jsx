import React, { useState } from "react";
import { Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, List} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';

function DrawerComp() {
  const [open,setOpen] = useState(false)
  return (
    <React.Fragment>
      <Drawer open={open} onClose={()=>setOpen(false)}>
        <List>
        <ListItemButton>
            <ListItemIcon>
              <HomeMaxIcon />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="기계" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <ThermostatIcon />
            </ListItemIcon>
            <ListItemText primary="온도" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="관리자 DB" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <ReportGmailerrorredIcon />
            </ListItemIcon>
            <ListItemText primary="불량품" />
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