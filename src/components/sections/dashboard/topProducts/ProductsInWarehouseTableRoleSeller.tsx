import { Box, Button, LinearProgress, Stack } from '@mui/material';
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridEventListener,
  GridSlots,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridProductHeader from 'components/common/table/CustomDataGridHeader';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';
import {
  FlattenedProductInWarehouseRoleSeller,
  ProductInWarehouseRoleSeller,
  UserProfile,
} from 'data/dashboard/table';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import CreatingOrderFormDialog from '../modal/modalCreateOrderRoleSeller';
import ProducInWarehouseDetailModalRoleSeller from '../modal/modalProductInWarehouseDetailRoleSeller';

const fetchProducts = async (userId: number): Promise<FlattenedProductInWarehouseRoleSeller[]> => {
  const result: ProductInWarehouseRoleSeller[] = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/sellers/get-seller-warehouses/${userId}`,
  ).then((res) => {
    return res.json();
  });

  return flattenData(result);
};

function flattenData(
  items: ProductInWarehouseRoleSeller[],
): FlattenedProductInWarehouseRoleSeller[] {
  return items.map((item) => ({
    distributorWarehouseId: item.distributorWarehouseId,
    sellerWarehouseId: item.sellerWarehouseId,
    quantity: item.quantity,
    distributorName: item.distributor.name,
    distributorEmail: item.distributor.email,
    distributorPhoneNumber: item.distributor.phoneNumber,
    distributorAddress: item.distributor.address,
    distributorFax: item.distributor.fax,
    distributorStatus: item.distributor.status,
    distributorAvtUrl: item.distributor.avtUrl,
    supplierName: item.product?.supplier?.name ?? null,
    supplierEmail: item.product?.supplier?.email ?? null,
    supplierPhoneNumber: item.product?.supplier?.phoneNumber ?? null,
    supplierAddress: item.product?.supplier?.address ?? null,
    supplierFax: item.product?.supplier?.fax ?? null,
    supplierStatus: item.product?.supplier?.status ?? null,
    supplierAvtUrl: item.product?.supplier?.avtUrl ?? null,
    supplierTaxCode: item.product?.supplier?.taxCode ?? null,
    supplierEstablishment: item.product?.supplier?.establishment ?? null,
    supplierManager: item.product?.supplier?.manager ?? null,
    supplierActivated: item.product?.supplier?.activated ?? null,
    supplierDescription: item.product?.supplier?.description ?? null,
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
    productBrand: item.product?.productBrand,
    productOrigin: item.product?.productOrigin,
    productCertification: item.product?.productCertification,
    productWeight: item.product?.productWeight,
    productCommit: item.product?.productCommit,
    productPlanting: item.product?.productPlanting,
  }));
}
export const topProductsColumns: GridColDef<FlattenedProductInWarehouseRoleSeller>[] = [
  {
    field: 'orderProduct',
    renderCell: (params) => {
      const [open, setOpen] = useState(false);

      const onClose = () => {
        setOpen(false);

        // const orderId = params.row.id;
        // updateApproveOrderStatus.mutate({ orderId });
      };
      const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(true);
        // const orderId = params.row.id;
        // updateApproveOrderStatus.mutate({ orderId });
      };

      return (
        <Stack direction="row" spacing={2}>
          <Button onClick={handleButton} variant="contained">
            Order
          </Button>
          {open && <CreatingOrderFormDialog open={open} onClose={onClose} data={params.row} />}
        </Stack>
      );
    },
    headerName: 'Action',
    width: 100,
  },
  {
    field: 'productId',
    headerName: 'ProductID',
    width: 100,
  },

  {
    field: 'productName',
    headerName: 'Product Name',
    width: 100,
  },
  {
    field: 'distributorName',
    headerName: 'Distributor',
    width: 100,
  },
  {
    field: 'supplierName',
    headerName: 'Supplier',
    width: 100,
  },
  {
    field: 'sellerWarehouseId',
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

const ProductsOfSellerTable = () => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedData, setSelectedData] = useState<FlattenedProductInWarehouseRoleSeller | null>(
    null,
  );
  const [openProducInWarehouseDetailModal, setOpenProducInWarehouseDetailModal] = useState(false);

  const { data: productsData, isSuccess } = useQuery<FlattenedProductInWarehouseRoleSeller[]>({
    queryKey: ['productsSeller'],
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
  const handleOpenOrderDetailModal = (value: FlattenedProductInWarehouseRoleSeller) => {
    setSelectedData(value);
    setOpenProducInWarehouseDetailModal(true);
  };
  const handleClose = () => setOpenProducInWarehouseDetailModal(false);
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    handleOpenOrderDetailModal(params.row);
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
          onRowClick={handleRowClick}
          getRowId={(row) => row.sellerWarehouseId}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: false,
              includeHeaders: true,
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
              title: 'Current Products',
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
        {openProducInWarehouseDetailModal && (
          <ProducInWarehouseDetailModalRoleSeller
            open={openProducInWarehouseDetailModal}
            onClose={handleClose}
            data={selectedData}
          />
        )}
      </SimpleBar>
    </Box>
  );
};

export default ProductsOfSellerTable;
