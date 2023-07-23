import { Box, Button, Card, TextareaAutosize, TextareaAutosizeProps, Typography, styled, useTheme } from "@mui/material"
import { useState } from "react"
import { ArchivedChatroomsListDocument, ChatroomDataFragment, ChatroomsListDocument, useEditChatroomMutation } from "~src/codegen/graphql"


type ChatroomListItemDescriptionProps = {
  chatroom: ChatroomDataFragment
}

const StyledTextarea = styled(TextareaAutosize)<TextareaAutosizeProps>(({ theme }) => ({
  resize: "vertical",
  width: "100%",
  background: theme.palette.grey[900],
  color: theme.palette.grey[300],
  ...theme.typography.body2
}
))

export const ChatroomListItemDescription: React.FC<ChatroomListItemDescriptionProps> = ({
  chatroom
}) => {
  const theme = useTheme()

  const [newDescription, setNewDescription] = useState(chatroom.description)
  const [editDescription, setEditDescription] = useState(false)
  const [editChatroomDescription] = useEditChatroomMutation({
    refetchQueries: [ChatroomsListDocument, ArchivedChatroomsListDocument]
  })


  return (
    <Card sx={{ padding: 2 }}>
      {editDescription == false ?
        <>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Description</Typography>
            <Button onClick={() => setEditDescription(true)}>Edit</Button>
          </Box>
          <Typography variant="body2">
            {chatroom.description.split("\n").map((line) => <>{line}<br /></>) ?? "No description provided."}
          </Typography>
        </> :
        <>
          <Typography variant="body1" paddingBottom="8px">Description</Typography>
          {/* onFocus, the textcursor is set to the end of the text box so updates can be made more easily. */}
          <StyledTextarea
            autoFocus={true}
            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
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

  )
}

