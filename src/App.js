import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import Footer from "./pages/global/Footer";
import Dashboard from "./pages/dashboard";
import UseCases from "./pages/use-cases";
import Reports from "./pages/reports";
import FAQ from "./pages/faq";
import NotFound from "./pages/notFound";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignupForm";
import PrivateRoute from "./components/PrivateRoute";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Ensure this import statement is before its usage

function AppContent() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAuthenticated } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && isSidebar && <Sidebar />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/"  element={<Dashboard />}  />
              <Route path="/auth/signin" element={<LoginForm />} />
              <Route path="/auth/signup" element={<SignUpForm />} />
              <Route path="/use-cases"  element={<UseCases />}  />
              <Route path="/reports"  element={<Reports />}  />
              <Route path="/faq"  element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {isAuthenticated && <Footer />}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
