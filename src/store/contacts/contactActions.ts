import { createAsyncThunk } from '@reduxjs/toolkit';
import ContactService from '../../services/Contact';
import { ContactFormData } from '../../models/contact';

export const getAllContacts = createAsyncThunk(
  'contact/getAllContacts',
  async () => {
    const response = await ContactService.getAllContacts();
    return response;
  }
);

export const getContactById = createAsyncThunk(
  'contact/getContactById',
  async (id: string) => {
    const response = await ContactService.getContactById(id);
    return response;
  }
);

export const createContact = createAsyncThunk(
  'contact/createContact',
  async (data: ContactFormData) => {
    const response = await ContactService.createContact(data);
    return response;
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async (updateContactParams: { id: string; data: ContactFormData }) => {
    const { id, data } = updateContactParams;
    const response = await ContactService.editContact(id, data);
    return response;
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id: string) => {
    const response = await ContactService.deleteContact(id);
    return response;
  }
);
