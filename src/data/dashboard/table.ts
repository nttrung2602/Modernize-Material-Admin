// import product1 from 'assets/images/products/product-1.png';
// import product2 from 'assets/images/products/product-2.png';
// import product3 from 'assets/images/products/product-3.png';
// import product4 from 'assets/images/products/product-4.png';
// import product5 from 'assets/images/products/product-5.png';
import { uniqueId } from 'lodash';

export interface TransactionRowData {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
}

export interface ItemType {
  title: string;
  image?: string;
}

export interface DistributorProfileType {
  distributorId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  fax: string;
  status: string;
  avtUrl: string;
}
export interface OrderData {
  id: number;
  distributorId: number;
  quantity: number;
  orderedDate: string;
  sentDate: string;
  receivedDate: number;
  warehouseId: number;
  product: ProductType;
  status: 'pending' | 'sending' | 'received' | 'rejected' | 'approved';
}

export interface DistributorProfile {
  role: string;
  distributorId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  fax: string;
  status: boolean;
  avtUrl: string;
}
export interface SupplierProfile {
  supplierId: number;
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  fax: string;
  status: boolean;
  avtUrl: string;
  taxCode: string;
  establishment: string;
  manager: string;
  activated: string;
  description: string;
}

export interface UserProfile {
  role: string;
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  fax: string;
  status: boolean;
}
export interface OrderSellerData {
  id: number;
  distributorWarehouseId: number;
  quantity: number;
  sellerId: number;
  orderedDate: string;
  sentDate: string;
  receivedDate: number;
  sellerWarehouseId: number;
  product: ProductType;
  status: 'pending' | 'sending' | 'received' | 'rejected' | 'approved';
}
export interface ProductType {
  productId: number;
  productName: string;
  productBrand: string;
  productOrigin: string;
  productCertification: string;
  productWeight: string;
  productCommit: string;
  productPlanting: string;
  quantity: number;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  image: string;
  plantingDate: string;
  harvestDate: string;
  supplierId: number;
}
export interface ProductTypeOfRoleDis {
  distributorWarehouseId: number;
  quantity: number;
  product: ProductType;
  distributor: DistributorProfile;
  supplier: SupplierProfile;
}
// export interface UpdatedOrderInfoData {
//   id: number;
//   productId: number;
//   distributorId: string;
//   quantity: number;
// }
export interface AllProducstOfAllSuppliersResponse {
  productId: number;
  productName: string;
  productBrand: string;
  productOrigin: string;
  productCertification: string;
  productWeight: string;
  productCommit: string;
  productPlanting: string;
  quantity: number;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  image: string;
  plantingDate: string;
  harvestDate: string;
  supplierId: number;
  supplier: SupplierProfile;
}

export interface FlattenedItemInProductRoleDis {
  distributorWarehouseId: number;
  quantity: number;
  distributorName: string;
  distributorEmail: string;
  distributorPhoneNumber: string;
  distributorAddress: string;
  distributorFax: string;
  distributorStatus: boolean;
  distributorAvtUrl: string;
  supplierName: string;
  supplierEmail: string;
  supplierPhoneNumber: string;
  supplierAddress: string;
  supplierFax: string;
  supplierStatus: boolean;
  supplierAvtUrl: string;
  productId: number | null;
  productName: string | null;
  productQuantity: number | null;
  productCharacteristic: string | null;
  productSeed: string | null;
  productCook: string | null;
  productNote: string | null;
  productImage: string | null;
  productPlantingDate: string | null;
  productHarvestDate: string | null;
  productSupplierId: number | null;
  productBrand: string | null;
  productOrigin: string | null;
  productCertification: string | null;
  productWeight: string | null;
  productCommit: string | null;
  productPlanting: string | null;
}

export interface FlattenedItemAllProducstOfAllSuppliersResponse {
  quantity: number;
  supplierName: string;
  supplierEmail: string;
  supplierPhoneNumber: string;
  supplierAddress: string;
  supplierFax: string;
  supplierStatus: boolean;
  supplierAvtUrl: string;
  productId: number | null;
  productName: string | null;
  productQuantity: number | null;
  productCharacteristic: string | null;
  productSeed: string | null;
  productCook: string | null;
  productNote: string | null;
  productImage: string | null;
  productPlantingDate: string | null;
  productHarvestDate: string | null;
  productSupplierId: number | null;
  productBrand: string | null;
  productOrigin: string | null;
  productCertification: string | null;
  productWeight: string | null;
  productCommit: string | null;
  productPlanting: string | null;
}

export interface FlattenedOrderDataRoleSeller {
  id: number;
  quantity: number;
  distributorName: string;
  distributorEmail: string;
  distributorPhoneNumber: string;
  distributorAddress: string;
  distributorFax: string;
  distributorStatus: boolean;
  distributorAvtUrl: string;
  supplierName: string | null;
  supplierEmail: string | null;
  supplierPhoneNumber: string | null;
  supplierAddress: string | null;
  supplierFax: string | null;
  supplierStatus: boolean | null;
  supplierAvtUrl: string | null;
  supplierTaxCode: string | null;
  supplierEstablishment: string | null;
  supplierManager: string | null;
  supplierActivated: string | null;
  supplierDescription: string | null;
  productName: string | null;
  productQuantity: number | null;
  productCharacteristic: string | null;
  productSeed: string | null;
  productCook: string | null;
  productNote: string | null;
  productImage: string | null;
  productPlantingDate: string | null;
  productHarvestDate: string | null;
  productSupplierId: number | null;
  productBrand: string | null;
  productOrigin: string | null;
  productCertification: string | null;
  productWeight: string | null;
  productCommit: string | null;
  productPlanting: string | null;
  status: string;
  orderedDate: string;
  receivedDate: string | null;
  sentDate: string | null;
}

export interface OrderDataRoleSeller {
  id: number;
  distributorWarehouseId: number;
  distributor: DistributorProfile;
  product?: ProductTypeInRoleSeller;
  sellerId: number;
  quantity: number;
  orderedDate: string;
  sentDate: string;
  receivedDate?: string;
  status: string;
  sellerWarehouseId: number;
}

export interface ProductTypeInRoleSeller {
  productId: number;
  productName: string;
  productBrand: string;
  productOrigin: string;
  productCertification: string;
  productWeight: string;
  productCommit: string;
  productPlanting: string;
  quantity: number;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  image: string;
  plantingDate: string;
  harvestDate: string;
  supplierId: number;
  supplier: SupplierProfile;
}

export interface FlattenedProductInWarehouseRoleSeller {
  sellerWarehouseId: number;
  distributorWarehouseId: number;
  quantity: number;
  distributorName: string;
  distributorEmail: string;
  distributorPhoneNumber: string;
  distributorAddress: string;
  distributorFax: string;
  distributorStatus: boolean;
  distributorAvtUrl: string;
  supplierName: string;
  supplierEmail: string;
  supplierPhoneNumber: string;
  supplierAddress: string;
  supplierFax: string;
  supplierStatus: boolean;
  supplierAvtUrl: string;
  supplierTaxCode: string | null;
  supplierEstablishment: string | null;
  supplierManager: string | null;
  supplierActivated: string | null;
  supplierDescription: string | null;
  productId: number | null;
  productName: string | null;
  productQuantity: number | null;
  productCharacteristic: string | null;
  productSeed: string | null;
  productCook: string | null;
  productNote: string | null;
  productImage: string | null;
  productPlantingDate: string | null;
  productHarvestDate: string | null;
  productSupplierId: number | null;
  productBrand: string | null;
  productOrigin: string | null;
  productCertification: string | null;
  productWeight: string | null;
  productCommit: string | null;
  productPlanting: string | null;
}
export interface ProductInWarehouseRoleSeller {
  sellerWarehouseId: number;
  quantity: number;
  product: ProductTypeInRoleSeller;
  distributor: DistributorProfile;
  distributorWarehouseId: number;
}

export interface DistributorWarehouse {
  warehouseId: number;
  quantity: number;
  supToDis: SupToDis;
  distributor: DistributorProfile;
}

export interface SupToDis {
  id: number;
  product: ProductTypeInRoleSeller;
}
export interface FlattenedItemAllProducstOfAllDistributorResponse {
  warehouseId: number;
  quantity: number;
  distributorName: string;
  distributorEmail: string;
  distributorPhoneNumber: string;
  distributorAddress: string;
  distributorFax: string;
  distributorStatus: boolean;
  distributorAvtUrl: string;
  supplierName: string | null;
  supplierEmail: string | null;
  supplierPhoneNumber: string | null;
  supplierAddress: string | null;
  supplierFax: string | null;
  supplierStatus: boolean | null;
  supplierAvtUrl: string | null;
  supplierTaxCode: string | null;
  supplierEstablishment: string | null;
  supplierManager: string | null;
  supplierActivated: string | null;
  supplierDescription: string | null;
  productName: string | null;
  productQuantity: number | null;
  productCharacteristic: string | null;
  productSeed: string | null;
  productCook: string | null;
  productNote: string | null;
  productImage: string | null;
  productPlantingDate: string | null;
  productHarvestDate: string | null;
  productSupplierId: number | null;
  productBrand: string | null;
  productOrigin: string | null;
  productCertification: string | null;
  productWeight: string | null;
  productCommit: string | null;
  productPlanting: string | null;
}

export interface ProductForm {
  productName: string;
  productBrand: string;
  productOrigin: string;
  productCertification: string;
  productWeight: string;
  productCommit: string;
  productPlanting: string;
  quantity: number;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  image: string;
  plantingDate: string;
  harvestDate: string;
}
// sample
export interface TopProductsRowData {
  id: string;
  supp_id: string;
  name: string;
  characteristic: string;
  seed: string;
  cook: string;
  note: string;
  hasDist: boolean;
  hasSeller: boolean;
  searchableText?: string;
}

export const transactionTableData: TransactionRowData[] = [
  {
    id: uniqueId(),
    name: 'John Doe',
    date: '2024-01-04',
    amount: 100,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Jane Smith',
    date: '2024-02-05',
    amount: 150,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Alice Johnson',
    date: '2024-03-14',
    amount: 200,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'Bob Williams',
    date: '2024-03-04',
    amount: 120,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Eva Brown',
    date: '2024-05-30',
    amount: 180,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'Michael Davis',
    date: '2024-05-01',
    amount: 250,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Emily Wilson',
    date: '2024-04-03',
    amount: 300,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'David Taylor',
    date: '2024-04-13',
    amount: 130,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Olivia Clark',
    date: '2024-04-23',
    amount: 180,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'William Martinez',
    date: '2024-04-24',
    amount: 220,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Sophia Anderson',
    date: '2024-04-13',
    amount: 200,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'James Thompson',
    date: '2024-04-01',
    amount: 160,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Emma Garcia',
    date: '2024-04-08',
    amount: 210,
    status: 'paid',
  },
  {
    id: uniqueId(),
    name: 'Alexander Hernandez',
    date: '2024-04-22',
    amount: 190,
    status: 'pending',
  },
  {
    id: uniqueId(),
    name: 'Mia Lopez',
    date: '2024-04-28',
    amount: 230,
    status: 'paid',
  },
];

export const topProductsTableData: TopProductsRowData[] = [
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'John Doe',
    characteristic: 'Characteristic A',
    seed: 'Seed Type 1',
    cook: 'Cooked',
    note: 'Note 1',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Jane Smith',
    characteristic: 'Characteristic B',
    seed: 'Seed Type 2',
    cook: 'Raw',
    note: 'Note 2',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Alice Johnson',
    characteristic: 'Characteristic C',
    seed: 'Seed Type 3',
    cook: 'Cooked',
    note: 'Note 3',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Bob Williams',
    characteristic: 'Characteristic D',
    seed: 'Seed Type 4',
    cook: 'Raw',
    note: 'Note 4',
    hasDist: false,
    hasSeller: false,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Eva Brown',
    characteristic: 'Characteristic E',
    seed: 'Seed Type 5',
    cook: 'Cooked',
    note: 'Note 5',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Michael Davis',
    characteristic: 'Characteristic F',
    seed: 'Seed Type 6',
    cook: 'Raw',
    note: 'Note 6',
    hasDist: false,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Emily Wilson',
    characteristic: 'Characteristic G',
    seed: 'Seed Type 7',
    cook: 'Cooked',
    note: 'Note 7',
    hasDist: true,
    hasSeller: false,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'David Taylor',
    characteristic: 'Characteristic H',
    seed: 'Seed Type 8',
    cook: 'Raw',
    note: 'Note 8',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Olivia Clark',
    characteristic: 'Characteristic I',
    seed: 'Seed Type 9',
    cook: 'Cooked',
    note: 'Note 9',
    hasDist: false,
    hasSeller: false,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'William Martinez',
    characteristic: 'Characteristic J',
    seed: 'Seed Type 10',
    cook: 'Raw',
    note: 'Note 10',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Sophia Anderson',
    characteristic: 'Characteristic K',
    seed: 'Seed Type 11',
    cook: 'Cooked',
    note: 'Note 11',
    hasDist: false,
    hasSeller: false,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'James Thompson',
    characteristic: 'Characteristic L',
    seed: 'Seed Type 12',
    cook: 'Raw',
    note: 'Note 12',
    hasDist: true,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Emma Garcia',
    characteristic: 'Characteristic M',
    seed: 'Seed Type 13',
    cook: 'Cooked',
    note: 'Note 13',
    hasDist: false,
    hasSeller: true,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Alexander Hernandez',
    characteristic: 'Characteristic N',
    seed: 'Seed Type 14',
    cook: 'Raw',
    note: 'Note 14',
    hasDist: true,
    hasSeller: false,
  },
  {
    id: uniqueId(),
    supp_id: uniqueId(),
    name: 'Mia Lopez',
    characteristic: 'Characteristic O',
    seed: 'Seed Type 15',
    cook: 'Cooked',
    note: 'Note 15',
    hasDist: false,
    hasSeller: true,
  },
];
