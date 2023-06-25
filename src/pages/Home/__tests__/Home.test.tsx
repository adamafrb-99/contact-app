import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Home from '..';
import store from '../../../store';
import ContactService from '../../../services/Contact';
import { mockContacts } from '../__mocks__/mockData';
import { AxiosResponse } from 'axios';

const getAllContactsMock = vi.spyOn(ContactService, 'getAllContacts');
const createContactMock = vi.spyOn(ContactService, 'createContact');

const setupComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
};

describe('Home page unit test', () => {
  beforeEach(() => {
    getAllContactsMock.mockReset();
    getAllContactsMock.mockReturnValue(Promise.resolve(mockContacts));

    createContactMock.mockReset();
    createContactMock.mockReturnValue(Promise.resolve({} as AxiosResponse));
  });

  it('Should render the header', () => {
    setupComponent();

    const title = screen.getByText(/My Contacts/i);
    expect(title).toBeInTheDocument();
  });

  it('Should render the data of contacts', () => {
    setupComponent();

    const initials = screen.getAllByTestId('alphabetDivider');
    expect(initials).toHaveLength(4);
    expect(initials[0]).toHaveTextContent('A');

    const contactData = screen.getByText(/cahya wibawa/i);
    expect(contactData).toBeInTheDocument();
  });

  it('Should open Create New Contact form when add button is clicked', async () => {
    setupComponent();

    const createButton = screen.getByTestId('createContactBtn');
    expect(createButton).toBeInTheDocument();
  });

  it('Should close Create New Contact form after successfully creating data', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    setupComponent();

    const createButton = screen.getByTestId('createContactBtn');
    fireEvent.click(createButton);

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const age = screen.getByLabelText('Age');
    const imageUrlField = screen.getByLabelText('Image URL');

    fireEvent.change(firstName, { target: { value: 'jerome' } });
    fireEvent.change(lastName, { target: { value: 'valeska' } });
    fireEvent.change(age, { target: { value: 18 } });
    fireEvent.change(imageUrlField, { target: { value: 'jerome.png' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    const successMessage = await screen.findByText(
      /Contact successfully added!/i
    );
    expect(successMessage).toBeInTheDocument();
  });
});
