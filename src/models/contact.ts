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
  currentData?: ContactData;
  onFormSubmit: (data: ContactFormData) => void;
};
