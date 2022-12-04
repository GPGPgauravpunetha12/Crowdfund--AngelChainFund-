import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper'
import FormRightWrapper from './Components/FormRightWrapper.js'
import { createContext, useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Link from 'next/link';
const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const startCampaign = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        if(form.campaignTitle === "") {
          toast.warn("Title Field Is Empty");
        } else if(form.story === "" ) {
          toast.warn("Story Field Is Empty");
        } else if(form.requiredAmount === "") {
          toast.warn("Required Amount Field Is Empty");
        } else if(uploaded == false) {
            toast.warn("Files Upload Required")
        }
        else {        
          setLoading(true);  
    
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
            CampaignFactory.abi,
            signer
          );
            
          const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
    
          const campaignData = await contract.createCampaign(
            form.campaignTitle,
            CampaignAmount,
            imageUrl,
            form.category,
            storyUrl
          );
    
          await campaignData.wait();   
    
          setAddress(campaignData.to);
        }
    }

  return (
      <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startCampaign, setUploaded}} >
       <ProjectWrap>
   
   <Titlee>Create your Campaign</Titlee> </ProjectWrap>

    <FormWrapper>
        <FormMain>
            {loading == true ?
                address == "" ?
                    <Spinner>
                        <TailSpin height={60} />
                    </Spinner> :
                <Address>
                    <h1>Campagin Started Sucessfully!</h1>
                    <h1>{address}</h1>
                    <Link passHref href={'/project' + e.address}>
                          <Button >
                        Go To Campaign
                    </Button></Link>
                </Address>
                :
                    <FormInputsWrapper>
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </FormInputsWrapper>               
            }
        </FormMain>
    </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
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
text-align:center;
justify content: center;
z-index:0;
height:50%;
width:100%!important;
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

export default Form;
export {FormState};