import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addDetails } from '../state/details/detailsSlice';

const DetailForm = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

            <Formik
                initialValues={{ name: '', email: '', message: '' }}

                validate={values => {
                    const errors = {}
                    if (!values.name) {
                        errors.name = 'Required'
                    }
                    if (!values.email) {
                        errors.email = 'Required'
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address'
                    }
                    if (!values.message) {
                        errors.message = 'Required'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    let newFormData = new FormData();
                    newFormData.append("name", values.name);
                    newFormData.append("email", values.email);
                    newFormData.append("message", values.message);
                    newFormData.append("myFile", file);
                    dispatch(addDetails(newFormData));
                    // const result = await axios.post('http://localhost:5000/api/v1/detail/', newFormData);
                    // console.log(result)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <section class="text-gray-600 body-font relative">
                            <div class="container px-5 py-24 mx-auto">
                                <div class="flex flex-col text-center w-full mb-12">
                                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                                </div>
                                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                    <div class="flex flex-col -m-2">
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                                <Field type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                                                <Field type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                <ErrorMessage name="email" component="div" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="formFile" class="form-label inline-block mb-2 text-gray-700">File</label>
                                                <input name="file" onChange={(e) => setFile(e.target.files[0])} class="form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="file" id="formFile" />
                                                {/* <ErrorMessage name="file" component="div" /> */}
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                                                <Field component="textarea" id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></Field>
                                                <ErrorMessage name="message" component="div" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <button type="submit" disabled={isSubmitting} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default DetailForm;
