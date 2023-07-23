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
  const [editDescription, setEditDescription] = useState(false)

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  const [editChatroomDescription] = useEditChatroomDescriptionMutation({
    refetchQueries: [ChatroomsListDocument]
  })

  const [newDescription, setNewDescription] = useState(chatroom.description)

  const [archive, setArchiveModal] = useState(false)

  return (
    <ChatroomCard variant="outlined">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box>
          <Box display="flex" gap="16px">
            <Typography variant="h6">{chatroom.label}</Typography>
            <Button onClick={() => setArchiveModal(true)}>Archive</Button>
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
        <Card sx={{ padding: 2 }}>
          {editDescription == false ?
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">Description</Typography>
                <Button onClick={() => setEditDescription(true)}>Edit</Button>
              </Box>
              <Typography variant="body2">
                {chatroom.description ?? "No description provided."}
              </Typography>
            </> :
            <>
              <Typography variant="body1" paddingBottom="8px">Description</Typography>
              {/* TODO: Move textarea styles to MUI theme */}
              {/* onFocus, the textcursor is set to the end of the text box so updates can be made more easily. */}
              <TextareaAutosize
                autoFocus={true}
                onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                style={{
                  resize: "vertical",
                  width: "100%",
                  background: theme.palette.grey[900],
                  color: theme.palette.grey[300],
                  ...theme.typography.body2
                }}
                defaultValue={chatroom.description || ''}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <Box display="flex" justifyContent="space-between">
                <Button onClick={() => setEditDescription(false)}>Cancel</Button>
                <Button onClick={() => {
                  const variables = {
                    id: chatroom.id, description: newDescription || ''
                  }
                  editChatroomDescription({ variables })
                  setEditDescription(false)
                }}>Save</Button>
              </Box>

            </>
          }
        </Card>
      </Collapse>
    </ChatroomCard>
  );
};
