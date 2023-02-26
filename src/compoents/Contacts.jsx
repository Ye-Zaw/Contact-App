import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contacts = () => {

    const [contacts, setContacts] = useState([]);

    const swalWithButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-600 text-white rounded py-1 px-5 shadow-lg',
          cancelButton: 'bg-red-600 text-white rounded py-1 px-5 mr-4 shadow-lg'
        },
        buttonsStyling: false
    })
      

    const getContacts = async () => {
        const {data} = await axios.get("http://localhost:3000/contacts");
        setContacts(data);
    }

    const apiDeleteContact = async (id) => {
        swalWithButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        })
        .then(async(result) => {
            if (result.isConfirmed) {
              swalWithButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
                const { data } = await axios.delete(`http://localhost:3000/contacts/${id}`);
                getContacts();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
        })
    }

    useEffect(() => {
        getContacts();
    }, []);

  return (
    <>
        <Link to={"/create"}>
            <button className='py-2 px-4 bg-blue-500 text-white rounded my-5'>
                Create New Contact
            </button>
        </Link>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-blue-500">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email Address
                        </th>
                        <th scope="col" className="px-6 py-3 bg-blue-500">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody> 
                    {contacts?.map((contact) => (
                        <tr key={contact.id} className="bg-blue-600 border-b border-blue-400">
                            <th className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100">
                                {contact.name}
                            </th>
                            <td className="px-6 py-4">
                                {contact.email}
                            </td>
                            <td className="px-6 py-4 bg-blue-500">
                                {contact.phone}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                                <Link to={`/edit/${contact.id}`}>
                                    <AiFillEdit className='text-xl text-green-600' />
                                </Link>
                                <AiFillDelete onClick={() => apiDeleteContact(contact.id)} className='text-xl text-red-600' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Contacts