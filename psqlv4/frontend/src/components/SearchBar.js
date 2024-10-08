import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { Button } from 'flowbite-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  // Usamos el hook de React Router

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Redirigir a la página de resultados con el término de búsqueda en la query string
      navigate(`/search?species_name=${searchTerm}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="flex mx-auto w-full max-w-2xl">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="flex relative flex-row w-full">
        <div className="flex absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          id="default-search" 
          className="block p-4 w-full text-sm text-gray-900 border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search species..." 
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" className="px-4 py-2">Search</Button>
        </div>
    </form>
  );
};

export default SearchBar;
