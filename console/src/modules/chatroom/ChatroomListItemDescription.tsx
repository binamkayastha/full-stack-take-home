import { Box, Button, Card, TextareaAutosize, TextareaAutosizeProps, Typography, styled } from "@mui/material"
import { useState } from "react"
import { ChatroomDataFragment } from "~src/codegen/graphql"


type ChatroomListItemDescriptionProps = {
  chatroom: ChatroomDataFragment
  updateDescription: (description: string) => void
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
  chatroom, updateDescription
}) => {

  const [editOpen, setEditOpen] = useState(false)
  const [newDescription, setNewDescription] = useState(chatroom.description)

  return (
    <Card sx={{ padding: 2 }}>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Description</Typography>
        {!editOpen && <Button onClick={() => setEditOpen(true)}>Edit</Button>}
      </Box>
      {editOpen ?
        <>
          {/* onFocus, the textcursor is set to the end of the text box so updates can be made more easily. */}
          <StyledTextarea
            autoFocus={true}
            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            defaultValue={chatroom.description || ''}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              updateDescription(newDescription || '')
              setEditOpen(false)
            }}>Save</Button>
          </Box>

        </> :
        <>
          <Typography variant="body2">
            {chatroom.description?.split("\n").map((line) => <>{line}<br /></>) ?? "No description provided."}
          </Typography>
        </>
      }
    </Card>

  )
}

