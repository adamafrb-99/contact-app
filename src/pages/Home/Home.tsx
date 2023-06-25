import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { VideoCameraIcon } from '@heroicons/react/20/solid';
import { capitalize } from '../../utils/capitalizeWords';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createContact,
  getAllContacts,
} from '../../store/contacts/contactActions';
import ContactForm from '../../components/ContactForm';
import { ContactData, ContactFormData } from '../../models/contact';
import Header from './components/Header';
import Loader from './components/Loader';
import { ApiRequestStatus } from '../../models/common';

const Home = () => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector((state) => state.allContacts);
  const loadingAllContacts = useAppSelector((state) => state.loading);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

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
      await dispatch(createContact(data)).unwrap();
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
      <Header onAddButtonClick={() => setIsFormModalOpen(true)} />

      {loadingAllContacts === ApiRequestStatus.PENDING ? (
        <Loader />
      ) : (
        Object.keys(contactList)
          .sort()
          .map((key, index) => (
            <div key={`${key}-${index}`} className="space-y-1.5 mb-4">
              {/* Alphabet Divider */}
              <div className="px-2 py-1 bg-gray-400 dark:bg-slate-700 rounded-lg">
                <p data-testid="alphabetDivider" className="font-semibold">
                  {key}
                </p>
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
                      <div className="smallAdornmentContainer">
                        <PhoneIcon className="w-full h-full text-green-600" />
                      </div>
                      <div className="smallAdornmentContainer">
                        <VideoCameraIcon className="w-full h-full text-blue-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
      )}

      <ContactForm
        isEdit={false}
        isOpen={isFormModalOpen}
        onFormSubmit={createNewContact}
        onClose={() => setIsFormModalOpen(false)}
      />
    </div>
  );
};

export default Home;
