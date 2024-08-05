import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridProductHeader from 'components/common/table/CustomDataGridHeader';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';
import {
  FlattenedItemInProductRoleDis,
  ProductTypeOfRoleDis,
  UserProfile,
} from 'data/dashboard/table';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

const fetchProducts = async (userId: number): Promise<FlattenedItemInProductRoleDis[]> => {
  const result: ProductTypeOfRoleDis[] = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/distributors/get-warehouses/${userId}`,
  ).then((res) => {
    return res.json();
  });
  return flattenData(result);
};

function flattenData(items: ProductTypeOfRoleDis[]): FlattenedItemInProductRoleDis[] {
  return items.map((item) => ({
    distributorWarehouseId: item.distributorWarehouseId,
    quantity: item.quantity,
    distributorName: item.distributor.name,
    distributorEmail: item.distributor.email,
    distributorPhoneNumber: item.distributor.phoneNumber,
    distributorAddress: item.distributor.address,
    distributorFax: item.distributor.fax,
    distributorStatus: item.distributor.status,
    distributorAvtUrl: item.distributor.avtUrl,
    productId: item.product?.productId ?? null,
    productName: item.product?.productName ?? null,
    productQuantity: item.product?.quantity ?? null,
    productCharacteristic: item.product?.characteristic ?? null,
    productSeed: item.product?.seed ?? null,
    productCook: item.product?.cook ?? null,
    productNote: item.product?.note ?? null,
    productImage: item.product?.image ?? null,
    productPlantingDate: item.product?.plantingDate ?? null,
    productHarvestDate: item.product?.harvestDate ?? null,
    productSupplierId: item.product?.supplierId ?? null,
  }));
}
export const topProductsColumns: GridColDef<FlattenedItemInProductRoleDis>[] = [
  {
    field: 'productId',
    headerName: 'ProductID',
    maxWidth: 100,
  },
  {
    field: 'productName',
    headerName: 'Product Name',
    maxWidth: 100,
  },
  {
    field: 'distributorWarehouseId',
    headerName: 'WarehouseId',
    width: 100,
  },
  { field: 'quantity', headerName: 'Quantity', width: 100 },

  {
    field: 'productCharacteristic',
    headerName: 'Characteristic',
    width: 100,
  },
  { field: 'productSeed', headerName: 'Seed', width: 100 },
  { field: 'productCook', headerName: 'Cook', width: 100 },
  { field: 'productNote', headerName: 'Note', width: 100 },
  {
    field: 'productPlantingDate',
    headerName: 'Planting Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
  {
    field: 'productHarvestDate',
    headerName: 'Harvest Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
];

const ProductsOfDistributorTable = () => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { data: productsData, isSuccess } = useQuery<FlattenedItemInProductRoleDis[]>({
    queryKey: ['productsDistributor'],
    queryFn: () => fetchProducts(user!.id),
    initialData: [],
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
          getRowId={(row) => row.distributorWarehouseId}
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
              title: 'Top Products',
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

export default ProductsOfDistributorTable;
