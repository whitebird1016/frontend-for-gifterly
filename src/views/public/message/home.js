import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../assets/css/HomeCSS/Home.css";
import "../../../assets/css/HomeCSS/Sidebar.css";
import "../../../assets/css/HomeCSS/ChatRoom.css";
import Message from "../../../components/messages/Message.js";
import AddAmigo from "../../../components/messages/AddAmigo.js";
import ProfilePage from "../../../components/messages/ProfilePage";
import SidebarChat from "../../../components/messages/SidebarChat.js";
import EmptyChatRoom from "../../../components/messages/EmptyChatRoom";
import { AuthContext } from "../../../Context/AuthContext";

import axios from "axios";
import { io } from "socket.io-client";
import { Picker } from "emoji-mart";

import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "emoji-mart/css/emoji-mart.css";
import noavatar from "../../../assets/images/noavatar.jpg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";

function Home() {
  const [chatroomtiles, setChatroomtiles] = useState([]);
  const [currentchat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [amigo, setAmigo] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();

  /* Making Messages Realtime */

  useEffect(() => {
    socket.current = io("/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user, chatroomtiles, currentchat, socket]);

  /* Fetching the Chat Tiles */

  useEffect(() => {
    const getChatroomtiles = async () => {
      try {
        const res = await axios.get("/api/chatrooms/" + user._id);
        setChatroomtiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatroomtiles();
  }, [user?._id]);

  /* Fetching the Chat Tile user details */

  useEffect(() => {
    const amigoId = currentchat?.members.find((m) => m !== user._id);
    const getAmigodetails = async () => {
      try {
        const response = await axios.get("/api/users/" + amigoId);
        setAmigo(response.data);
      } catch (err) {}
    };
    getAmigodetails();
  }, [user, currentchat]);

  /* Fetching ChatRoom Messages */

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("/api/messages/" + currentchat?._id);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentchat]);

  /* Scroll to the recent message */

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Emoji Picker */

  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage(newMessage + emoji);
  };
  const [pick, setPick] = useState(false);
  const openPicker = () => {
    setPick(!pick);
  };

  /* Posting a Message */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendingMessage = {
      chatroomId: currentchat._id,
      senderId: user._id,
      text: newMessage,
    };

    const receiverId = currentchat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios.post("/api/messages/", sendingMessage);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    setPick(false);
  };

  /* Logout */

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  /* AddChat Toggle Setup */

  const [addtoggle, setAddtoggle] = useState(false);
  const addchatToggler = () => {
    addtoggle === false ? setAddtoggle(true) : setAddtoggle(false);
    console.log(addtoggle);
  };

  /* Profile Page Toggle Setup */

  const [profiletoggle, setProfiletoggle] = useState(false);
  const profiletoggler = () => {
    profiletoggle === false ? setProfiletoggle(true) : setProfiletoggle(false);
  };

  return (
    <div className="home">
      {/* Chat Adding Card */}
      <AddAmigo
        addchattoggler={() => {
          addchatToggler();
        }}
        addchattoggle={addtoggle}
      />

      {/* Profile Page Card - Update */}
      <ProfilePage
        toggler={() => {
          profiletoggler();
        }}
        togglestate={profiletoggle}
      />

      {/* Sidebar Open Menu */}
      {open ? (
        ""
      ) : (
        <div
          className="menu-open"
          onClick={() => {
            setOpen(true);
          }}
        >
          <IconButton>
            <MenuIcon style={{ fontSize: 35, color: "#316af3" }} />
          </IconButton>
        </div>
      )}

      {/* Add Chat Icon */}
      <div className="add-chatroom-icon" onClick={addchatToggler}>
        <IconButton>
          <PersonAddIcon />
        </IconButton>
      </div>

      {/* Sidebar, ChatRoom */}
      <div className="home-components">
        {/* Sidebar */}
        <div className={open ? "sidebar active" : "sidebar"}>
          <div className="sidebar-search">
            <div className="sidebar-search-container">
              <SearchIcon className="sidebar-searchicon" />
              <input
                type="text"
                name="chat-search"
                placeholder="Search a Chat"
              />
            </div>
          </div>

          {/* Chatroom tiles */}
          <div className="sidebar-chatoptions">
            {chatroomtiles.map((chatroomtile) => (
              <div
                key={chatroomtile?._id}
                onClick={() => {
                  setCurrentchat(chatroomtile);
                  setOpen(false);
                }}
              >
                <SidebarChat chatroomtile={chatroomtile} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Chatroom */}
        <div className="chatroom">
          {currentchat ? (
            <>
              <div className="chatroom-header">
                <div className="chatroom-chatinfo">
                  <img
                    className="amigo-profilepic"
                    src={amigo?.photo ? "/photo/" + amigo?.photo : noavatar}
                    alt=""
                  />

                  <div className="chatroom-chatinfo-right">
                    <div className="chatroom-chatinfo-name">
                      <p>{amigo?.username}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="chatroom-messages-container"
                onClick={() => {
                  setPick(false);
                }}
              >
                {messages.map((message) => (
                  <div key={message?._id} ref={scrollRef}>
                    <Message
                      message={message}
                      own={message?.senderId === user._id}
                    />
                  </div>
                ))}
              </div>
              <div
                className={pick ? "emoji-picker-open" : "emoji-picker-close"}
              >
                <Picker onSelect={addEmoji} emojiSize={25} />
              </div>
              <div className="chatroom-footer">
                <div className="chatroom-footer-lefticons">
                  <IconButton onClick={openPicker}>
                    <InsertEmoticonIcon />
                  </IconButton>
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                </div>
                <form>
                  <input
                    className="message-input"
                    type="text"
                    name="message-input"
                    placeholder="Type a message"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                    required
                  />
                  <button
                    className="input-button"
                    onClick={newMessage ? handleSubmit : null}
                  >
                    {" "}
                    Send a Message{" "}
                  </button>
                </form>
                <div
                  className="chatroom-footer-righticon"
                  onClick={newMessage ? handleSubmit : null}
                >
                  <IconButton>
                    <SendIcon className="send-icon" />
                  </IconButton>
                </div>
              </div>
            </>
          ) : (
            <EmptyChatRoom />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
