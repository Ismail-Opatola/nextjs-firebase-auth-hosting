import DashboardPage from "../../components/adminUI/dashboard";
import Header from "../../components/adminUI/layout/Header";
import AuthContextProvider from "../../lib/services/auth.context";

/**
 * render cms dashboard
 */
const CMSDashboard = () => {
  return <>
    <AuthContextProvider>
      <Header/>
      <DashboardPage/>
    </AuthContextProvider>
  </>;
};

export default CMSDashboard;
