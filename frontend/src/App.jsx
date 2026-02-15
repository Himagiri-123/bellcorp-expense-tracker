import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TransactionExplorer from './pages/TransactionExplorer';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <div className="App">
      <TransactionProvider>
        <Navbar />
        <div style={{paddingTop: '0px'}}>
            <Routes>
            <Route 
                path="/" 
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                } 
            />
            <Route 
                path="/transactions" 
                element={
                <ProtectedRoute>
                    <TransactionExplorer />
                </ProtectedRoute>
                } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </TransactionProvider>
    </div>
  );
}

export default App;