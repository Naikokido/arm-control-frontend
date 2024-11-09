import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const UserManagementLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <div className="flex flex-1 flex-col mt-44">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserManagementLayout;
