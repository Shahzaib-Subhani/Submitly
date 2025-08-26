
import { useState } from "react";
import { SidebarProvider } from "../context/SidebarContext";
import MainPage from "../components/layout/MainPage";

const Dashboard = () => {
  console.log("dashboard");

  return (

    <>
      <SidebarProvider>
        <MainPage />
      </SidebarProvider>
    </>

  );
};

export default Dashboard;
