import Button from "../../../components/button";
import styled from "styled-components";
import InfluencerTable from "../../../components/influencer";
import InputTag from "../../../components/input";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Modal } from "@mui/material";
import StarRatings from "react-star-ratings";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { toast } from "react-toastify";
const Inflencers = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [followers, setFollowers] = useState("");
  const [influencernum, setInfluencernum] = useState("");
  const [followurl, setFollowurl] = useState("");
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = setTags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const influencer = {
        userid: user._id,
        email: user.email,
        rating: rating,
        tags: tags,
        followers: followers,
        influencernum: influencernum,
        followurl: followurl,
      };
      await axios
        .post("/api/influencer/send", influencer)
        .then((res) => toast(res.data));
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <WrapperButton>
        <Button text="OutReach" onClick={() => setIsOpen(true)} />
        <Button text="PackShip" />
      </WrapperButton>
      <InfluencerTable />
      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <InputTag
            text="Influencer Number"
            type="number"
            onChange={(e) => setInfluencernum(e.target.value)}
          />
          <InputTag
            text="Followers Number"
            type="number"
            onChange={(e) => setFollowers(e.target.value)}
          />
          <InputTag
            text="Url"
            type="text"
            onChange={(e) => setFollowurl(e.target.value)}
          />
          <StarRatings
            rating={rating}
            starRatedColor="yellow"
            starHoverColor="yellow"
            changeRating={(e) => setRating(e)}
            starDimension="20px"
            starSpacing="5px"
          />
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            placeholder="please input your plan list"
            autocomplete
          />
          <WrapperButton>
            <Button text="Submit" onClick={handleSubmit} />
            <Button text="Cancel" onClick={() => setIsOpen(false)} />
          </WrapperButton>
        </WrapperInput>
      </Modal>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 10% 40%;
  padding: 50px;
  background-color: white;
`;
export default Inflencers;
