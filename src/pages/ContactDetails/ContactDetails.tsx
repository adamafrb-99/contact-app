import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import {
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
import CommunicationButton from './components/CommunicationButton';
import Header from './components/Header';
import Loader from './components/Loader';
import { ApiRequestStatus } from '../../models/common';

const ContactDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const contactDetailRedux = useAppSelector((state) => state.contactDetail);
  const loading = useAppSelector((state) => state.loading);

  const [contactDetail, setContactDetail] = useState<ContactData>();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

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

      await dispatch(updateContact({ id, data: params })).unwrap();
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
      <Header onEditButtonClick={() => setIsFormModalOpen(true)} />

      {loading === ApiRequestStatus.PENDING ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-col items-center">
            {/* Profile Pic */}
            <div
              data-testid="imgContainer"
              className="w-24 h-24 rounded-full bg-gray-200 mb-3"
            >
              <img
                className="w-24 h-24 rounded-full object-contain"
                src={contactDetail?.photo}
                alt="Profile Pic"
              />
            </div>

            {/* Name & Age panel */}
            <div className="mb-5 flex flex-col justify-center">
              <h1
                data-testid="fullName-text"
                className="text-2xl font-semibold"
              >
                {`${capitalize(contactDetail?.firstName)} ${capitalize(
                  contactDetail?.lastName
                )}`}
              </h1>
              <h3 data-testid="age-text" className="text-lg self-center">
                {contactDetail?.age} Y.O
              </h3>
            </div>

            {/* Communication buttons */}
            <div className="mb-10 space-x-1.5">
              <CommunicationButton
                icon={<ChatBubbleOvalLeftIcon className="w-6 h-6" />}
                text="message"
              />
              <CommunicationButton
                icon={<PhoneIcon className="w-6 h-6" />}
                text="mobile"
              />
              <CommunicationButton
                icon={<VideoCameraIcon className="w-6 h-6" />}
                text="facetime"
              />
              <CommunicationButton
                icon={<EnvelopeIcon className="w-6 h-6" />}
                text="mail"
              />
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
      )}

      <ContactForm
        currentData={contactDetail}
        isEdit
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onFormSubmit={handleUpdateContact}
      />
    </div>
  );
};

export default ContactDetails;
