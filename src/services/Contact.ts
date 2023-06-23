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
}

export default new ContactService();
