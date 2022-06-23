import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import {
  PUBLIC_ACCOUNT,
  PUBLIC_CAMPAIGN,
  PUBLIC_INFLUENCER,
  PUBLIC_MESSAGE,
  PUBLIC_CAMPAIGNS,
} from "../../configs/router-config";
import Message from "./message/home";
import Campaign from "./campaign/campaign";
import Account from "./account/account";
import NoPage from "./404page";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../../components/button";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import LoadingPage from "../loading";
function CampaignDetail() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  let { campaignname } = useParams();
  const [giftlist, setGiftlist] = useState([]);
  const [name, setName] = useState("");
  const [campaignid, setCampaignid] = useState("");
  const [selectgift, setGift] = useState([]);
  const [taskoflist, setTaskoflist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const handleClick = async (item) => {
    setGift(item);
    Submit();
  };
  const Submit = async () => {
    try {
      const inCampaign = {
        gift: selectgift,
        taskoflist: taskoflist,
        name: name,
        status: "pendng",
        userid: user._id,
        campaignid: campaignid,
        logoimage: logo,
        email: user.email,
        phone: user.phone,
        deliveryname: user.deliveryname,
        deliveryaddress: user.deliveryaddress,
      };
      if (selectgift.length !== 0) {
        await axios
          .post("/api/incampaign/addincampaign", inCampaign)
          .then((res) => {
            setGift([]);
            setGiftlist([]);
            setName("");
            setTaskoflist([]);
            setCampaignid("");
            history.push(PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN);
          });
      } else {
        console.log("again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const allincampaign = async () => {
      try {
        setIsLoading(true);
        const userid = { userid: user._id };
        await axios
          .post("/api/incampaign/allincampaign", userid)
          .then((res) => {
            console.log(res);
            if (res.data.length === 0) {
              allcampaign();
            } else {
              res.data.map((item) => {
                if (campaignname !== item.name) {
                  allcampaign();
                } else {
                  toast("already selected");
                  history.push("/");
                }
              });
            }
          });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    const allcampaign = async () => {
      try {
        const CampaignName = { name: campaignname };
        await axios
          .post("/api/campaign/incampaign", CampaignName)
          .then((res) => {
            const data = res.data;
            setGiftlist(data.gifts);
            setName(data.name);
            setTaskoflist(data.taskoflist);
            setCampaignid(data.userid);
            setLogo(data.logoimage);
          });
      } catch (err) {
        console.log(err, "err");
      }
    };
    allincampaign();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Wrapper>
          <Contenttext>{name}</Contenttext>
          <GiftlistContent>
            {giftlist.map((item, key) => (
              <Giftlist key={key}>
                <img src={item.image} />
                <Contenttext2>SKU : {item.label}</Contenttext2>
                <>
                  {item.name} && ${item.price}
                </>
                <Button text="select" onClick={() => handleClick(item)} />
              </Giftlist>
            ))}
          </GiftlistContent>
        </Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;
const Contenttext = styled.div`
  font-size: 40px;
  font-weight: 800;
`;
const Contenttext2 = styled.div`
  font-size: 24px;
  font-weight: 300;
`;
const GiftlistContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const Giftlist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  img {
    width: 200px;
    height: 100px;
  }
`;
export default function PublicViewsInfluencer() {
  let location = useLocation();
  return (
    <Switch location={location}>
      <Route exact path="/">
        <Redirect to={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN}></Redirect>
      </Route>
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN}
        component={Campaign}
      />
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_ACCOUNT}
        component={Account}
      />
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_MESSAGE}
        component={Message}
      />
      <Route
        exact
        path={PUBLIC_CAMPAIGNS + "/:campaignname"}
        children={<CampaignDetail />}
      />
      <Route path={PUBLIC_INFLUENCER} component={NoPage} />
    </Switch>
  );
}
