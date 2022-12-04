import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderNav = () => {
  const Router = useRouter();

  return (<NavBetween>
    <HeaderNavWrapper>
      <Link passHref href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false} >
       Home
      </HeaderNavLinks></Link>
      <Link passHref href={'/createcampaign'}><HeaderNavLinks active={Router.pathname == "/createcampaign" ? true : false} >
     What we do
      </HeaderNavLinks></Link>
      {/* <Link passHref href={'/whoweare'}><HeaderNavLinks active={Router.pathname == "/whoweare" ? true : false} >
    Who we Are
      </HeaderNavLinks></Link> */}
      <Link passHref href={'/project'}><HeaderNavLinks     active={Router.pathname == "/dashboard" ? true : false} >
Projects
</HeaderNavLinks></Link>
    </HeaderNavWrapper>
 
    <Link passHref href={'/dashboard'}><DonateNAVLinks active={Router.pathname == "/dashboard" ? true : false} >
Donate Now
      </DonateNAVLinks></Link>
      </NavBetween>
  )
}


const NavBetween =styled.div`
display : flex;
justify-content:space-between;
align-items : center;
width: 30%;
z-index:2;

`;
const DonateNAVLinks=styled.div`

display: flex;
justify-content:center;
align-items: center;
text-align: center;
padding: 6px;
gap: 10px;
font-family:Roboto, sans-serif;
position: relative;
width: 149px;
height: 35px;
right:-10%;
top: 3%;
cursor: pointer;
font-weight: bold;
background: linear-gradient(99.86deg, #FA709A -41.71%, #F8D003 66.36%);
border-radius: 29px;

`;
const HeaderNavWrapper =styled.div`
display:flex;
justify-content:space-between;
align-items:center;
background-color:${(props)=>props.theme.bgDiv};
padding:6px;
height:50%;  
border-radius:10px;
z-index:1;
`
const HeaderNavLinks=styled.div`
z-index:1;
display: flex;
align-items: center;
justify-content: space-between;
background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
height: 100%;
font-family: 'Roboto';
margin: 5px;
border-radius: 10px;
padding:6px;
cursor: pointer;
width:max-content;
text-transform: uppercase;
font-weight: bold;
font-size: small;

`

export default HeaderNav