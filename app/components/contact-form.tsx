"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


interface FormProps {
  _id: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormData>(); // Destructure formState instead of errors

  const onSubmit = async (data:any) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);

    try {
      const formData = new FormData(data.target);
      formData.append("access_key",`${process.env.NEXT_PUBLIC_CONTACT_FORM_API}`);
      const object = Object.fromEntries(formData.entries());
      const json = JSON.stringify(object);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
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
      setError(true);
    }
  }
    if (isSubmitting) {
      return (
        <Box sx={{ width: '100%'}}>
        <LinearProgress color="success"/>
      </Box>
      );
    }
  
    if (hasSubmitted) {
      return (
        <>
          <div className="flex items-center align-center justify-center">
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-white-800 dark:text-green-400 " role="alert">
              <span className="font-medium">Thank You</span> Your email has been received.
          </div>
          </div>
        </>
      );
    }
    if(error){
      return (
        <>
          <div className="flex items-center align-center justify-center">
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-white-800 dark:text-red-400 " role="alert">
              <span className="font-medium">Error</span> There was a error while sending email.
          </div>
          </div>
        </>
      );
    }

  return (
    <section className="text-gray-600 body-font relative" id="contact-section">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any queries feel free to contact us.</p>
        </div>
        <form onSubmit={onSubmit} id='contact-form' name='contact-form'>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='true' />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='true'/>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                  <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <input className="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg" type="submit"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}