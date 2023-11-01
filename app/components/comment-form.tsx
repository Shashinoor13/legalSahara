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
    return <h3>Submitting comment…</h3>;
  }

  if (hasSubmitted) {
    return (
      <>
        <h3>Thanks for your comment!</h3>
        <ul>
          <li>
            Name: {formData?.name} <br />
            Email: {formData?.email} <br />
            Comment: {formData?.comment}
          </li>
        </ul>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg content-center mt-20">
      <div className='flex w-full px-5'>
      <input  type="hidden" name="_id" value={_id} />
      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full outline outline-orange-500/10 rounded p-1 bg-gray-50"
          placeholder="John Doe"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700 ml-5">Email</span>
        <input
          type="email"
          {...register('email', { required: true })}
          className="form-input mt-1 block w-full outline outline-orange-500/10 rounded p-1 bg-gray-50 ml-5"
          placeholder="your@email.com"
        />
      </label>
      </div>
      
      <label className="block mb-5 px-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-textarea mt-1 block w-full outline outline-orange-500/10 bg-gray-50 rounded p-1"
          rows={8}
          placeholder="Enter Your Comment..."
        ></textarea>
      </label>
      {/* Display validation error messages */}
      {formState.errors.name && <span>This field is required</span>}
      {formState.errors.email && <span>This field is required</span>}
      {formState.errors.comment && <span>This field is required</span>}
      <input
        type="submit"
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-9 rounded ml-5"
      />
    </form>
  );
}
