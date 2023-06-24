import { useForm } from 'react-hook-form';
import {
  ContactForm as ContactFormType,
  ContactFormData,
} from '../models/contact';

const ContactForm = ({
  currentData,
  isEdit,
  onFormSubmit,
}: ContactFormType) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    onFormSubmit(data);
    closeForm();
  };

  const closeForm = () => {
    reset();
    if (document) {
      (
        document.getElementById('contact_form_modal') as HTMLFormElement
      ).close();
    }
  };

  return (
    <dialog
      id="contact_form_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="dialog"
        className="modal-box"
      >
        <h3 className="font-bold text-lg mb-3">
          {isEdit ? 'Edit Contact Detail' : 'Create New Contact'}
        </h3>

        <div className="space-y-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register('firstName', {
                required: isEdit ? false : 'Please insert First Name field',
              })}
              defaultValue={currentData?.firstName || ''}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.firstName?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Last name</span>
            </label>
            <input
              {...register('lastName', {
                required: isEdit ? false : 'Please insert Last Name field',
              })}
              defaultValue={currentData?.lastName || ''}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.lastName && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.lastName?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              {...register('age', {
                required: isEdit ? false : 'Please insert Age field',
              })}
              defaultValue={currentData?.age}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.age && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.age?.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              {...register('photo')}
              defaultValue={currentData?.photo || ''}
              type="text"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="modal-action">
          <button onClick={closeForm} type="button" className="btn">
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ContactForm;
