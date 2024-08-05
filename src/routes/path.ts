// export const rootPaths = {
//   root: '/',
//   pagesRoot: '/',
//   authRoot: '/authentication',
//   errorRoot: '/error',
// };

// /**
//  * Object containing various paths used in the application.
//  */
// const paths = {
//   default: `${rootPaths.root}`,
//   categories: `${rootPaths.pagesRoot}categories`,
//   products: `${rootPaths.pagesRoot}products`,
//   customers: `${rootPaths.pagesRoot}customers`,
//   orders: `${rootPaths.pagesRoot}orders`,
//   reports: `${rootPaths.pagesRoot}reports`,
//   coupons: `${rootPaths.pagesRoot}coupons`,
//   inbox: `${rootPaths.pagesRoot}inbox`,
//   login: `${rootPaths.authRoot}/login`,
//   signup: `${rootPaths.authRoot}/sign-up`,
//   forgotPassword: `${rootPaths.authRoot}/forgot-password`,
//   resetPassword: `${rootPaths.authRoot}/reset-password`,
//   notFound: `${rootPaths.errorRoot}/404`,
// };

// export default paths;
export const rootPaths = {
  authRoot: '/authentication',
  errorRoot: '/error',
};
const paths = {
  default: '/',
  categories: 'categories',
  products: 'products',
  customers: 'customers',
  orders: 'orders',
  reports: 'reports',
  coupons: 'coupons',
  inbox: 'inbox',
  login: `${rootPaths.authRoot}/login`,
  signup: 'signup',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  notFound: '*',
};

export default paths;
