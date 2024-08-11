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

import { OrderData, UserProfile } from 'data/dashboard/table';
import OrderDetailModal from '../modal/modalOrderDetail';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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

const fetchOrdersDisAndSup = async (userId: number): Promise<FlattenOrderData[]> => {
  const result: OrderData[] = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/distributors/supplier-transactionId/${userId}`,
  ).then((res) => {
    return res.json();
  });
  return flattenData(result);
};

export function flattenData(items: OrderData[]): FlattenOrderData[] {
  return items.map((item) => ({
    status: item.status,
    id: item.id,
    quantity: item.quantity,
    distributorId: item.distributorId,
    orderedDate: item.orderedDate,
    sentDate: item.sentDate,
    receivedDate: item.receivedDate,
    warehouseId: item.warehouseId,
    productId: item.product?.productId ?? null,
    productName: item.product?.productName ?? null,
    productQuantity: item.product?.quantity ?? null,
    characteristic: item.product?.characteristic ?? null,
    seed: item.product?.seed ?? null,
    cook: item.product?.cook ?? null,
    note: item.product?.note ?? null,
    image: item.product?.image ?? null,
    plantingDate: item.product?.plantingDate ?? null,
    harvestDate: item.product?.harvestDate ?? null,
    supplierId: item.product?.supplierId ?? null,
    productBrand: item.product?.productBrand,
    productOrigin: item.product?.productOrigin,
    productCertification: item.product?.productCertification,
    productWeight: item.product?.productWeight,
    productCommit: item.product?.productCommit,
    productPlanting: item.product?.productPlanting,
  }));
}
const handleReceiveOrderStatus = async (orderId: number) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/received`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: orderId,
    }),
  }).then((res) => {
    return res.json();
  });

export const orderColumns: GridColDef<FlattenOrderData>[] = [
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

const OrdersSuppliersTable = () => {
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [selectedData, setSelectedData] = useState<FlattenOrderData | null>(null);
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isError, isLoading, data, isSuccess } = useQuery<FlattenOrderData[]>({
    queryKey: ['ordersSupplier'],
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

  const handleOpenOrderDetailModal = (value: FlattenOrderData) => {
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
              title: "Supplier's Orders",
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
          <OrderDetailModal
            open={openOrderDetailModal}
            onClose={handleClose}
            orderDetail={selectedData}
          />
        )}
      </SimpleBar>
    </Stack>
  );
};

export default OrdersSuppliersTable;
