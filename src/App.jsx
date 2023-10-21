// rrd imps
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages imps
import Dashboard, { DashboardLoader, DashboardAction } from "./pages/Dashboard.jsx";
import ErrNotFound from "./pages/ErrNotFound.jsx";
import ExpensesPage,{expensesAction, expensesLoader} from "./pages/ExpensesPage.jsx";
import BudgetPage,{ BudgetAction,BUdgetLoader} from "./pages/BudgetPage.jsx";


// layout
import Main, { MainLoader } from "./layouts/main";

// actions
import {LogOutProcess} from  './actions/LogOutProcess.js'
import {delBud} from  './actions/delBud.js'

// handling animations
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: MainLoader,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: DashboardLoader,
          action:DashboardAction,
          errorElement:<ErrNotFound />
        },
        {
          path:"budget/:id",
          element: <BudgetPage />,
          loader: BUdgetLoader,
          action:BudgetAction,
          children:[
            {
              path:"delete",
              action:delBud,
            }
          ]
        },
        {
          path:"expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action:expensesAction
        },
        {
          path: "logout",
          action:LogOutProcess
        },
      ],
    },
    {
      path: "/*",
      element: <ErrNotFound />,
      action:LogOutProcess
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
