import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';
import { mockContacts } from '../../pages/Home/__mocks__/mockData';

const setupComponent = ({
  isEdit,
  isOpen,
  onClose,
  onFormSubmit,
  currentData,
}) => {
  render(
    <ContactForm
      isEdit={isEdit}
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={onFormSubmit}
      currentData={currentData}
    />
  );
};

describe('Contact Form unit test', () => {
  beforeEach(() => {
    setupComponent({
      isEdit: false,
      onFormSubmit: vi.fn(),
      currentData: undefined,
      isOpen: true,
      onClose: vi.fn(),
    });
  });

  it('Title should be Edit Contact Detail', () => {
    const formTitle = screen.getByTestId('formTitle');
    expect(formTitle).toHaveTextContent('Create New Contact');
  });

  it('Should render first name field', () => {
    const firstName = screen.getByLabelText('First Name');
    expect(firstName).toBeInTheDocument();
  });

  it('Should render last name field', () => {
    const lastName = screen.getByLabelText('Last Name');
    expect(lastName).toBeInTheDocument();
  });

  it('Should render last name field', () => {
    const age = screen.getByLabelText('Age');
    expect(age).toBeInTheDocument();
  });

  it('Should render image url field', () => {
    const imageUrlField = screen.getByLabelText('Image URL');
    expect(imageUrlField).toBeInTheDocument();
  });

  it('Should render error messages when required input fields are not inserted', async () => {
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    const errorFirstName = await screen.findByText(
      /Please insert First Name field/i
    );
    const errorLastName = await screen.findByText(
      /Please insert Last Name field/i
    );
    const errorAge = await screen.findByText(/Please insert Age field/i);
    expect(errorFirstName).toBeInTheDocument();
    expect(errorLastName).toBeInTheDocument();
    expect(errorAge).toBeInTheDocument();
  });

  it('Should render close button', () => {
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();
  });
});

describe('For Edit Contact', () => {
  beforeEach(() => {
    setupComponent({
      isEdit: true,
      isOpen: true,
      onClose: vi.fn(),
      onFormSubmit: vi.fn(),
      currentData: mockContacts[0],
    });
  });

  it('Title should be Edit Contact Detail', () => {
    const formTitle = screen.getByTestId('formTitle');
    expect(formTitle).toHaveTextContent('Edit Contact Detail');
  });

  it('Should populate fields with current data', () => {
    const firstName = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastName = screen.getByLabelText('Last Name') as HTMLInputElement;
    const age = screen.getByLabelText('Age') as HTMLInputElement;
    const imgUrl = screen.getByLabelText('Image URL') as HTMLInputElement;

    expect(firstName.value).toBe(mockContacts[0].firstName);
    expect(lastName.value).toBe(mockContacts[0].lastName);
    expect(age.value).toBe(`${mockContacts[0].age}`);
    expect(imgUrl.value).toBe(mockContacts[0].photo);
  });
});
