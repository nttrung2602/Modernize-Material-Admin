import { Button, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridEventListener,
  GridSlots,
  useGridApiRef,
} from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridHeader from 'components/common/table/CustomDataGridProductHeaderRoleDistributor';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';

// import { TransactionRowData, transactionTableData } from 'data/dashboard/table';
import dayjs from 'dayjs';

import {
  FlattenedOrderDataRoleSeller,
  OrderDataRoleSeller,
  UserProfile,
} from 'data/dashboard/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import OrderDetailRoleSellerModal from '../modal/modalOrderDetailRoleSeller';

export interface FlattenOrderData {
  status: string;
  id: number;
  distributorId: number;
  quantity: number;
  orderedDate: string;
  sentDate: string;
  receivedDate: number;
  warehouseId: number;
  productId: number;
  productName: string;
  productBrand: string;
  productOrigin: string;
  productCertification: string;
  productWeight: string;
  productCommit: string;
  productPlanting: string;
  productQuantity: number;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  image: string;
  plantingDate: string;
  harvestDate: string;
  supplierId: number;
}

const fetchOrdersDisAndSup = async (userId: number): Promise<FlattenedOrderDataRoleSeller[]> => {
  const result: OrderDataRoleSeller[] = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/sellers/distributor-transactions/${userId}`,
  ).then((res) => {
    return res.json();
  });
  return flattenData(result);
};

function flattenData(items: OrderDataRoleSeller[]): FlattenedOrderDataRoleSeller[] {
  return items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    distributorName: item.distributor.name,
    distributorEmail: item.distributor.email,
    distributorPhoneNumber: item.distributor.phoneNumber,
    distributorAddress: item.distributor.address,
    distributorFax: item.distributor.fax,
    distributorStatus: item.distributor.status,
    distributorAvtUrl: item.distributor.avtUrl,
    supplierName: item.product?.supplier.name ?? null,
    supplierEmail: item.product?.supplier.email ?? null,
    supplierPhoneNumber: item.product?.supplier.phoneNumber ?? null,
    supplierAddress: item.product?.supplier.address ?? null,
    supplierFax: item.product?.supplier.fax ?? null,
    supplierStatus: item.product?.supplier.status ?? null,
    supplierAvtUrl: item.product?.supplier.avtUrl ?? null,
    supplierTaxCode: item.product?.supplier.taxCode ?? null,
    supplierEstablishment: item.product?.supplier.establishment ?? null,
    supplierManager: item.product?.supplier.manager ?? null,
    supplierActivated: item.product?.supplier.activated ?? null,
    supplierDescription: item.product?.supplier.description ?? null,
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
    productBrand: item.product?.productBrand ?? null,
    productOrigin: item.product?.productOrigin ?? null,
    productCertification: item.product?.productCertification ?? null,
    productWeight: item.product?.productWeight ?? null,
    productCommit: item.product?.productCommit ?? null,
    productPlanting: item.product?.productPlanting ?? null,
    status: item.status,
    orderedDate: item.orderedDate,
    receivedDate: item.receivedDate ?? null,
    sentDate: item.sentDate ?? null,
  }));
}
const handleReceiveOrderStatus = async (orderId: number) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/sellers/received/${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });

export const orderColumns: GridColDef<FlattenedOrderDataRoleSeller>[] = [
  {
    field: 'id',
    renderCell: (params) => {
      return <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>;
    },
    headerName: 'Order ID',
    width: 100,
  },
  {
    field: 'productName',
    headerName: 'Product Name',
    width: 100,
  },
  {
    field: 'orderedDate',
    headerName: 'Ordered Date',
    width: 100,
    valueFormatter: (params) => dayjs(params).format('DD.MM.YYYY'),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
  {
    field: 'sentDate',
    headerName: 'Send Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
  {
    field: 'receivedDate',
    headerName: 'Receive Date',
    width: 100,
    valueFormatter: (params) => (params ? dayjs(params).format('DD.MM.YYYY') : ''),
    sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
  },
  { field: 'quantity', headerName: 'Amount', width: 100 },
  {
    field: 'status',
    renderCell: (params) => {
      let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' =
        'default';

      switch (params.value) {
        case 'received':
        case 'approved':
          color = 'success';
          break;
        case 'pending':
        case 'sending':
          color = 'default';
          break;
        case 'cancel':
          color = 'error';
          break;
        default:
          break;
      }

      return <Chip label={params.value} color={color} />;
    },
    headerName: 'Status',
    width: 100,
  },
  {
    field: 'changeStatus',
    renderCell: (params) => {
      const colors: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' =
        'success';
      const [receiveButton, setReceiveButton] = useState(true);
      const queryClient = useQueryClient();
      useEffect(() => {
        if (params.row.status !== 'sending') {
          setReceiveButton(false);
        }
      }, [params.row.status]);

      const updateReceiveOrderStatus = useMutation({
        mutationFn: ({ orderId }: { orderId: number }) => handleReceiveOrderStatus(orderId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['ordersSupplier'],
          });
          toast.success(`Reject Order ${params.row.id} successful!`);
        },
      });

      const handleReceiveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;

        updateReceiveOrderStatus.mutate({ orderId });
      };

      return (
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleReceiveButton}
            variant="contained"
            color={colors}
            disabled={!receiveButton}
          >
            Receive
          </Button>
        </Stack>
      );
    },
    headerName: 'Action',
    width: 100,
  },
];

const OrdersFromSellerToDisTable = () => {
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [selectedData, setSelectedData] = useState<FlattenedOrderDataRoleSeller | null>(null);
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isError, isLoading, data, isSuccess } = useQuery<FlattenedOrderDataRoleSeller[]>({
    queryKey: ['ordersDistributor'],
    queryFn: () => fetchOrdersDisAndSup(user!.id),
    // staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      apiRef.current.setRows(data);
    }
  }, [apiRef, data]);

  useEffect(() => {
    if (isSuccess) {
      apiRef.current.setQuickFilterValues([searchText]);
    }
  }, [searchText, apiRef]);

  // if (isSuccess) {
  //   console.log('data order nèeee', data);
  // }
  if (isLoading) {
    return <Typography variant="h1">Đang tải dữ liệu</Typography>;
  }
  if (isError || !data) {
    return <Typography>Lỗi tải dữ liệu</Typography>;
  }

  const handleOpenOrderDetailModal = (value: FlattenedOrderDataRoleSeller) => {
    setSelectedData(value);
    setOpenOrderDetailModal(true);
  };

  const handleClose = () => setOpenOrderDetailModal(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearchText(searchValue);
    if (searchValue === '') {
      apiRef.current.setRows(data);
    }
  };
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    handleOpenOrderDetailModal(params.row);
  };

  return (
    <Stack
      sx={{
        overflow: 'auto',
        // minHeight: 0,
        position: 'relative',
        height: { xs: 'auto', sm: 1 },
        width: 1,
      }}
    >
      <SimpleBar>
        <DataGrid
          onRowClick={handleRowClick}
          autoHeight={false}
          rowHeight={52}
          columns={orderColumns}
          loading={false}
          apiRef={apiRef}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
              expand: true,
            });
          }}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
            pagination: CustomDataGridFooter,
            toolbar: CustomDataGridHeader,
            noResultsOverlay: CustomDataGridNoRows,
          }}
          slotProps={{
            toolbar: {
              title: 'My Orders',
              flag: 'user',
              value: searchText,
              onChange: handleChange,
              clearSearch: () => setSearchText(''),
            },
            pagination: { labelRowsPerPage: data.length },
          }}
          initialState={{ pagination: { paginationModel: { page: 1, pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            boxShadow: 1,
            px: 3,
            borderColor: 'active.selected',
            height: 1,
            width: 1,
            tableLayout: 'fixed',
          }}
        />
        {openOrderDetailModal && (
          <OrderDetailRoleSellerModal
            open={openOrderDetailModal}
            onClose={handleClose}
            data={selectedData}
          />
        )}
      </SimpleBar>
    </Stack>
  );
};

export default OrdersFromSellerToDisTable;
