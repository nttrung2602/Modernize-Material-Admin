import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FlattenedItemAllProducstOfAllDistributorResponse,
  UserProfile,
} from 'data/dashboard/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { SupplierProfile } from 'data/dashboard/table';
// import { useQuery } from '@tanstack/react-query';

export interface Props {
  open: boolean;
  data: FlattenedItemAllProducstOfAllDistributorResponse;
  onClose: () => void;
}
const handleOrderProduct = async (
  quantity: number,
  warehouseId?: number | null,
  sellerId?: number | null,
) => {
  console.log(
    'dataaa',
    JSON.stringify({
      warehouseId,
      sellerId,
      quantity,
    }),
  );
  return await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/sellers/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      warehouseId,
      sellerId,
      quantity,
    }),
  }).then((res) => {
    return res.json();
  });
};

export default function CreatingOrderFormDialog({ open, data, onClose }: Props) {
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  React.useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);

  const creatingOrderProduct = useMutation({
    mutationFn: ({
      quantity,
      warehouseId,
      sellerId,
    }: {
      sellerId?: number | null;
      quantity: number;
      warehouseId?: number | null;
    }) => handleOrderProduct(quantity, warehouseId, sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productsSeller'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ordersDistributor'],
      });
      toast.success(`Create Order ${data.productName} successful!`);
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed Order ${error.message}!`);
    },
  });
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

            creatingOrderProduct.mutate({
              quantity: Number(formJson.quantity),
              warehouseId: data.warehouseId,
              sellerId: user?.id,
            });
          },
        }}
      >
        <DialogTitle>Create new order</DialogTitle>
        <DialogContent>
          <TextField
            value={data.productName}
            disabled
            autoFocus
            id="name"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            disabled
            value={data.distributorName}
            autoFocus
            margin="dense"
            id="distributor"
            name="distributor"
            label="Distributor"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            autoFocus
            type="number"
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Order</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
