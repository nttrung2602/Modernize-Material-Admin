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

import dayjs from 'dayjs';

import { OrderSellerData, UserProfile } from 'data/dashboard/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import OrderDetailModalRoleDis from '../modal/modalOrderSellerDetailRoleDis';

const fetchSellersOrders = async (userId: number): Promise<OrderSellerData[]> =>
  await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/distributors/seller-transactions/${userId}`,
  ).then((res) => {
    return res.json();
  });

const handleSendingOrderStatus = async (
  orderId: number,
  warehouseId: number,
  sellerId: number,
  quantity: number,
) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/send-to-seller`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: orderId,
      warehouseId: warehouseId,
      sellerId: sellerId,
      quantity: quantity,
    }),
  }).then((res) => {
    return res.json();
  });
const handleRejectOrderStatus = async (
  orderId: number,
  warehouseId: number,
  sellerId: number,
  quantity: number,
) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: orderId,
      warehouseId: warehouseId,
      sellerId: sellerId,
      quantity: quantity,
    }),
  }).then((res) => {
    return res.json();
  });

const handleApproveOrderStatus = async (orderId: number) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/approved`, {
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

export const orderColumns: GridColDef<OrderSellerData>[] = [
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
      const [approveButton, setApproveButton] = useState(true);
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
          warehouseId,
          sellerId,
          quantity,
        }: {
          orderId: number;
          warehouseId: number;
          sellerId: number;
          quantity: number;
        }) => handleSendingOrderStatus(orderId, warehouseId, sellerId, quantity),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['ordersSeller'],
          });
          toast.success(`Update Order ${params.row.id} successful!`);
        },
      });
      const updateRejectOrderStatus = useMutation({
        mutationFn: ({
          orderId,
          warehouseId,
          sellerId,
          quantity,
        }: {
          orderId: number;
          warehouseId: number;
          sellerId: number;
          quantity: number;
        }) => handleRejectOrderStatus(orderId, warehouseId, sellerId, quantity),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['ordersSeller'],
          });
          toast.success(`Reject Order ${params.row.id} successful!`);
        },
      });

      const updateApproveOrderStatus = useMutation({
        mutationFn: ({ orderId }: { orderId: number }) => handleApproveOrderStatus(orderId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['ordersSeller'],
          });
          toast.success(`Reject Order ${params.row.id} successful!`);
        },
      });

      const handleSendingButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;
        const warehouseId = params.row.distributorWarehouseId;
        const sellerId = params.row.sellerId;
        const quantity = params.row.quantity;
        updateSendingOrderStatus.mutate({ orderId, warehouseId, sellerId, quantity });
      };
      const handleApproveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;

        updateApproveOrderStatus.mutate({ orderId });
      };

      const handleRejectButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const orderId = params.row.id;
        const warehouseId = params.row.distributorWarehouseId;
        const sellerId = params.row.sellerId;
        const quantity = params.row.quantity;
        updateRejectOrderStatus.mutate({ orderId, warehouseId, sellerId, quantity });
      };

      return (
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleApproveButton}
            variant="contained"
            color={colors}
            disabled={!approveButton}
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

const OrdersSellerTable = () => {
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [selectedData, setSelectedData] = useState<OrderSellerData | null>(null);
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<GridApi>();
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isError, isLoading, data, isSuccess } = useQuery<OrderSellerData[]>({
    queryKey: ['ordersSeller'],
    queryFn: () => fetchSellersOrders(user!.id),
    // staleTime: 1000 * 60 * 5,
  });
  // apiRef.current.selectRow;
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

  const handleOpenOrderDetailModal = (value: OrderSellerData) => {
    setSelectedData(value);
    // setOpenOrderDetailModal(true);
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
              title: "Seller's Orders",
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
          <OrderDetailModalRoleDis
            open={openOrderDetailModal}
            onClose={handleClose}
            orderDetail={selectedData}
          />
        )}
      </SimpleBar>
    </Stack>
  );
};

export default OrdersSellerTable;
