import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { capitalize } from '../../utils/capitalizeWords';
import { getContactById } from '../../store/contacts/contactActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ContactForm from '../../components/ContactForm';
import { ContactData, ContactFormData } from '../../models/contact';
import ContactService from '../../services/Contact';

const openContactForm = () => {
  if (document) {
    (
      document.getElementById('contact_form_modal') as HTMLFormElement
    ).showModal();
  }
};

const ContactDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const contactDetailRedux = useAppSelector((state) => state.contactDetail);

  const [contactDetail, setContactDetail] = useState<ContactData>();

  const fetchContactById = useCallback(
    async () => {
      try {
        await dispatch(getContactById(id)).unwrap();
      } catch (e) {
        throw new Error(e);
      }
    },
    [dispatch, id]
  );

  const updateContact = async (data: ContactFormData) => {
    try {
      const params = {
        firstName: data.firstName || contactDetail.firstName,
        lastName: data.lastName || contactDetail.lastName,
        age: data.age || contactDetail.age,
        photo: data.photo || contactDetail.photo,
      }

      await ContactService.editContact(id, params);
      await fetchContactById();

      toast.success('Contact successfully edited!', {
        position: 'top-right',
      });
    } catch (e) {
      toast.error(e.message, {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchContactById();
  }, [fetchContactById]);

  useEffect(() => {
    setContactDetail(contactDetailRedux);
  }, [contactDetailRedux]);

  return (
    <div>
      {/* Navbar */}
      <nav className="p-2">
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

      <div>
        <div className="flex flex-col items-center">
          {/* Profile Pic */}
          <div className="w-24 h-24 rounded-full bg-gray-200">
            <img
              className="w-24 h-24 rounded-full object-contain"
              src={contactDetail?.photo}
              alt="Profile Pic"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold">
              {`${capitalize(contactDetail?.firstName)} ${capitalize(
                contactDetail?.lastName
              )}`}
            </h1>
            <h3 className="text-lg text-gray-600 self-center">
              {contactDetail?.age} Y.O
            </h3>
          </div>
        </div>
      </div>

      <ContactForm
        currentData={contactDetail}
        isEdit
        onFormSubmit={updateContact}
      />
    </div>
  );
};

export default ContactDetails;
