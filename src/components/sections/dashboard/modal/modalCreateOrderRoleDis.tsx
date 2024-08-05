import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SupplierProfile } from 'data/dashboard/table';
import { useQuery } from '@tanstack/react-query';

const fetchAllSupplier = async (): Promise<SupplierProfile[]> => {
  return await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers`).then((res) => {
    return res.json();
  });
};

export default function CreatingOrderFormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useQuery<SupplierProfile[]>({
    queryKey: ['supplierProfile'],
    queryFn: () => fetchAllSupplier(),
    initialData: [],
  });
  // if (isSuccess) {
  //   console.log('profile', data);
  // }

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={handleOpen}>
        New Order
      </Button>

      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: HTMLFormElement) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            console.log(formJson);

            handleClose();
          },
        }}
      >
        <DialogTitle>Create new order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <FormControl
            variant="standard"
            required
            style={{
              marginTop: '10px',
            }}
            sx={{ mt: 1, minWidth: 80, color: 'text.secondary' }}
          >
            <InputLabel id="demo-dialog-select-label">Supplier</InputLabel>
            <Select
              fullWidth
              sx={{ whiteSpace: 'normal', wordWrap: 'break-all' }}
              style={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                textWrap: 'wrap',
                maxWidth: '500px',
              }}
              defaultValue={''}
              displayEmpty
              size="small"
              name="supplierId"
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
            >
              <MenuItem style={{ whiteSpace: 'normal' }} value="">
                <em>None</em>
              </MenuItem>
              {data?.map((item, index) => {
                return (
                  <MenuItem key={index} style={{ whiteSpace: 'normal' }} value={item.supplierId}>
                    <em>{item.email}</em>
                  </MenuItem>
                );
              })}

              {/* <MenuItem style={{ whiteSpace: 'normal' }} value="">
                <em>{data[0]?.email}</em>
              </MenuItem> */}
              {/* <MenuItem value={10}>One</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="sdt"
            label="Email Address"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
