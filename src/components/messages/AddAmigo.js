import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../assets/images/addamigo.png";
import "../../assets/css/AddAmigo.css";

function AddAmigo({ addchattoggler, addchattoggle }) {
  const [amigousername, setAmigoUsername] = useState();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/?username=${amigousername}`);
      setAmigoUsername("");
      const data = {
        senderId: user._id,
        receiverId: response.data._id,
      };
      await axios.post("/api/chatrooms", data);
    } catch (err) {}
    window.location.reload();
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
}

export default AddAmigo;
