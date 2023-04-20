import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesForm from './ShoesForm';
import ShoesList from './ShoesList'
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="shoes/" element={<ShoesForm />} />
          <Route path="shoes/list" element={<ShoesList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
