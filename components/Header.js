import HeaderLogo from './Sub_Components/HeaderLogo'
import HeaderNav from './Sub_Components/HeaderNav'
import HeaderRight from './Sub_Components/HeaderRight'
import styled from 'styled-components'
import Head from 'next/head'
import Image from 'next/image'
const Header = () => {
  return (
    <div>
    <Head>
      <title>Angel_ChainFund</title>
      <meta property="og:title" content="Angel_ChainFund" key="title"  href="images/favicon.ico"/>
    </Head>
   

    <HeaderWrapper>
      <HeaderLogo/>
      <HeaderNav/>
      <HeaderRight/>
    </HeaderWrapper>
    </div>
  )
}
const HeaderWrapper= styled.div`
width:100%;
height:70px;
background: rgba(0,0,0,0.4);
display:flex; 
justify-content:space-between;
align-items:center;`
export default Header 