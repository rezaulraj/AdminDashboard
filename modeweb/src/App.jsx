import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/dashboard/AdminDashborad";
import UserDashboard from "./pages/dashboard/UserDashBorad";
import SalesAccountApproval from "./pages/users/SalesAccountApproval";
import ProfileSetup from "./pages/profile/ProfileSetup";
import AddNewCustomer from "./pages/addcustomer/AddNewCustomer";
import GlassSetup from "./pages/glass/GlassSetup";
import MosquitonetSetup from "./pages/mosquitonet/MosquitonetSetup";
import VatAndInstallation from "./pages/vatinstallation/VatAndInstallation";
import AllCustomer from "./pages/allcustomer/AllCustomer";
import MailData from "./pages/maildata/MailData";
import PhoneData from "./pages/phonedata/PhoneData";
import NewQuotation from "./pages/quotation/NewQuotation";

function App() {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<AdminDashboard />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/users" element={<SalesAccountApproval />} />
                  {/* <Route
                    path="/my-customer"
                    element={<div className="p-6">My Customer Content</div>}
                  /> */}
                  <Route path="/add-customer" element={<AddNewCustomer />} />
                  <Route path="/profiles" element={<ProfileSetup />} />
                  <Route path="/glasss" element={<GlassSetup />} />
                  <Route path="/mosquito-net" element={<MosquitonetSetup />} />
                  <Route path="/all-customer" element={<AllCustomer />} />
                  <Route path="/quotation" element={<NewQuotation />} />
                  <Route
                    path="/quotation-report"
                    element={
                      <div className="p-6">Quotation Report Content</div>
                    }
                  />
                  <Route path="/mail-data" element={<MailData />} />
                  <Route path="/phone-data" element={<PhoneData />} />
                  <Route path="/vat-setup" element={<VatAndInstallation />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
