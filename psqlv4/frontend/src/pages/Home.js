import React from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar"; // Asegúrate de importar el SearchBar

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <SearchBar /> {/* Añadir la barra de búsqueda aquí */}
      <Table />
    </div>
  );
};

export default Home;
