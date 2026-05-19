import axiosInt from './axios';

export const createProduct = async (
  formValues: any,
  imageFiles: File[],
  attachmentFiles: File[]
) => {
  const formData = new FormData();

  // IMPORTANT: backend expects STRING
  formData.append('product', JSON.stringify(formValues));

  if (imageFiles.length > 0) {
    formData.append('image', imageFiles[0]);
  }

  attachmentFiles.forEach((file) => {
    formData.append('attachments', file);
  });

  const response = await axiosInt.post(
    '/api/products',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};

export const getAllProducts = async () => {
  const response = await axiosInt.get('/api/products');
  return response.data;
};