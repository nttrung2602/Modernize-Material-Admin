import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FlattenedProductInWarehouseRoleSeller, UserProfile } from 'data/dashboard/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { SupplierProfile } from 'data/dashboard/table';
// import { useQuery } from '@tanstack/react-query';

export interface Props {
  open: boolean;
  onClose: () => void;
}

export default function UserProfileDialog({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  React.useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;
    setUser(userData);
  }, []);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: HTMLFormElement) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // console.log(formJson);
          },
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <TextField
            value={user?.name}
            autoFocus
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            value={user?.email}
            disabled
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={user?.phoneNumber}
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="PhoneNumber"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={user?.address}
            margin="dense"
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={user?.fax}
            margin="dense"
            id="fax"
            name="fax"
            label="Fax"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Exit</Button>
          <Button type="submit" variant="outlined" disabled>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
