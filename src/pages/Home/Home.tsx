import { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { VideoCameraIcon } from '@heroicons/react/20/solid';
import { capitalize } from '../../utils/capitalizeWords';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllContacts } from '../../store/contacts/contactActions';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/Contact';
import { ContactData, ContactFormData } from '../../models/contact';

const openContactForm = () => {
  if (document) {
    (
      document.getElementById('contact_form_modal') as HTMLFormElement
    ).showModal();
  }
};

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

  const fetchAllContacts = useCallback(async () => {
    try {
      await dispatch(getAllContacts()).unwrap();
    } catch (e) {
      throw new Error(e);
    }
  }, [dispatch]);

  const createNewContact = async (data: ContactFormData) => {
    try {
      await ContactService.createContact(data);
      await fetchAllContacts();

      toast.success('Contact successfully added!', {
        position: 'top-right',
      });
    } catch (e) {
      toast.error(e.message, {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  return (
    <div>
      {/* Navbar */}
      <nav className="p-2">
        <ul className="flex items-center justify-between">
          <li>
            <h1 className="text-2xl font-semibold">My Contacts</h1>
          </li>
          <li>
            <button className="btn" onClick={openContactForm}>
              <PlusIcon className="h-6 w-6 font-semibold" />
            </button>
          </li>
        </ul>
      </nav>

      {Object.keys(contactList)
        .sort()
        .map((key, index) => (
          <div key={`${key}-${index}`} className="space-y-1.5 mb-4">
            {/* Alphabet Divider */}
            <div className="px-2 py-1 bg-gray-400 dark:bg-slate-700 rounded-lg">
              <p className="font-semibold">{key}</p>
            </div>

            {/* Contacts */}
            <div className="space-y-1">
              {contactList[key].map((data: ContactData, index: number) => (
                <Link
                  to={`/${data.id}`}
                  key={`${data.id}-${index}`}
                  className="px-2 py-3 bg-gray-200 dark:bg-slate-600 rounded-lg flex items-center justify-between"
                >
                  <p className="font-semibold">{`${data.firstName} ${data.lastName}`}</p>
                  <div className="flex space-x-2">
                    <div className="p-1.5 rounded-full h-7 w-7 bg-gray-300 dark:bg-slate-700">
                      <PhoneIcon className="w-full h-full text-green-600" />
                    </div>
                    <div className="p-1.5 rounded-full h-7 w-7 bg-gray-300 dark:bg-slate-700">
                      <VideoCameraIcon className="w-full h-full text-blue-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

      <ContactForm isEdit={false} onFormSubmit={createNewContact} />
    </div>
  );
};

export default Home;
