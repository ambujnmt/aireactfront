// src/utils/confirmDelete.js
import Swal from 'sweetalert2';
import axios from 'axios';

export const confirmDelete = async (url, callback) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(url);
      await Swal.fire('Deleted!', 'Record has been deleted.', 'success');
      if (callback) callback(); // Optional function to refetch data
    } catch (error) {
      console.error(error);
      Swal.fire('Failed!', 'There was a problem deleting.', 'error');
    }
  }
};
