
import SecondaryPageMastheadHeader from '../components/seconday-page-masthead-header/SecondayPageMastheadHeader';

import './ContactUs.css';

export default function ContactUs() {
    return (
        <div className="contact-us-wrapper">
            <SecondaryPageMastheadHeader title="Contact Us" />
            <div className="container-xxl py-6">
                <div className="container">
                    <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                        <h1 className="display-5 mb-3">Contact Us</h1>
                        <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-5 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-primary text-white d-flex flex-column justify-content-center h-100 p-5 contact-details-container">
                                <h5 className="text-white">Call Us</h5>
                                <p className="mb-5"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                                <h5 className="text-white">Email Us</h5>
                                <p className="mb-5"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                                <h5 className="text-white">Office Address</h5>
                                <p className="mb-5"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                                <h5 className="text-white">Follow Us</h5>
                                <div className="d-flex pt-2">
                                    <a className="btn btn-square btn-outline-light rounded-circle me-1" href="/"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square btn-outline-light rounded-circle me-1" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square btn-outline-light rounded-circle me-1" href="/"><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-square btn-outline-light rounded-circle me-0" href="/"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                            <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: 200 + 'px' }}></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary rounded-pill py-3 px-5" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-xxl px-0 wow fadeIn" data-wow-delay="0.1s" style={{ marginBottom: -6 + 'px' }}>
                <iframe className="w-100" title="google maps pinpointed location" style={{ height: 450 + 'px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2313665713655!2d-0.1312353842299507!3d51.508971179635424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce176ac979%3A0xb3ac7bd29af84262!2sNational%20Portrait%20Gallery!5e0!3m2!1sbg!2sbg!4v1689279805367!5m2!1sbg!2sbg" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}