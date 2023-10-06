import { Routes, Route } from 'react-router-dom';
import BasicTable from "./components/ListNhanVien";
import CreateOrUpdateNhanVien from "./components/CreateOrUpdateNhanVien";
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BasicTable />} />
          <Route path="/create-nhan-vien" element={<CreateOrUpdateNhanVien />} />
          <Route path="/update-nhan-vien/:id" element={<CreateOrUpdateNhanVien />} />
        </Routes>
      </div>
  );
}

export default App;
