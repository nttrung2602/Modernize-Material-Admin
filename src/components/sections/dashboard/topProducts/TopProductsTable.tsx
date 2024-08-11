import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridProductHeader from 'components/common/table/CustomDataGridProductHeaderRoleDSup';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';
import { ProductType, UserProfile } from 'data/dashboard/table';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

const fetchProducts = async (userId: number): Promise<ProductType[]> =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/products/${userId}`).then(
    (res) => {
      return res.json();
    },
  );

export const topProductsColumns: GridColDef<ProductType>[] = [
  { field: 'productId', headerName: 'ProductID', maxWidth: 100 },
  { field: 'productName', headerName: 'Name Product', width: 100 },

  { field: 'characteristic', headerName: 'Characteristic', width: 100 },
  { field: 'seed', headerName: 'Seed', width: 100 },
  { field: 'cook', headerName: 'Cook', width: 100 },
  { field: 'note', headerName: 'Note', width: 100 },
  {
    field: 'plantingDate',
    headerName: 'Planting Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
  {
    field: 'harvestDate',
    headerName: 'Harvest Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
];

const ProductsOfSupplierTable = () => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { data: productsData, isSuccess } = useQuery<ProductType[]>({
    queryKey: ['productsSupplier'],
    queryFn: () => fetchProducts(user!.id),
    initialData: [],
    enabled: user !== undefined,
  });

  if (isSuccess) {
    console.log('data', productsData);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      apiRef.current.setRows(productsData);
    }
  }, [apiRef, productsData]);

  useEffect(() => {
    apiRef.current.setQuickFilterValues([searchText]);
  }, [searchText, apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearchText(searchValue);
    if (searchValue === '') {
      apiRef.current.setRows(productsData);
    }
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        minHeight: 0,
        position: 'relative',
        height: { xs: 'auto', sm: 1 },
        width: 1,
      }}
    >
      <SimpleBar>
        <DataGrid
          getRowId={(row) => row.productId}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
            });
          }}
          autoHeight={false}
          columns={topProductsColumns}
          rowHeight={52}
          loading={false}
          apiRef={apiRef}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
            pagination: CustomDataGridFooter,
            toolbar: CustomDataGridProductHeader,
            noResultsOverlay: CustomDataGridNoRows,
          }}
          slotProps={{
            toolbar: {
              title: 'Products',
              flag: 'products',
              value: searchText,
              onChange: handleChange,
              clearSearch: () => {
                setSearchText('');
                apiRef.current.setRows(productsData);
              },
            },
            pagination: { labelRowsPerPage: productsData.length },
          }}
          initialState={{ pagination: { paginationModel: { page: 1, pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            boxShadow: 1,
            px: 3,
            borderColor: 'common.white',
            overflow: 'auto',
            height: 1,
            width: 1,
          }}
        />
      </SimpleBar>
    </Box>
  );
};

export default ProductsOfSupplierTable;
