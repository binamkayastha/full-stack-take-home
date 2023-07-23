import { Box, Button, Card, Modal } from "@mui/material";

export type ConfirmationModalProps = {
  open: boolean;
  prompt: String;
  handleClose: () => void;
  handleConfirm: () => void;
}
export const ConfirmationModal: React.FC<ConfirmationModalProps> = (
  { open, prompt, handleClose, handleConfirm }
) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Card variant="outlined" sx={{ minWidth: 400, padding: 2 }}>
          <Box paddingBottom="16px">
            {prompt}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button onClick={() => handleConfirm()}>Yes</Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
