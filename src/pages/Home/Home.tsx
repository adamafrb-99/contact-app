import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { VideoCameraIcon } from '@heroicons/react/20/solid';
import { capitalize } from '../../utils/capitalizeWords';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllContacts } from '../../store/contacts/contactActions';

const Home = () => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector((state) => state.allContacts);

  const contactList = useMemo(() => {
    const grouppedContactList = allContacts.reduce((acc, contact) => {
      const { firstName } = contact;
      const firstLetter = firstName[0].toUpperCase();

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      acc[firstLetter].push({
        ...contact,
        firstName: capitalize(contact.firstName),
        lastName: capitalize(contact.lastName),
      });

      return acc;
    }, {});

    return grouppedContactList;
  }, [allContacts]);

  useEffect(() => {
    const fetchAllContacts = async () => {
      try {
        await dispatch(getAllContacts());
      } catch (e) {
        throw new Error(e);
      }
    };

    fetchAllContacts();
  }, [dispatch]);

  return (
    <div>
      {/* Navbar */}
      <nav className="p-2">
        <ul className="flex items-center justify-between">
          <li>
            <h1 className="text-2xl font-semibold">My Contacts</h1>
          </li>
          <li>
            <button>
              <PlusIcon className="h-6 w-6 font-semibold" />
            </button>
          </li>
        </ul>
      </nav>

      {Object.keys(contactList)
        .sort()
        .map((key, index) => (
          <div key={`${key}-${index}`} className="space-y-1.5 mb-4">
            {/* Alphabet Marker */}
            <div className="px-2 py-1 bg-gray-400 rounded-lg">
              <p className="font-semibold">{key}</p>
            </div>

            {/* Contacts */}
            <div className="space-y-1">
              {contactList[key].map((data, index) => (
                <Link
                  to={`/${data.id}`}
                  key={`${data.id}-${index}`}
                  className="px-2 py-3 bg-gray-200 rounded-lg flex items-center justify-between"
                >
                  <p className="font-semibold">{`${data.firstName} ${data.lastName}`}</p>
                  <div className="flex space-x-2">
                    <div className="p-1.5 rounded-full h-7 w-7 bg-gray-300">
                      <PhoneIcon className="w-full h-full text-green-600" />
                    </div>
                    <div className="p-1.5 rounded-full h-7 w-7 bg-gray-300">
                      <VideoCameraIcon className="w-full h-full text-blue-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
