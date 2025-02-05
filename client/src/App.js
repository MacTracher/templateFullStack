import ItemList from './components/ItemList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
      </Routes>
    </Router>
  );
}

export default App;
