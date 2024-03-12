import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

const extractCodeFromString = (message: string) => {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
};

const isCodeBlock = (str: string) => {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "system";
}) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  return role === "system" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar
        sx={{
          ml: "0",
        }}
      >
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkCold} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"20px"}>{content}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", my: 2, gap: 2}}>
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
        }}
      >
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1]?.[0]}
      </Avatar>
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkCold} language={messageBlocks[0].split("/")[0]}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"20px"}>{content}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
