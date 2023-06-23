import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { capitalize } from '../../utils/capitalizeWords';
import { getContactById } from '../../store/contacts/contactActions';
import { useAppDispatch, useAppSelector } from '../../hooks';

const ContactDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const contactDetail = useAppSelector((state) => state.contactDetail);

  useEffect(() => {
    const fetchContactById = async (contactId: string) => {
      try {
        await dispatch(getContactById(contactId));
      } catch (e) {
        throw new Error(e);
      }
    };

    fetchContactById(id);
  }, [dispatch, id]);

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
            <p className="text-lg">Edit</p>
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
    </div>
  );
};

export default ContactDetails;
