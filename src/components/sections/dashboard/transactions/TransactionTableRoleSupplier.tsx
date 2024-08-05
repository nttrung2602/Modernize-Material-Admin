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
import CustomDataGridHeader from 'components/common/table/CustomDataGridHeader';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';

// import { TransactionRowData, transactionTableData } from 'data/dashboard/table';
import dayjs from 'dayjs';

import { OrderData, UserProfile } from 'data/dashboard/table';
import OrderDetailModal from '../modal/modalOrderDetail';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchOrders = async (userId: number): Promise<OrderData[]> =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/transactions/${userId}`).then(
    (res) => {
      return res.json();
    },
  );

const handleSendingOrderStatus = async (
  orderId: number,
  productId: number,
  distributorId: number,
  quantity: number,
) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/send-product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: orderId,
      productId: productId,
      distributorId: distributorId,
      quantity: quantity,
    }),
  }).then((res) => {
    return res.json();
  });

const handleRejectOrderStatus = async (orderId: number) => {
  console.log('orderid', orderId);
  return await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/reject`, {
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
};
// await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/send-product`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     id: orderId,
//   }),
// }).then((res) => {
//   return res.json();
// });

const handleApproveOrderStatus = async (orderId: number) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/approve`, {
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

export const orderColumns: GridColDef<OrderData>[] = [
  {
    field: 'id',
    renderCell: (params) => {
      return <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>;
    },
    headerName: 'Order ID',
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
      const [approvedButton, setApproveButton] = useState(true);
      const [sendingButton, setSendingButton] = useState(true);
      const [canceledButton, setCanceledButton] = useState(true);
      const queryClient = useQueryClient();
      useEffect(() => {
        if (params.row.status === 'pending') {
          setSendingButton(false);
        } else if (params.row.status === 'approved') {
          setApproveButton(false);
          setSendingButton(true);
          setCanceledButton(false);
        } else if (
          params.row.status === 'received' ||
          params.row.status === 'sending' ||
          params.row.status === 'rejected'
        ) {
          setApproveButton(false);
          setSendingButton(false);
          setCanceledButton(false);
        }
      }, [params.row.status]);

      const updateSendingOrderStatus = useMutation({
        mutationFn: ({
          orderId,
          productId,
          distributorId,
          quantity,
        }: {
          orderId: number;
          productId: number;
          distributorId: number;
          quantity: number;
        }) => handleSendingOrderStatus(orderId, productId, distributorId, quantity),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['orders'],
          });
          toast.success(`Update Order ${params.row.id} successful!`);
        },
      });
      const updateRejectOrderStatus = useMutation({
        mutationFn: ({ orderId }: { orderId: number }) => handleRejectOrderStatus(orderId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['orders'],
          });
          toast.success(`Approve Order ${params.row.id} successful!`);
        },
      });

      const updateApproveOrderStatus = useMutation({
        mutationFn: ({ orderId }: { orderId: number }) => handleApproveOrderStatus(orderId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['orders'],
          });
          toast.success(`Reject Order ${params.row.id} successful!`);
        },
      });

      const handleSendingButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;
        const productId = params.row.product.productId;
        const distributorId = params.row.distributorId;
        const quantity = params.row.quantity;
        updateSendingOrderStatus.mutate({ orderId, productId, distributorId, quantity });
      };
      const handleApproveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;

        updateApproveOrderStatus.mutate({ orderId });
      };
      const handleRejectButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;

        updateRejectOrderStatus.mutate({ orderId });
      };
      return (
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleApproveButton}
            variant="contained"
            color={colors}
            disabled={!approvedButton}
          >
            Approve
          </Button>
          <Button
            onClick={handleSendingButton}
            variant="contained"
            color={colors}
            disabled={!sendingButton}
          >
            Send
          </Button>
          <Button
            onClick={handleRejectButton}
            variant="contained"
            color="error"
            disabled={!canceledButton}
          >
            Cancel
          </Button>
        </Stack>
      );
    },
    headerName: 'Action',
    width: 100,
  },
];

const OrdersDistributorsTable = () => {
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [selectedData, setSelectedData] = useState<OrderData | null>(null);
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isError, isLoading, data, isSuccess } = useQuery<OrderData[]>({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(user!.id),
    initialData: [],
    enabled: user !== undefined,
    // staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);
  // apiRef.current.selectRow;
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

  const handleOpenOrderDetailModal = (value: OrderData) => {
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
          getRowId={(row) => row.id}
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
              title: 'Orders',
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

export default OrdersDistributorsTable;
