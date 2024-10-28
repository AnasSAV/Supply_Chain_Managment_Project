import React, { useState } from 'react';
import './Contact.css'; // Ensure this path is correct
import ContactHeader from './ContactHeader'; // Adjust the path if necessary
import contactImage from '../../data/contact.svg'; // Adjust the path to your image

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="contact-container">
            <ContactHeader />
            <div className="contact-content">
                
                <form onSubmit={handleSubmit} className="contact-form">
                    {/* <h2 className="contact-title">Get in Touch</h2> */}
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company" className="form-label">Company:</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">How can we help you?</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="form-textarea"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
                <img src={contactImage} alt="Contact Us" className="contact-image" />
            </div>
        </div>
    );
};

export default Contact;