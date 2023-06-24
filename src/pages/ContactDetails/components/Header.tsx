import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { openContactForm } from '../../../utils/openContactForm';

const Header = () => {
  return (
    <nav className="mb-5 p-2">
      <ul className="flex items-center justify-between font-semibold">
        <li>
          <Link to="/" className="flex items-center space-x-1">
            <ChevronLeftIcon className="h-6 w-6" />
            <p className="text-lg">Contacts</p>
          </Link>
        </li>
        <li>
          <button className="text-lg" onClick={openContactForm}>
            Edit
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
