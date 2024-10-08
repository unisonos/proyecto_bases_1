import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-regal-blue dark:bg-gray-700">
          <div className="px-4 py-3 mx-auto max-w-screen-xl">
              <div className="flex items-center">
                  <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium rtl:space-x-reverse">
                      <li className="px-4">
                        <Link to="/" className="text-gray-900 dark:text-white hover:underline">Home</Link>
                      </li>
                      <li className="px-4">
                        <Link to="/collections" className="text-gray-900 dark:text-white hover:underline">Collections</Link>
                      </li>
                      <li className="px-4">
                        <Link to="/publications/create" className="text-gray-900 dark:text-white hover:underline">Create Publication</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>

      <div className="flex flex-col p-4 mx-auto w-full max-w-6xl">
        <Outlet />
      </div>

      <footer>&copy; 2024 Sergio Rodríguez Villalobos</footer>
    </>
  );
};

export default Layout;
