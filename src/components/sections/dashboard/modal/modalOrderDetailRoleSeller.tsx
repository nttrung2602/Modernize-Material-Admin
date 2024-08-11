// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FlattenedOrderDataRoleSeller } from 'data/dashboard/table';
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
  data?: FlattenedOrderDataRoleSeller | null;
  onClose: () => void;
}

export default function OrderDetailRoleSellerModal(props: Props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết đơn hàng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mã đơn hàng: {props.data?.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Số lượng: {props.data?.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đơn vị: {props.data?.productWeight}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên sản phẩm: {props.data?.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên thương hiệu: {props.data?.productBrand}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Nguồn gốc sản phẩm: {props.data?.productOrigin}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách trồng: {props.data?.productPlanting}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đặc tính gạo: {props.data?.productCharacteristic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Hạt giống: {props.data?.productSeed}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách nấu: {props.data?.productCook}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ghi chú: {props.data?.productNote}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày trồng: {dayjs(props.data?.productPlantingDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thu hoạch: {dayjs(props.data?.productHarvestDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Chứng nhận sản phẩm: {props.data?.productCertification}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cam kết sản phẩm: {props.data?.productCommit}
          </Typography>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết nhà phân phối
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên NPP: {props.data?.distributorName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Trạng thái hoạt động: {props.data?.distributorStatus}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {props.data?.distributorEmail}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Fax: {props.data?.distributorFax}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {props.data?.distributorPhoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {props.data?.distributorAddress}
          </Typography>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết nhà cung cấp
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            NCC: {props.data?.supplierName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {props.data?.supplierPhoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {props.data?.supplierAddress}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {props.data?.supplierEmail}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Fax: {props.data?.supplierFax}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mã số thuế: {props.data?.supplierTaxCode}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thành lập: {props.data?.supplierEstablishment}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Được quản lý bởi: {props.data?.supplierManager}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Trạng thái hoạt động: {props.data?.supplierActivated}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mô tả công ty: {props.data?.supplierDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
