import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import PublicationsByCollection from "./pages/PubAsociadas";
import CreatePublication from "./pages/CreatePublication";
import EditPublication from "./pages/EditPublication"; 
import SearchBar from './components/SearchBar';
import PublicationsTable from './components/PublicationsTable';


import NoPage from "./pages/NoPage";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collections" element={<Collections />} />
          <Route path="/collections/:collection_id/publications" element={<PublicationsByCollection />} />
          <Route path="/edit-publication/:id" element={<EditPublication />} />
          <Route path="/publications/create" element={<CreatePublication />} />

          <Route path="/search" element={<><SearchBar /><PublicationsTable /></>} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
