import Header from './Header';
import Themes from './Themes';

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState, createContext } from "react";

const App=createContext();//use of context api
const Layout = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  }
  return (
    
    <App.Provider value={{changeTheme, theme}}>
      {/* use of context api */}
      
    <ThemeProvider theme={Themes[theme]}>
   
      <LayoutWrapper >
        <GloabalStyle />
        <Header />
        {children}
      </LayoutWrapper>
    </ThemeProvider>
    </App.Provider>
  )
}
const GloabalStyle = createGlobalStyle`
 body {
  margin:0;
  padding:0;
  overflow-x:hidden;
 }
`;
const LayoutWrapper = styled.div`
min-height:100vh;
background-color:${(props) => props.theme.bgColor};
background-image:${(props) => props.theme.bgImage};
color:${(props) => props.theme.color};
`;


export default Layout;
export { App};//use of context api