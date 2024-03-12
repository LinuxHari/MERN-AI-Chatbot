import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const chatMessages = [
  { role: "user", content: "Hi, how are you?" },
  { role: "system", content: "Typing..." },
  { role: "user", content: "I'm doing well, thanks! How about you?" },
  { role: "system", content: "Online" },
  { role: "user", content: "Great! What's the weather like today?" },
  { role: "system", content: "Fetching weather information..." },
  { role: "user", content: "No problem, take your time." },
  { role: "system", content: "Weather: Sunny with a high of 25°C." },
  { role: "user", content: "Awesome! Thanks for the update." },
];

type Message = {
  role: "user" | "system",
  content: string
}

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const handleSubmit = async() => {
    const content = inputRef.current?.value as string
    console.log(content, "content")
    if(inputRef && inputRef.current?.value){
      inputRef.current.value = ""

      const newMessage: Message = { role: "user", content }
      setChatMessages((prev) => [...prev, newMessage])
  
      const chatData = await sendChatRequest(content)
      setChatMessages([...chatData.chats])
    }
  
  }

  const handleDeleteChats = async() => {
     try{
      toast.loading("Deleting Chats", {id: "deletechats"})
      await deleteUserChats()
      setChatMessages([])
      toast.success("Deleted Chats Successfully", {id: "deletechats"})
     } catch(error){
      toast.error("Deleting Chats Failed", {id: "deletechats"})
     }
  }

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading Chats", {id: "loadChats"})
      getUserChats().then((data) => {
        setChatMessages([...data.chats])
        toast.success("Success", {id: "loadChats"})
      }).catch((error) => {
        console.log(error);
        toast.error("Loading Failed", {id: "loadChats"})
      })
    }
  },[auth])

  useEffect(() => {
    if(!auth?.user){
      return navigate("/login")
    }
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
          },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]?.[0]}
          </Avatar>
          <Typography sx={{ mx: "auto",px:3, fontFamily: "work sans" }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
            onClick={handleDeleteChats}
          >
            Clear Conversations
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, i) => (
            <ChatItem
              content={chat.content}
              role={chat.role}
              key={i}
            ></ChatItem>
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              fontSize: "20px ",
              color: "white",
            }}
            ref={inputRef}
            required
          />
          <IconButton
            sx={{
              ml: "auto",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
