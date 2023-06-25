import { vi } from 'vitest';
import { AxiosResponse } from 'axios';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ContactDetails from '..';
import ContactService from '../../../services/Contact';
import { mockContacts } from '../../Home/__mocks__/mockData';
import { ApiRequestStatus } from '../../../models/common';

const getContactByIdMock = vi.spyOn(ContactService, 'getContactById');
const editContactMock = vi.spyOn(ContactService, 'editContact');
const deleteContactMock = vi.spyOn(ContactService, 'deleteContact');

const mockStore = configureStore([]);

const setMockStore = (loadingStatus = ApiRequestStatus.RESOLVED) => {
  const store = mockStore({
    allContacts: [],
    contactDetail: mockContacts[0],
    loading: loadingStatus,
    error: null,
  });

  store.dispatch = vi.fn(() => {
    return {
      unwrap: vi.fn(),
    };
  });

  return store;
};

const setupComponent = (loadingStatus) => {
  render(
    <Provider store={setMockStore(loadingStatus)}>
      <BrowserRouter>
        <ContactDetails />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
};

describe('Contact Details page', () => {
  beforeAll(() => {
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
  });

  beforeEach(() => {
    getContactByIdMock.mockReset();
    getContactByIdMock.mockReturnValue(Promise.resolve(mockContacts[0]));

    editContactMock.mockReset();
    editContactMock.mockReturnValue(Promise.resolve({} as AxiosResponse));

    deleteContactMock.mockReset();
    deleteContactMock.mockReturnValue(Promise.resolve({} as AxiosResponse));
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render header', () => {
    setupComponent(ApiRequestStatus.RESOLVED);

    const backButton = screen.getByTestId('backButton');
    expect(backButton).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();
  });

  it('Should render image container', () => {
    setupComponent(ApiRequestStatus.RESOLVED);

    const imgContainer = screen.getByTestId('imgContainer');
    expect(imgContainer).toBeInTheDocument();
  });

  it('Should render name and age', () => {
    setupComponent(ApiRequestStatus.RESOLVED);

    const fullName = screen.getByTestId('fullName-text');
    expect(fullName).toHaveTextContent('Alam Novanto');

    const age = screen.getByTestId('age-text');
    expect(age).toHaveTextContent('100');
  });

  it('Should render delete button', () => {
    setupComponent(ApiRequestStatus.RESOLVED);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete this contact',
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it('Should render success message after successfully editing contact', async () => {
    setupComponent(ApiRequestStatus.RESOLVED);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editButton);

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const age = screen.getByLabelText('Age');
    const imageUrlField = screen.getByLabelText('Image URL');

    fireEvent.change(firstName, { target: { value: 'mantap' } });
    fireEvent.change(lastName, { target: { value: 'jiwa' } });
    fireEvent.change(age, { target: { value: 18 } });
    fireEvent.change(imageUrlField, { target: { value: 'mantap.png' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    const successMessage = await screen.findByText(
      /Contact successfully edited!/i
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('Should render success message after successfully deleting contact', async () => {
    setupComponent(ApiRequestStatus.RESOLVED);

    const deleteButton = screen.getByRole('button', {
      name: 'Delete this contact',
    });

    fireEvent.click(deleteButton);

    const successMessage = await screen.findByText(
      /Contact successfully deleted!/i
    );

    expect(successMessage).toBeInTheDocument();
  });

  it('Should render loader while still fetching data', () => {
    setupComponent(ApiRequestStatus.PENDING);

    const loaderComponent = screen.getByTestId('detailLoader');
    expect(loaderComponent).toBeInTheDocument();
  });
});
