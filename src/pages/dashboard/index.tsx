import { Box, Grid } from '@mui/material';
import PageHeader from 'components/common/PageHeader';
import TeamMembers from 'components/sections/dashboard/members/TeamMembers';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';
import ProductsOfSupplierTable from 'components/sections/dashboard/topProducts/TopProductsTable';
import OrdersSellerTable from 'components/sections/dashboard/transactions/OrdersFromSellerTransactionTableRoleDistributor';
import OrdersFromSellerToDisTable from 'components/sections/dashboard/transactions/OrdersToDistributorTransactionTableRoleSeller';
import OrdersSuppliersTable from 'components/sections/dashboard/transactions/OrdersToSupplierTransactionTableRoleDistributor';
import OrdersDistributorsTable from 'components/sections/dashboard/transactions/TransactionTableRoleSupplier';
import { UserProfile } from 'data/dashboard/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

// const role: string = 'distributor';
// const user = { role: 'supplier' };
// const user = { role: 'distributor' };

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate(paths.login);
    } else {
      const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;
      setUser(userData);
    }
  }, []);

  if (user?.role === 'supplier') {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <PageHeader>Dashboard</PageHeader>
        {/* /* ------------- Stats section ---------------- */}

        <Grid container spacing={3} mt={1} mb={3}>
          <Grid item xs={12} lg={12}>
            <StatisticsCards />
          </Grid>
        </Grid>
        {/* /* ------------- Table section ---------------- */}
        <Grid container spacing={1} mb={3} columns={1}>
          <Grid item xs={1} zIndex={1}>
            <OrdersDistributorsTable />
          </Grid>
          {/* <Grid item xs={1}>
            <ProductsOfSupplierTable />
          </Grid> */}
        </Grid>
        {/* /* ------------- Team section ---------------- */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={12} xl={4}>
            <TeamMembers />
          </Grid>
        </Grid>
      </Box>
    );
  } else if (user?.role === 'distributor') {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <PageHeader>Dashboard</PageHeader>
        {/* /* ------------- Stats section ---------------- */}

        <Grid container spacing={3} mt={1} mb={3}>
          <Grid item xs={12} lg={12}>
            <StatisticsCards />
          </Grid>
        </Grid>
        {/* /* ------------- Table section ---------------- */}
        <Grid container spacing={1} mb={3} columns={1}>
          <Grid item xs={1} zIndex={1}>
            <OrdersSuppliersTable />
          </Grid>
          <Grid item xs={1} zIndex={1}>
            <OrdersSellerTable />
          </Grid>
        </Grid>
        {/* /* ------------- Team section ---------------- */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={12} xl={4}>
            <TeamMembers />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <PageHeader>Dashboard</PageHeader>
        {/* /* ------------- Stats section ---------------- */}

        <Grid container spacing={3} mt={1} mb={3}>
          <Grid item xs={12} lg={12}>
            <StatisticsCards />
          </Grid>
        </Grid>
        {/* /* ------------- Table section ---------------- */}
        <Grid container spacing={1} mb={3} columns={1}>
          <Grid item xs={1} zIndex={1}>
            <OrdersFromSellerToDisTable />
          </Grid>
          <Grid item xs={1} zIndex={1}>
            {/* <OrdersSellerTable /> */}
          </Grid>
        </Grid>
        {/* /* ------------- Team section ---------------- */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={12} xl={4}>
            <TeamMembers />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default Dashboard;
