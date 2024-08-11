import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ProductForm, UserProfile } from 'data/dashboard/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { SupplierProfile } from 'data/dashboard/table';
// import { useQuery } from '@tanstack/react-query';

// const fetchAllSupplier = async (): Promise<SupplierProfile[]> => {
//   return await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers`).then((res) => {
//     return res.json();
//   });
// };
const handleOrderProduct = async (data: ProductForm, supplierId?: number | null) => {
  const dataRequest = {
    productName: data.productName,
    productBrand: data.productBrand,
    productOrigin: data.productOrigin,
    productCertification: data.productCertification,
    productWeight: data.productWeight,
    productCommit: data.productCommit,
    productPlanting: data.productPlanting,
    quantity: data.quantity,
    characteristic: data.characteristic,
    seed: data.seed,
    cook: data.cook,
    note: data.note,
    image: data.image,
    plantingDate: data.plantingDate,
    harvestDate: data.harvestDate,
    supplierId: supplierId,
  };

  return await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/products/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataRequest),
  }).then((res) => {
    return res.json();
  });
};

export default function CreatingProductFormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  React.useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);
  const creatingProduct = useMutation({
    mutationFn: (data: ProductForm) => handleOrderProduct(data, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productsSupplier'],
      });
      toast.success(`Create Product successful!`);
    },
  });

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={handleOpen}>
        New Product
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
            const data: ProductForm = JSON.parse(JSON.stringify(formJson));
            // const email = formJson.email;
            // console.log('data,', data);
            creatingProduct.mutate(data);
            // product,supplierId;

            handleClose();
          },
        }}
      >
        <DialogTitle>Create new product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="productName"
            name="productName"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="characteristic"
            name="characteristic"
            label="Characteristic"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="seed"
            name="seed"
            label="Seed"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="cook"
            name="cook"
            label="Cook"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="note"
            name="note"
            label="Note"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="image"
            name="image"
            label="Image"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="plantingDate"
            name="plantingDate"
            label="Planting Date"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="harvestDate"
            name="harvestDate"
            label="Harvest Date"
            fullWidth
            variant="outlined"
          />{' '}
          <TextField
            id="productBrand"
            name="productBrand"
            label="Product Brand"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="productOrigin"
            name="productOrigin"
            label="Product Origin"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="productCertification"
            name="productCertification"
            label="Product Certification"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="productWeight"
            name="productWeight"
            label="Product Weight"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="productCommit"
            name="productCommit"
            label="Product Commit"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="productPlanting"
            name="productPlanting"
            label="Product Planting"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
