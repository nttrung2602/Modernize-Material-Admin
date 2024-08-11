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
  DistributorWarehouse,
  FlattenedItemAllProducstOfAllDistributorResponse,
} from 'data/dashboard/table';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import ProducInWarehouseDetailModalRoleSeller from './sections/dashboard/modal/modalProductInWarehouseDetailRoleSellerV2';
import CreatingOrderFormDialog from './sections/dashboard/modal/modalCreateOrderRoleSellerV2';

const fetchProducts = async (): Promise<FlattenedItemAllProducstOfAllDistributorResponse[]> => {
  const result: DistributorWarehouse[] = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/sellers/get-distributor-warehourses`,
  ).then((res) => {
    return res.json();
  });
  return flattenData(result);
};

function flattenData(
  items: DistributorWarehouse[],
): FlattenedItemAllProducstOfAllDistributorResponse[] {
  return items.map((item) => ({
    warehouseId: item.warehouseId,
    quantity: item.quantity,
    distributorName: item.distributor.name,
    distributorEmail: item.distributor.email,
    distributorPhoneNumber: item.distributor.phoneNumber,
    distributorAddress: item.distributor.address,
    distributorFax: item.distributor.fax,
    distributorStatus: item.distributor.status,
    distributorAvtUrl: item.distributor.avtUrl,
    supplierName: item.supToDis.product?.supplier.name ?? null,
    supplierEmail: item.supToDis.product?.supplier.email ?? null,
    supplierPhoneNumber: item.supToDis.product?.supplier.phoneNumber ?? null,
    supplierAddress: item.supToDis.product?.supplier.address ?? null,
    supplierFax: item.supToDis.product?.supplier.fax ?? null,
    supplierStatus: item.supToDis.product?.supplier.status ?? null,
    supplierAvtUrl: item.supToDis.product?.supplier.avtUrl ?? null,
    supplierTaxCode: item.supToDis.product?.supplier.taxCode ?? null,
    supplierEstablishment: item.supToDis.product?.supplier.establishment ?? null,
    supplierManager: item.supToDis.product?.supplier.manager ?? null,
    supplierActivated: item.supToDis.product?.supplier.activated ?? null,
    supplierDescription: item.supToDis.product?.supplier.description ?? null,
    productId: item.supToDis.product?.productId,
    productName: item.supToDis.product?.productName,
    productQuantity: item.supToDis.product?.quantity,
    productCharacteristic: item.supToDis.product?.characteristic,
    productSeed: item.supToDis.product?.seed,
    productCook: item.supToDis.product?.cook,
    productNote: item.supToDis.product?.note,
    productImage: item.supToDis.product?.image,
    productPlantingDate: item.supToDis.product?.plantingDate,
    productHarvestDate: item.supToDis.product?.harvestDate,
    productSupplierId: item.supToDis.product?.supplierId,
    productBrand: item.supToDis.product?.productBrand,
    productOrigin: item.supToDis.product?.productOrigin,
    productCertification: item.supToDis.product?.productCertification,
    productWeight: item.supToDis.product?.productWeight,
    productCommit: item.supToDis.product?.productCommit,
    productPlanting: item.supToDis.product?.productPlanting,
  }));
}
export const topProductsColumns: GridColDef<FlattenedItemAllProducstOfAllDistributorResponse>[] = [
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

const AllProductsOfAllDistributor = () => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [selectedData, setSelectedData] =
    useState<FlattenedItemAllProducstOfAllDistributorResponse | null>(null);
  const [openProducInWarehouseDetailModal, setOpenProducInWarehouseDetailModal] = useState(false);

  const { data: productsData, isSuccess } = useQuery<
    FlattenedItemAllProducstOfAllDistributorResponse[]
  >({
    queryKey: ['allProductsOfAllDistributor'],
    queryFn: () => fetchProducts(),
    initialData: [],
  });

  if (isSuccess) {
    console.log('data2', productsData);
  }

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
  const handleOpenOrderDetailModal = (value: FlattenedItemAllProducstOfAllDistributorResponse) => {
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
          getRowId={(row) => row.warehouseId!}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
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

export default AllProductsOfAllDistributor;
