import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Requisition from "./pages/requisition";
import Store from "./pages/store";
import StoreCategories from "./pages/store/Categories";
import StoreItems from "./pages/store/Items";
import StoreStocks from "./pages/store/Stocks";
import Fulfillment from "./pages/fulfilment";
import RequisitionManagement from "./pages/requisition/RequisitionManagement";
import UnavailableRequisition from "./pages/requisition/UnavailableRequisition";
import RequisitionApprovals from "./pages/requisition/RequisitionApprovals";
import RequisitionReturns from "./pages/requisition/RequisitionReturns";
import LandingPage from "./pages/landingPage/Index";
import Login from "./pages/login";
import ForgetPassword from "./pages/ForgetPassword/Index";
import Register from "./pages/Signup/Index";
import ApprovedFulfilment from "./pages/fulfilment/approved";
import UnavailableFulfilment from "./pages/fulfilment/unavailable";
import Organization from "./pages/Organization";
import OrganizationInformation from "./pages/Organization/Information";
import OrganizationBranch from "./pages/Organization/Branch";
import OrganizationDepartment from "./pages/Organization/Department";
import OrganizationPosition from "./pages/Organization/Position";
import Settings from "./pages/Settings";
import Menu from "./pages/Settings/Menu";
import WorkFlow from "./pages/Settings/workflow";
import UserManagement from "./pages/userManagement";
import UserRecords from "./pages/userManagement/records";
import UserRoles from "./pages/userManagement/roles";
import Movement from "./pages/userManagement/movement";
import Printing from "./pages/printing";
import Search from "./pages/printing/search";
import Tags from "./pages/printing/tags";
import Print from "./pages/printing/printing";
import Download from "./pages/printing/download";
import Export from "./pages/printing/export";
import PriceList from "./pages/PriceList";
import ConfirmEmail from "./pages/confirmEmail";

function App() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  return (
    <>
      <Routes>
        <Route path={`${BASE_URL}/`} element={<LandingPage />} />
        <Route path={`${BASE_URL}/dashboard`} element={<Dashboard />} />
        <Route path={`${BASE_URL}/requisition`} element={<Requisition />} />
        <Route path={`${BASE_URL}/pricelist`} element={<PriceList />} />
        <Route path={`${BASE_URL}/register/:planId`} element={<Register />} />
        <Route path={`${BASE_URL}/confirmemail`} element={<ConfirmEmail />} />
        <Route path={`${BASE_URL}/reset-password`} element={<ForgetPassword />} />
        <Route
          path={`${BASE_URL}/requisition/management`}
          element={<RequisitionManagement />}
        />
        <Route path={`${BASE_URL}/login`} element={<Login />} />
        <Route
          path={`${BASE_URL}/reset-password`}
          element={<ForgetPassword />}
        />
        <Route
          path={`${BASE_URL}/requisition/unavailable`}
          element={<UnavailableRequisition />}
        />
        <Route
          path={`${BASE_URL}/requisition/approvals`}
          element={<RequisitionApprovals />}
        />
        <Route
          path={`${BASE_URL}/requisition/returns`}
          element={<RequisitionReturns />}
        />
        <Route path={`${BASE_URL}/store/`} element={<Store />} />
        <Route
          path={`${BASE_URL}/store/categories`}
          element={<StoreCategories />}
        />
        <Route path={`${BASE_URL}/store/items`} element={<StoreItems />} />
        <Route path={`${BASE_URL}/store/stocks`} element={<StoreStocks />} />
        <Route path={`${BASE_URL}/fulfillment`} element={<Fulfillment />} />
        <Route
          path={`${BASE_URL}/fulfillment/approved`}
          element={<ApprovedFulfilment />}
        />
        <Route
          path={`${BASE_URL}/fulfillment/unavailable`}
          element={<UnavailableFulfilment />}
        />
        <Route path={`${BASE_URL}/organization`} element={<Organization />} />
        <Route
          path={`${BASE_URL}/organization/information`}
          element={<OrganizationInformation />}
        />
        <Route
          path={`${BASE_URL}/organization/branch`}
          element={<OrganizationBranch />}
        />
        <Route
          path={`${BASE_URL}/organization/department`}
          element={<OrganizationDepartment />}
        />
        <Route
          path={`${BASE_URL}/organization/position`}
          element={<OrganizationPosition />}
        />
        <Route path={`${BASE_URL}/settings`} element={<Settings />} />
        <Route path={`${BASE_URL}/settings/menu`} element={<Menu />} />
        <Route path={`${BASE_URL}/settings/workflow`} element={<WorkFlow />} />
        <Route path={`${BASE_URL}/users`} element={<UserManagement />} />
        <Route path={`${BASE_URL}/users/records`} element={<UserRecords />} />
        <Route path={`${BASE_URL}/users/roles`} element={<UserRoles />} />
        <Route path={`${BASE_URL}/users/movement`} element={<Movement />} />
        <Route path={`${BASE_URL}/printing`} element={<Printing />} />
        <Route path={`${BASE_URL}/printing/search`} element={<Search />} />
        <Route path={`${BASE_URL}/printing/tags`} element={<Tags />} />
        <Route path={`${BASE_URL}/printing/printing`} element={<Print />} />
        <Route path={`${BASE_URL}/printing/download`} element={<Download />} />
        <Route path={`${BASE_URL}/printing/export`} element={<Export />} />
      </Routes>
    </>
  );
}

export default App;
