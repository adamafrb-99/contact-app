export const openContactForm = () => {
  if (document) {
    (
      document.getElementById('contact_form_modal') as HTMLFormElement
    ).showModal();
  }
};
