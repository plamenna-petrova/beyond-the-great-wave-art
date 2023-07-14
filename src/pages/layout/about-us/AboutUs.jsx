
import { Link } from "react-router-dom";

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";
import Introduction from "../components/introduction/Introduction";
import Invitation from "../components/invitation/Invitation";
import Features from "../components/features/Features";

import './AboutUs.css';

const sectionsImages = [
  {
      relativePath: firstHomePageCarouselImage,
      alt: 'First Home Page Carousel Resource'
  },
  {
      relativePath: secondHomePageCarouselImage,
      alt: 'Second Home Page Carousel Resource'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-wrapper">
      <SecondaryPageMastheadHeader title="About Us" />
      <Introduction aboutImage={sectionsImages[0]} />
      <Invitation />
      <Features featuresImages={sectionsImages} />
    </div>
  );
}

export default AboutUs;