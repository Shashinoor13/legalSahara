'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Navbar from "../../components/nav-bar";
import { registerLawyer } from "../../../sanity/sanity-utils";
import { toast, useSonner } from 'sonner';
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().min(10, {
        message: "Please enter a valid phone number.",
    }),
    specialization: z.string().min(2, {
        message: "Please enter your area of specialization.",
    }),
    experience: z.string().min(1, {
        message: "Please enter your years of experience.",
    }),
    bio: z.string().min(50, {
        message: "Bio must be at least 50 characters.",
    }),
    image: z.any().refine((file) => file instanceof File, {
        message: "Please upload a valid image file.",
    }),
});

export default function LawyerRegistration() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            specialization: "",
            experience: "",
            bio: "",
            image: undefined,
        },
    });
    const onSubmit = async (data: { name: any; email: any; phoneNumber: any; specialization: any; experience: any; bio: any; image: any; }) => {
        try {
            const { name, email, phoneNumber, specialization, experience, bio, image } = data;
            const result = await registerLawyer(name, email, phoneNumber, specialization, experience, bio, image);
            console.log('Lawyer registered successfully:', result);
            form.reset();
            setImagePreview(null);
            toast.success('Application submitted successfully!');
        } catch (error) {
            console.error('Error registering lawyer:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    const handleImageChange = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            form.setValue('image', file); // Update form state with the selected file
        } else {
            setImagePreview(null);
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Our Legal Team</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* upload image as well */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e: any) => {
                                                field.onChange(e);
                                                handleImageChange(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+977 98xxxxxxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="specialization"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area of Specialization</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Criminal Law, Family Law, etc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Years of Experience</FormLabel>
                                    <FormControl>
                                        <Input min="0" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professional Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us about your professional background and achievements..."
                                            className="h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief overview of your legal career and expertise.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit Application</Button>
                    </form>
                </Form>
            </main>
        </div>
    );
}