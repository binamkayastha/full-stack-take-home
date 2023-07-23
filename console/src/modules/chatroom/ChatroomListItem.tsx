import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Typography,
  TextareaAutosize,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, ChatroomsListDocument, useEditChatroomDescriptionMutation } from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";
import { ConfirmationModal } from "./ConfirmationModal";
import { ChatroomListItemDescription } from "./ChatroomListItemDescription";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const theme = useTheme()
  const [showDetails, setShowDetails] = useState(false);
  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  const [archiveModalOpen, setArchiveModalOpen] = useState(false)

  const archiveChatroom = () => {
    console.log("Archiving Chatroom")
    console.log(chatroom.id)
    console.log(chatroom.label)
    setArchiveModalOpen(false)
  }

  return (
    <>
      <ConfirmationModal
        open={archiveModalOpen}
        handleClose={() => setArchiveModalOpen(false)}
        handleConfirm={() => archiveChatroom()}
        prompt={`Are you sure you want to archive "${chatroom.label}"?`}
      />
      <ChatroomCard variant="outlined">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Box display="flex" gap={theme.spacing(1)}>
              <Typography variant="h6">{chatroom.label}</Typography>
              <Button onClick={() => setArchiveModalOpen(true)}>Archive</Button>
            </Box>
            <ChatroomTags
              natureCode={natureCodeName}
              callerPhoneNumber={chatroom.callerPhoneNumber}
            />
          </Box>
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        <Collapse in={showDetails}>
          <ChatroomListItemDescription chatroom={chatroom} />
        </Collapse>
      </ChatroomCard >
    </>
  );
};
