import React, { useState } from "react";
import { Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, List} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function DrawerComp() {
  const [open,setOpen] = useState(false)
  return (
    <>
      <Drawer open={open} onClose={()=>setOpen(false)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                HOME
                기계
                온도
                관리자DB
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        </Drawer>
      <IconButton sx={{marginLeft:"auto"}} onClick={()=>setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>

  )
}

export default DrawerComp