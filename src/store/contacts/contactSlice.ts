import { createSlice } from '@reduxjs/toolkit';
import { ApiRequestStatus } from '../../models/common';
import { getAllContacts, getContactById } from './contactActions';
import { ContactData } from '../../models/contact';

const initialAllContacts: ContactData[] = [];
const initialContactDetail: ContactData = {
  firstName: '',
  lastName: '',
  id: '',
  photo: '',
  age: 0,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    allContacts: initialAllContacts,
    contactDetail: initialContactDetail,
    loading: ApiRequestStatus.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllContacts.pending, (state) => {
      state.loading = ApiRequestStatus.PENDING;
    });
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.loading = ApiRequestStatus.RESOLVED;
      state.allContacts = action.payload;
    });
    builder.addCase(getAllContacts.rejected, (state, action) => {
      state.loading = ApiRequestStatus.REJECTED;
      state.error = action.error;
    });
    builder.addCase(getContactById.pending, (state) => {
      state.loading = ApiRequestStatus.PENDING;
    });
    builder.addCase(getContactById.fulfilled, (state, action) => {
      state.loading = ApiRequestStatus.RESOLVED;
      state.contactDetail = action.payload;
    });
    builder.addCase(getContactById.rejected, (state, action) => {
      state.loading = ApiRequestStatus.REJECTED;
      state.error = action.error;
    });
  },
});

export default contactSlice.reducer;
