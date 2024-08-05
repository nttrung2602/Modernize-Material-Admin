import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <ToastContainer position="top-center" limit={3} autoClose={2000} />
      <Outlet />
    </>
  );
};

export default App;
