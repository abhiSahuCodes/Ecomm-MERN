
const Footer = () => {
  return (
    <footer className="bg-blue-300">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center text-white">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">GroceryHub</h2>
          <p className="mt-2">Across India</p>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-800 hover:text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-white">Shop</a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-white">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-white">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
