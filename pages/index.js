import styled from 'styled-components'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import PaidIcon from '@mui/icons-material/Paid'
import EventIcon from '@mui/icons-material/Event'
import Image from 'next/image'
import { ethers } from 'ethers'
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Index({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
  Covid_19Data,
  AccidentData,
  getLatestCampaign
}) {
  const [latest, setLatest] = useState(getLatestCampaign)
  const Router = useRouter()

  return (
    <HomeWrapper>
      {/* Filter Section */}
      <ImageWrap>
        <Image
          fill
          src={`/covid_2.jpg`}
          width={1600}
          height={790}
          objectFit="cover"
        />
        <BlackFilter></BlackFilter>
        <NeedHelp>Need Help....</NeedHelp>
        <NeedHeading>Finding Hopes in Humanity</NeedHeading>
        <LastHeading>
          Be the reson for someone{' '}
          <span style={{ color: '#FFFF00' }}>smile</span> today
        </LastHeading>
        <Link passHref href={'/dashboard'}>
          <DonateNAVLinks
            active={Router.pathname == '/dashboard' ? true : false}
          >
            Donate Now
          </DonateNAVLinks>
        </Link>

        <WeCan>We can Save the future</WeCan>
        <BorderLine>
          <Image src="/v-3.png" height={170} width={370} />
        </BorderLine>
      </ImageWrap>

      {/* about US */}
      <AboutUs>
        <Rightside>
          <Head_one>About Us</Head_one>
          <Head_two>You Can Help them</Head_two>
          <Description>
         
            <p>
              We have Created a Platform which would transform the World as we
              Are moving Towards Metaverse so we have implemented secure
              platform in blockchain and only to verified user will raise the
              funds and as we saw during Covid-19 there were lot of scams were
              happenning earlier in milap and keeto platform and there are other
              platform were also there So we have come to the solution we have
              ................
            </p>
          </Description>

          <ReadMore>
            Read More
          </ReadMore>
          <Smile>
          😀
            </Smile>
   
        </Rightside>

        <Leftside>
          <Handshake>
          🤝
          </Handshake>

          <Img_one>
            <Image
              fill
              src={`/a_2.png`}
              width={282}
              height={385}
              objectFit="cover"
            />
          </Img_one>

          <Img_two>
            <Image
              fill
              src={`/a_1.png`}
              width={246}
              height={341}
              objectFit="cover"
            />
          </Img_two>
        </Leftside>
      </AboutUs>


      <Foundation>
        <Ribone_one></Ribone_one>
        <Ribone_two></Ribone_two>
        <Ribone_three></Ribone_three>
        <Ribone_four></Ribone_four>
        <Ribone_five></Ribone_five>
        <Ribone_six></Ribone_six>
        <Ribone_seven></Ribone_seven>

        <Writting>
<Head_wone>Angel Chainfund Foundation</Head_wone>
<W_content>We are charity non-profit funding organisations
  Our activities are taken place around the world
</W_content>
        </Writting>
      </Foundation>

{/*     
<Urgent_case onLoad={() => setLatest(getLatestCampaign)}>

{latest.map((e) => {
  return (
    <kard key={e.title}>
  <U_head>Urgent Causes</U_head>
     <U_one_img>
    <Image  layout="fill"
                  alt="Crowdfunding dapp"
                  objectFit="cover"
                  src={'https://crowdfunding.infura-ipfs.io/ipfs/' + e.image}
                />
    </U_one_img>
    <U_one_title>{e.title}</U_one_title>
    <U_one_desc></U_one_desc>
    <U_one_amount>{e.amount} Matic to be Raised</U_one_amount>
    <Link passHref href={'/' + e.address}>
      <Button>Donate Now</Button>
              </Link>
  <U_fill>
  </U_fill></kard>
  )
})}
</Urgent_case> */}


   
    </HomeWrapper>
  )
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL,
  )

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider,
  )

  const getAllCampaigns = contract.filters.campaignCreated()
  const AllCampaigns = await contract.queryFilter(getAllCampaigns)
  const AllData = AllCampaigns.map((e) => {
 
    return {
      title: e.args.title,
      
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

const   getLatestCampaign= AllData.map((e) =>
{
const lat=[];
let fst_min=Math.min(new Date().getTime()-new  Date(e.timeStamp).getTime(),new Date().getTime())
let sec_min=Math.min(fst_min-new  Date(e.timeStamp).getTime(),fst_min)
if(fst_min||sec_min)
lat.push(e);
return lat;
}
)
  const getHealthCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    'Health',
  )
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns)
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

  const getEducationCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    'education',
  )
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns)
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

  const getAnimalCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    'Animal',
  )
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns)
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

  const getCovid_19_Campaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    'Covid-19',
  )
  const Covid_19_Campaigns = await contract.queryFilter(getCovid_19_Campaigns)
  const Covid_19Data = Covid_19_Campaigns.map((e) => {
    return {
      title: e.args.title,
      
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

  const getAccident_Campaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    'Accident',
  )
  const Accident_Campaigns = await contract.queryFilter(getAccident_Campaigns)
  const AccidentData = Accident_Campaigns.map((e) => {
    return {
      title: e.args.title,
      
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    }
  })

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
      Covid_19Data,
      AccidentData,
      getLatestCampaign
    },
  }
}

// background: rgba(0,0,0,0.4);

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
  z-index: 1;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
  z-index: 1;
`
const CardsWrapper = styled.div`
  display: flex;
  z-index: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  z-index: 1;
  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  z-index: 1;
`
const Title = styled.h2`
  z-index: 1;
  font-family: 'Roboto';
  font-size: 28px;
  margin: 2px 0px;

  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const Titlee = styled.h2`
  font-family: 'Roboto';
  font-size: 25px;
  margin: 2px 0px;
  width: 290px;
  z-index: 1;
  position: relative;
  background-color: ${(props) =>
    props.active ? props.theme.bgSubDiv : props.theme.bgDiv};

  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-left: 6%;
  border-radius: 8px;
  margin-top: 15px;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  z-index: 1;
  cursor: pointer;
`
const Text = styled.p`
  display: flex;
  z-index: 1;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.div`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  z-index: 1;
  font-weight: bold;
`
// image wrap home
const ImageWrap = styled.span`
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  & > span {
    position: relative;
    z-index: 0;
  }
`
const NeedHelp = styled.div`
  position: absolute;
  z-index: 2;
  width: 281px;
  height: 48px;
  left: 24px;
  top: 21%;
  font-family: 'Rock Salt';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 48px;
  color: #ffffff;
`

const NeedHeading = styled.div`
  width: 600px;
  height: 192px;
  top: 29%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 84px;
  line-height: 92px;
  left: 24px;

  background: linear-gradient(90deg, #f6d365 0%, #fda085 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: absolute;

  padding: 0px;
  gap: 35px;

  text-align: center;
  z-index: 2;
`
const LastHeading = styled.div`
  position: absolute;
  width: 269px;
  height: 19px;
  z-index: 2;
  left: 195px;
  font-family: 'Roboto';
  top: 57%;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  /* identical to box height */

  color: #ffffff;
`

const DonateNAVLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 11px 22px;
  gap: 10px;
  z-index: 2;
  position: absolute;
  width: 199px;
  height: 95px;
  left: 235px;
  top: 65%;

  background: linear-gradient(90deg, #fa709a -64.53%, #fee140 173.84%);
  box-shadow: 0px 12px 8px rgba(0, 0, 0, 0.25);
  border-radius: 54px;

  // font size

  height: 23px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 23px;

  color: #ffffff;
  cursor: pointer;
`

const WeCan = styled.div`
  position: absolute;
  width: 430px;
  height: 228px;
  left: 1015px;
  top: 155px;

  font-family: 'Rock Salt';
  font-style: normal;
  font-weight: 400;
  font-size: 84px;
  line-height: 112px;

  color: rgba(255, 255, 255, 0.84);
`
const BorderLine = styled.div`
  position: absolute;
  width: 533.94px;
  height: 110.33px;
  left: 1006px;
  top: 362px;
`
const BlackFilter = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  height: 750px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  animation: sidein 4s ease-out 2s 1 normal;
  animation-fill-mode: forwards;
  @keyframes sidein {
    0% {
      width: 0px;
    }
    100% {
      width: 751px;
    }
  }
`

//------------------------------ css for about Us section
const AboutUs = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`
const Leftside = styled.div`
left:26%;

`
const Rightside = styled.div``
//left side
const Handshake = styled.div`
  position: absolute;
  left: 8.38%;
  right: 91.25%;
  top: 9%;
  transform: scale(2.8);
  width: 45px;
  height: 60px;
 
`
const Img_one = styled.span`
  position: absolute;
  width: 282px;
  height: 385px;
  left: 10%;
  top: 150px;

  & > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
const Img_two = styled.span`
  position: absolute;
  width: 246px;
  height: 341px;
  left: 24%;
  right:70%;
  top: 260px;
  & > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
//Right side
const Head_one = styled.div`
  position: absolute;
  width: 354px;
  height: 38px;
  right:149px;
  top: 200px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  color: #fe4911;
`
const Head_two = styled.div`
  position: absolute;
  width: 365px;
  height: 112px;
  right: 138px;
  top: 239px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
`
const Smile = styled.div`
  position: absolute;
  right: 9.84%;
  top: 610px;
width:19px;
height:19px;

transform: scale(1.8);

  `
const Description = styled.p`
  position: absolute;
  width: 337px;
  height: 105px;
  right: 172px;
  top: 336px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
`
const ReadMore = styled.div`
top: 577px;
position: absolute;
width: 78px;
height: 19px;
right: 431px;
border-bottom: 1px solid #FE4911;
padding: 0 0 4px;
font-family: 'Roboto';
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 19px;

`
const Foundation = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height:100vh;

`
const Writting = styled.div`
display: flex;
position:relative;
flex-direction: column;
align-items: flex-start;
padding: 64px;
gap: 32px;
width: 673px;
    height: 212px;
    left: 154px;
    top: 200px;
background: linear-gradient(90deg, #F6D365 0%, #FDA085 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 8px;
`
const Ribone_one=styled.div
`
position: absolute;
left: 0;
right: 52.22%;
top: 266.38%;
bottom: -181.72%;
background: linear-gradient(90deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);


`


const Ribone_two=styled.div
`
position: absolute;
left: 10.12%;
right: 32.1%;
top: 272.25%;
bottom: -188.58%;
background: linear-gradient(90deg, #84FAB0 0%, #8FD3F4 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);
`

const Ribone_three=styled.div
`
position: absolute;
    left: 3.12%;
    right: 32.1%;
    top: 290.25%;
    bottom: -204.58%;

background: linear-gradient(90deg, #96FBC4 0%, #F9F586 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);


`

const Ribone_four=styled.div
`
position: absolute;
left: 43.09%;
right: 17.13%;
top: 273.57%;
bottom: -188.9%;
background: linear-gradient(90deg,#6A11CB 0%,#2575FC 100%);
background: linear-gradient(90deg,#6A11CB 0%,#2575FC 100%);
box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
border-radius: 100px;
-webkit-transform: rotate(-16deg);
-ms-transform: rotate(-16deg);
transform: rotate(-16deg);
`

const Ribone_five=styled.div
`
position: absolute;
left: 65.84%;
right: -4.61%;
top: 227.11%;
bottom: -142.45%;


background: linear-gradient(90deg, #A1C4FD 0%, #C2E9FB 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);

`

const Ribone_six=styled.div
`

position: absolute;
left: 70.96%;
right: -4.73%;
top: 240.98%;
bottom: -156.32%;

background: linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);


`

const Ribone_seven=styled.div
`
position: absolute;
left: 75.9%;
right: -3.68%;
top: 255.2%;
bottom: -171.53%;
background: linear-gradient(90deg, #92FE9D 0%, #00C9FF 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;
transform: rotate(-16deg);

`
const Head_wone = styled.div`

width: 440px;
height: 48px;

font-family: 'Abhaya Libre ExtraBold';
font-style: normal;
font-weight: 800;
font-size: 35px;
line-height: 48px;
/* identical to box height, or 137% */

text-align: center;

color: #FFFFFF;

flex: none;
order: 0;
flex-grow: 0;

`
const W_content = styled.div`

width: 506px;
height: 64px;

font-family: 'Abhaya Libre';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 32px;


color: #FFFFFF;


flex: none;
order: 1;
flex-grow: 0;

`
// ---------------------Urgent Causes 
const Urgent_case = styled.div`
height:100vh;
width: 100%;
`

const U_head = styled.div`
position: absolute;
width: 157px;
height: 23px;
left: 47px;
top: 2038px;
font-family: 'Roboto';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 23px;
`

const U_one = styled.div`

position: absolute;
width: 481px;
height: 221px;
left: 407px;
top: 1962px;

background: rgba(207, 203, 194, 0.45);
box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25);
border-radius: 6px 0px 0px 6px;
`

const U_two = styled.div`

`

const U_fill = styled.div`

`

const U_one_img = styled.span`

`

const U_one_title = styled.div`

position: absolute;
width: 173.65px;
height: 28.94px;
left: 1017.91px;
top: 1950.36px;

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 26px;

color: #FE4911;


`
const U_one_desc = styled.div`

`

const U_one_amount = styled.div`

`
const kard = styled.div`

`