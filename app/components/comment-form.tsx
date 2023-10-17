
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg content-center">
      <input  type="hidden" name="_id" value={_id} />
      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full"
          placeholder="John Appleseed"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          {...register('email', { required: true })}
          className="form-input mt-1 block w-full"
          placeholder="your@email.com"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-textarea mt-1 block w-full"
          rows={8}
          placeholder="Enter some long-form content."
        ></textarea>
      </label>
      {/* Display validation error messages */}
      {formState.errors.name && <span>This field is required</span>}
      {formState.errors.email && <span>This field is required</span>}
      {formState.errors.comment && <span>This field is required</span>}
      <input
        type="submit"
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      />
    </form>
  );
}
