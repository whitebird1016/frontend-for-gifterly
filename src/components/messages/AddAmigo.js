import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../assets/images/addamigo.png";
import "../../assets/css/AddAmigo.css";

const AddAmigo = ({ addchattoggler, addchattoggle }) => {
  const [amigousername, setAmigoUsername] = useState("");
  const { user } = useContext(AuthContext);
  const flag = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/users/?username=${amigousername}`
      );
      setAmigoUsername("");

      const rooms = await axios.get(
        process.env.REACT_APP_API + "/api/chatrooms/allrooms"
      );
      rooms.data.map((item) => {
        if (
          item.members[0] === user._id ||
          item.members[0] === response.data._id
        ) {
          if (
            item.members[1] === user._id ||
            item.members[1] === response.data._id
          ) {
            flag = false;
          }
        }
      });
      const data = {
        senderId: user._id,
        receiverId: response.data._id,
      };
      if (flag === true) {
        console.log("res");
        await axios.post(process.env.REACT_APP_API + "/api/chatrooms", data);
      }
    } catch (err) {}
    // window.location.reload();
  };

  return (
    <div className="add-amigo-background">
      <div className={addchattoggle ? "add-amigo-open" : "add-amigo-close"}>
        <div className="close-div">
          <span onClick={addchattoggler}>
            <p className="close-symbol">x</p>
          </span>
        </div>
        <form>
          <img className="add-amigo-img" src={avatar} alt=""></img>
          <input
            type="text"
            placeholder="Enter Username"
            value={amigousername}
            onChange={(e) => {
              setAmigoUsername(e.target.value);
            }}
            required
          />
          <button onClick={handleSubmit}>ADD FRIEND</button>
        </form>
      </div>
    </div>
  );
};

export default AddAmigo;
