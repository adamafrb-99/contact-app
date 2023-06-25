import { PlusIcon } from '@heroicons/react/24/outline';

type HeaderProps = {
  onAddButtonClick: () => void;
}

const Header = ({ onAddButtonClick }: HeaderProps) => {
  return (
    <nav className="p-2">
      <ul className="flex items-center justify-between">
        <li>
          <h1 className="text-2xl font-semibold">My Contacts</h1>
        </li>
        <li>
          <button data-testid="createContactBtn" className="btn" onClick={onAddButtonClick}>
            <PlusIcon className="h-6 w-6 font-semibold" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
