import styled from 'styled-components'
import Image from 'next/image';


const HeaderLogo = () => {
  return (
    <Logo >
      
<Image src="/favicon.ico"
 width={40}
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

background-color: ${(props) => props.theme.bgDiv};
background-color: ${(props) => props.theme.bgSubDiv};
border-radius:10px;
`

export default HeaderLogo