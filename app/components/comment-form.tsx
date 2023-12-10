"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  comment: string;
}

interface FormProps {
  _id: string;
}

export  function Form({ _id }: FormProps) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormData>(); // Destructure formState instead of errors


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);

    try {
      response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify({...data, _id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitting(false);
        setHasSubmitted(true);
      } else {
        // Handle the error here
        console.error('Error submitting data');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isSubmitting) {
    return (
      <div className='flex flex-auto align-middle justify-center items-center'>
              <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      </div>

    );
  }

  if (hasSubmitted) {
    return (
      <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <div className="flex items-center">
    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span className="sr-only">Info</span>
    <h3 className="text-lg font-medium">Comment has been posted successfully.</h3>
  </div>
  <div className="mt-2 mb-4 text-sm">
      Thanks for your comment!
      <br></br>
      <h1 className='block font-semibold text-lg'>
      {formData?.name} <br />
      </h1>
  </div>
  <div className="flex">

    <button
      onClick={() => setHasSubmitted(false)}
    type="button" className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
      Dismiss
    </button>
  </div>
</div>
    );
  }

  return (
      <section className="bg-white w-full content-center ">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                  <label 
                  htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your name</label>
                  <input
                  {...register('name', { required: true })}
                  type="text" id="name"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your name" required/>
              </div>
            {formState.errors.name && <span>Name field is required</span>}
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Email</label>
                  <input 
                  {...register('email', { required: true })}
                  type="email" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@example.com" required/>
          {formState.errors.email && <span>Email field is required</span>}

              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your comment</label>
                  <textarea
                  {...register('comment', { required: true })}
                  id="comment" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          {formState.errors.email && <span>Email field is required</span>}

              </div>
              <input
            type="submit"
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-9 rounded "
          />
         {/* Display validation error messages */}
          {formState.errors.comment && <span>Comment field is required</span>}
          </form>
      </div>
    </section>
    // </form>
  );
}
