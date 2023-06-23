import { createAsyncThunk } from '@reduxjs/toolkit';
import ContactService from '../../services/Contact';

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
