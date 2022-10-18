import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Index({AllData, HealthData, EducationData,AnimalData,Covid_19Data,AccidentData}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper>
      <SliderWrapper>
    <Carousel>

                  <ImageWrapper>
                    <Titlee>Fight covid-19 </Titlee>
                      <Image   src="/covid_2.jpg"
 width={900}
 height={600}
  />
                      <Text className="legend" >Fight covid-19 The world is facing an unprecedented challenge with
                       communities and economies everywhere affected by the growing COVID-19 pandemic. The world is coming 
                       together to combat the COVID-19 pandemic bringing governments, organizations from across industries and sectors and
                        individuals together to help respond to this global outbreak. Everyone can now support directly on this platform with blockchain 
                      security by contributing some amounts to the one who are suffering from covid-19 pandemic. </Text>

                  </ImageWrapper>
                  <ImageWrapper>
                  <Titlee>Educate  Girl Child </Titlee>
                  <Image   src="/education.jpg"
                       width={900}
                       height={600} />
                      <Text className="legend">Girls who receive an education are less likely to marry
                       young and more likely to lead healthy, productive lives. They earn higher incomes, 
                      participate in the decisions that most affect them, and build 
                      better futures for themselves and their families. </Text>
  
                  </ImageWrapper>
                  <ImageWrapper>
                    <Titlee>TIME TO HELP</Titlee>
                  <Image   src="/letshelp.jpg"
                       width={900}
                       height={600} />
                      <Text className="legend">They are not only enjoying the joy of essentials but also have what they want and desire;
                       a luxurious living providing them an extra comfort. On the other hand, there are people who cannot even afford the basic
                        requirements of living. They do not have shelter to live, food to eat, and clothes to wear.People who have extra are living 
                      a comfortable and a posh life. While those who have barely the vitals are fighting each day for life.They fail to meet the basic 
                      requirements.</Text>
  
                  </ImageWrapper>
                  <ImageWrapper>
                  <Titlee>We Created Decentralised platform using blockchain for Crowdfunding</Titlee>
                  <Image   src="/block_3.jpg"
                       width={900}
                       height={600} />
                      <Text className="legend">Many crypto wallets allow for self custody, enabling their users to control their own assets. 
                      Added to this structure, the decentralized design of many blockchains can provide clarity on where money goes. 
                      Ensuring that donations go to their intended destination is a major critique of donating to major organizations today,
                       and blockchains can help address that problem. Leveraging transparent crypto wallets, specific address data, and other 
                       data from the blockchain can help determine if funds were received by the wallet associated with the intended organization
                        or beneficiary. Various organizations are developing blockchain technology that can help donors to transparently trace 
                        funds throughout the entirety of the donation process, making it easier for donors to hold a fundraising entity 
                        accountable, and incentivizing organizations to do what they say they will with the received funding.

</Text>
  
                  </ImageWrapper>
                  <ImageWrapper>
                    <Titlee>SAVE FOREST -SAVE LIFE</Titlee>
                  <Image   src="/nature.jpg"
                       width={900}
                       height={600} />
   <Text className="legend">Forests are essentials natural resources for human beings and sustain life on earth. 
   Wild covers shelter various animal species and protect them from getting extinct. ...
Deforestation and clearing forest covers for construction are major concerns of urbanization.</Text>
  
                  </ImageWrapper>
              </Carousel>
  </SliderWrapper>
      {/* Filter Section */}
      
      <Titlee>Current Campaigns</Titlee>
      <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
        <Category onClick={() => setFilter(Covid_19Data)}>Covid-19</Category>
        <Category onClick={() => setFilter(AccidentData)}>Accident</Category>
        
      </FilterWrapper>

      {/* Cards Container */}
      
      <CardsWrapper>
      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="Crowdfunding dapp"
              layout='fill' 
              src={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text>Owner<AccountBoxIcon /></Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text>Amount<PaidIcon /></Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getCovid_19_Campaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Covid-19');
  const Covid_19_Campaigns = await contract.queryFilter(getCovid_19_Campaigns);
  const Covid_19Data = Covid_19_Campaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAccident_Campaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Accident');
  const Accident_Campaigns = await contract.queryFilter(getAccident_Campaigns);
  const AccidentData = Accident_Campaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });
  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
      Covid_19Data,
      AccidentData
    }
  }
}


const SliderWrapper=styled.div`


width: 900;
height:600;

`
const ImageWrapper=styled.div`
display: flex;
flex-direction: column;
align-items: center;



`
// background: rgba(0,0,0,0.4);


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.bgDiv};

   background: rgba(0,0,0,0.4);
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 28px;
  margin: 2px 0px;
  
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const Titlee = styled.h2`
  font-family: 'Roboto';
  font-size: 28px;
  margin: 2px 0px;
  width: 300px;
  
  background-color: ${(props) => props.theme.bgDiv};
  background-color: ${(props) => props.theme.bgSubDiv};

  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
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
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`
