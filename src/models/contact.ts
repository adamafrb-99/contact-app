export type ContactData = {
  age: number;
  firstName: string;
  id: string;
  lastName: string;
  photo: string;
};

export type ContactFormData = Omit<ContactData, 'id'>;

export type ContactForm = {
  isEdit: boolean;
  isOpen: boolean;
  currentData?: ContactData;
  onClose: () => void;
  onFormSubmit: (data: ContactFormData) => void;
};
