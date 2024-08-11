import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FlattenedItemAllProducstOfAllSuppliersResponse, UserProfile } from 'data/dashboard/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface Props {
  open: boolean;
  data: FlattenedItemAllProducstOfAllSuppliersResponse;
  onClose: () => void;
}
const handleOrderProduct = async (
  quantity: number,
  productId?: number | null,
  distributorId?: number | null,
) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
      distributorId,
      quantity,
    }),
  }).then((res) => {
    return res.json();
  });

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

      productId,

      distributorId,
    }: {
      distributorId?: number | null;
      quantity: number;
      productId?: number | null;
    }) => handleOrderProduct(quantity, productId, distributorId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productsDistributor'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ordersSupplier'],
      });
      toast.success(`Create Order ${data.productName} successful!`);
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
              distributorId: user?.id,
              quantity: Number(formJson.quantity),
              productId: data.productId,
            });
            onClose();
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
            value={data.supplierName}
            autoFocus
            margin="dense"
            id="supplier"
            name="supplier"
            label="Supplier"
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
