import { ContactFormData } from '../models/contact';
import Service from './Service';

class ContactService extends Service {
  getAllContacts = async () => {
    const response = await this.http.get('');
    return response.data;
  };

  getContactById = async (id: string) => {
    const response = await this.http.get(`/${id}`, {
      params: {
        id,
      },
    });

    return response.data;
  };

  createContact = async (params: ContactFormData) => {
    const response = await this.http.post('', params);
    return response;
  }

  editContact = async (id: string, params: ContactFormData) => {
    const response = await this.http.put(`/${id}`, params);
    return response;
  }
}

export default new ContactService();
