import styled from 'styled-components'; 
import { Drawer, ListItemText} from "@mui/material";

export const CustomDrawer = styled(Drawer)` 
  & .MuiPaper-root { 
    background-color: #616161; 
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

export const WhiteListItemText = styled(ListItemText)`
  color: white;
`;
