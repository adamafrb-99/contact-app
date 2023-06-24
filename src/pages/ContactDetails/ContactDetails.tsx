import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  PhoneIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';
import { capitalize } from '../../utils/capitalizeWords';
import {
  getContactById,
  deleteContact,
  updateContact,
} from '../../store/contacts/contactActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ContactForm from '../../components/ContactForm';
import { ContactData, ContactFormData } from '../../models/contact';

const openContactForm = () => {
  if (document) {
    (
      document.getElementById('contact_form_modal') as HTMLFormElement
    ).showModal();
  }
};

const ContactDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const contactDetailRedux = useAppSelector((state) => state.contactDetail);
  const [contactDetail, setContactDetail] = useState<ContactData>();

  const fetchContactById = useCallback(async () => {
    try {
      await dispatch(getContactById(id)).unwrap();
    } catch (e) {
      toast.error(e.message, {
        position: 'top-right',
      });
    }
  }, [dispatch, id]);

  const handleUpdateContact = async (data: ContactFormData) => {
    try {
      const params = {
        firstName: data.firstName || contactDetail.firstName,
        lastName: data.lastName || contactDetail.lastName,
        age: data.age || contactDetail.age,
        photo: data.photo || contactDetail.photo,
      };

      await dispatch(
        updateContact({ id, data: { ...params, age: undefined } })
      ).unwrap();
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

  const handleDeleteContact = async (id: string) => {
    try {
      await dispatch(deleteContact(id)).unwrap();

      toast.success('Contact successfully deleted!', {
        position: 'top-right',
      });

      navigate('/');
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

      <div>
        <div className="flex flex-col items-center">
          {/* Profile Pic */}
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-3">
            <img
              className="w-24 h-24 rounded-full object-contain"
              src={contactDetail?.photo}
              alt="Profile Pic"
            />
          </div>

          <div className="mb-5 flex flex-col justify-center">
            <h1 className="text-2xl font-semibold">
              {`${capitalize(contactDetail?.firstName)} ${capitalize(
                contactDetail?.lastName
              )}`}
            </h1>
            <h3 className="text-lg self-center">{contactDetail?.age} Y.O</h3>
          </div>

          <div className="mb-10 space-x-1.5">
            <button className="btn btn-primary btn-outline py-1 h-full">
              <div className="flex flex-col items-center">
                <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                <p className="lowercase font-light">Message</p>
              </div>
            </button>
            <button className="btn btn-primary btn-outline py-1 h-full">
              <div className="flex flex-col items-center">
                <PhoneIcon className="w-6 h-6" />
                <p className="lowercase font-light">Mobile</p>
              </div>
            </button>
            <button className="btn btn-primary btn-outline py-1 h-full">
              <div className="flex flex-col items-center">
                <VideoCameraIcon className="w-6 h-6" />
                <p className="lowercase font-light">FaceTime</p>
              </div>
            </button>
            <button className="btn btn-primary btn-outline py-1 h-full">
              <div className="flex flex-col items-center">
                <EnvelopeIcon className="w-6 h-6" />
                <p className="lowercase font-light">Mail</p>
              </div>
            </button>
          </div>

          <button
            onClick={() => {
              handleDeleteContact(id);
            }}
            className="btn btn-error btn-outline"
          >
            Delete this contact
          </button>
        </div>
      </div>

      <ContactForm
        currentData={contactDetail}
        isEdit
        onFormSubmit={handleUpdateContact}
      />
    </div>
  );
};

export default ContactDetails;
