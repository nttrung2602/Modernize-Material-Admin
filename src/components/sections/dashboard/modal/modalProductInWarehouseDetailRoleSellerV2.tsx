// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FlattenedItemAllProducstOfAllDistributorResponse } from 'data/dashboard/table';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '700px',
  overflow: 'scroll',
};

interface Props {
  open: boolean;
  data?: FlattenedItemAllProducstOfAllDistributorResponse | null;
  onClose: () => void;
}

// const fetchSupplierProfile = async (supplierId?: number | null): Promise<SupplierProfile> =>
//   await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/${supplierId}`).then((res) => {
//     return res.json();
//   });

export default function ProducInWarehouseDetailModalRoleSeller(props: Props) {
  const { onClose, open, data } = props;
  // const { data: supplierProfile, isError } = useQuery<SupplierProfile>({
  //   queryKey: ['supplierProfile', productDetail?.productSupplierId],
  //   queryFn: () => {
  //     return fetchSupplierProfile(productDetail?.productSupplierId);
  //   },
  // });

  // if (isError || !supplierProfile) {
  //   return <Typography>Lỗi tải dữ liệu nhà phân phối</Typography>;
  // }

  const handleClose = () => onClose();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết sản phẩm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Số lượng: {data?.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đơn vị: {data?.productWeight}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên sản phẩm: {data?.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên thương hiệu: {data?.productBrand}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Nguồn gốc sản phẩm: {data?.productOrigin}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách trồng: {data?.productPlanting}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đặc tính gạo: {data?.productCharacteristic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Hạt giống: {data?.productSeed}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách nấu: {data?.productCook}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ghi chú: {data?.productNote}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày trồng: {dayjs(data?.productPlantingDate).format('DD/MM/YYYY') || ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thu hoạch: {dayjs(data?.productHarvestDate).format('DD/MM/YYYY') || ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Chứng nhận sản phẩm: {data?.productCertification}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cam kết sản phẩm: {data?.productCommit}
          </Typography>

          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết nhà phân phối
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên NPP: {data?.distributorName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {data?.distributorEmail}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Fax: {data?.distributorFax}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {data?.distributorPhoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {data?.distributorAddress}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Trạng thái hoạt động: {data?.distributorStatus}
          </Typography>

          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết nhà cung cấp
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            NCC: {data?.supplierName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {data?.supplierPhoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {data?.supplierAddress}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {data?.supplierAddress}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Fax: {data?.supplierFax}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mã số thuế: {data?.supplierTaxCode}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thành lập: {data?.supplierEstablishment}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Được quản lý bởi: {data?.supplierManager}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Trạng thái hoạt động: {data?.supplierActivated}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mô tả công ty: {data?.supplierDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
