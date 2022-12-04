import styled from "styled-components"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {App} from '../Layout';
import { useContext} from 'react';
import Wallet from './Wallet'
const HeaderRight = () => {
  
const ThemeToggler=useContext(App);

  return (
   <HeaderRightWrapper>
      <Wallet />
    <ThemeToggle>
      {ThemeToggler.theme==='light'? 
      <DarkModeIcon onClick={ThemeToggler.changeTheme} />:
      <LightModeIcon onClick={ThemeToggler.changeTheme} />}

    </ThemeToggle>
   </HeaderRightWrapper>  )
}
const HeaderRightWrapper=styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-right: 15px;
height:50%;
z-index:1;
`
const  ThemeToggle=styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:${(props)=>props.theme.bgDiv};
height:100%;
padding:5px;
width:45px;
border-radius:12px;
cursor:pointer;
z-index:1;
`
export default HeaderRight