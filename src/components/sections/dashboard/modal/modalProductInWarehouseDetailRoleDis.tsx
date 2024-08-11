// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  FlattenedItemAllProducstOfAllSuppliersResponse,
  SupplierProfile,
} from 'data/dashboard/table';
import { useQuery } from '@tanstack/react-query';
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
  productDetail?: FlattenedItemAllProducstOfAllSuppliersResponse | null;
  onClose: () => void;
}

const fetchSupplierProfile = async (supplierId?: number | null): Promise<SupplierProfile> =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/${supplierId}`).then((res) => {
    return res.json();
  });

export default function ProducInWarehouseDetailModal(props: Props) {
  const { onClose, open, productDetail } = props;
  const { data: supplierProfile, isError } = useQuery<SupplierProfile>({
    queryKey: ['supplierProfile', productDetail?.productSupplierId],
    queryFn: () => {
      return fetchSupplierProfile(productDetail?.productSupplierId);
    },
  });

  if (isError || !supplierProfile) {
    return <Typography>Lỗi tải dữ liệu nhà phân phối</Typography>;
  }

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
            Số lượng: {productDetail?.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đơn vị: {productDetail?.productWeight}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên sản phẩm: {productDetail?.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên thương hiệu: {productDetail?.productBrand}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Nguồn gốc sản phẩm: {productDetail?.productOrigin}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách trồng: {productDetail?.productPlanting}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đặc tính gạo: {productDetail?.productCharacteristic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Hạt giống: {productDetail?.productSeed}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách nấu: {productDetail?.productCook}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ghi chú: {productDetail?.productNote}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày trồng: {dayjs(productDetail?.productPlantingDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thu hoạch: {dayjs(productDetail?.productHarvestDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Chứng nhận sản phẩm: {productDetail?.productCertification}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cam kết sản phẩm: {productDetail?.productCommit}
          </Typography>

          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết nhà cung cấp
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            NCC: {supplierProfile.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {supplierProfile.phoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {supplierProfile.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {supplierProfile.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Fax: {supplierProfile.fax}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mã số thuế: {supplierProfile.taxCode}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thành lập: {supplierProfile.establishment}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Được quản lý bởi: {supplierProfile.manager}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Trạng thái hoạt động: {supplierProfile.activated}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mô tả công ty: {supplierProfile.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
