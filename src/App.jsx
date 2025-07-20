import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Crud from './components/page/crud'; // ✅ Import your CRUD component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Crud />} /> {/* ✅ New Route */}
      </Routes>
    </Router>
  );
}

export default App;
