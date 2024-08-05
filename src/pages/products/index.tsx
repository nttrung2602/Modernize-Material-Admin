import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ProductsOfSupplierTable from 'components/sections/dashboard/topProducts/TopProductsTable';

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    characteristic: '',
    seed: '',
    cook: '',
    note: '',
    hasDist: false,
    hasSeller: false,
    suppId: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox') {
      const { checked } = event.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Success:', result);
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        pb: 1,
      }}
    >
      <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
        Add Product
      </Button>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} xl={6}>
          <ProductsOfSupplierTable />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Supp ID"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  name="suppId"
                  value={formData.suppId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Characteristic"
                  variant="outlined"
                  fullWidth
                  required
                  name="characteristic"
                  value={formData.characteristic}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Seed"
                  variant="outlined"
                  fullWidth
                  required
                  name="seed"
                  value={formData.seed}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Cook"
                  variant="outlined"
                  fullWidth
                  required
                  name="cook"
                  value={formData.cook}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Note"
                  variant="outlined"
                  fullWidth
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={formData.hasDist} onChange={handleChange} name="hasDist" />
                  }
                  label="Has dist"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasSeller}
                      onChange={handleChange}
                      name="hasSeller"
                    />
                  }
                  label="Has seller"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
