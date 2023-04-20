import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ShoesForm from './ShoesForm';
import ShoesList from './ShoesList'

import HatForm from './HatForm'
import HatList from './HatList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/hats' element={<HatList />} />
          <Route path='/hats/new' element={<HatForm />} />
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
