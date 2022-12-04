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

export default function Projects({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
  Covid_19Data,
  AccidentData,
}) {
  const [filter, setFilter] = useState(AllData)
  const Router = useRouter()

  return (
    <HomeWrapper>
   <ProjectWrap>
   
      <Titlee>Explore Campaigns</Titlee> </ProjectWrap>


      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
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
                <Image  layout="fill"
                  alt="Crowdfunding dapp"
                  objectFit="cover"
                  src={'https://ipfs.infura.io:5001/' + e.image}
                />
              </CardImg>
              <Title>{e.title}</Title>
              <CardData>
                <Text>
                  Owner
                  <AccountBoxIcon />
                </Text>
                <Text>
                  {e.owner.slice(0, 6)}...{e.owner.slice(39)}
                </Text>
              </CardData>
              <CardData>
                <Text>
                  Amount
                  <PaidIcon />
                </Text>
                <Text>{e.amount} Matic</Text>
              </CardData>
              <CardData>
                <Text>
                  <EventIcon />
                </Text>
                <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
              </CardData>
              <Link passHref href={'/' + e.address}>
                <Button>Go to Campaign</Button>
              </Link>
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
const Button = styled.button`
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
// first imaage Component----------------------
const Titlee = styled.h2`
    width: 557px;
    height: 75px;
    font-family: 'Sen';
    font-style: normal;
    font-weight: 700;
    font-size: 62px;
    line-height: 75px;
    /* identical to box height */
    /* Inside auto layout */
    flex: none;
    order: 1;
   
    flex-grow: 0;

`
const ProjectWrap = styled.div`
display:flex;
align-items:center;
justify content: center;
z-index:0;
height:50%;
width:100%;
display: flex;
flex-direction: column;
padding: 0px 43px;
gap: 38px;
position: relative;
width: 1442px;
height: 348px;
left: -1px;
top: 0px;
background: rgba(254, 73, 17, 0.88);
`