import styled from 'styled-components'
import Image from 'next/image';


const HeaderLogo = () => {
  return (
    <Logo >
      
<Image src="/favicon.ico"
 width={42}
 height={40}
  />
  ANGEL CHAINFUND</Logo>
  );
}

// const StyledLogo = styled(Image)`

// `

const Logo=styled.h1`
font-weight: bold;
font-size:30px;
margin-left:10px;
font-family:'Poppins';
display:flex;
justify-content:space-between;
background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
border-radius:10px;
z-index:2;
`

export default HeaderLogo