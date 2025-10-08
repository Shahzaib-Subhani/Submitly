import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AuthWrapper from "./components/auth/AuthWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
          <AppRoutes></AppRoutes>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
