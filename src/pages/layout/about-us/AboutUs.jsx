
import Spinner from '../../../components/spinner/Spinner';

import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";
import Introduction from "../components/introduction/Introduction";
import Invitation from "../components/invitation/Invitation";
import Features from "../components/features/Features";

import './AboutUs.css';
import { useEffect } from 'react';
import { getSectionsImages } from '../../../helpers/functions';
import { useState } from 'react';

export default function AboutUs() {
  const [isAboutUsPageDataLoaded, setIsAboutUsPageDataLoaded] = useState(false);
  const [sectionsImages, setSectionsImages] = useState([]);

  useEffect(() => {
    const loadAboutUsDataAsync = async () => {
      await getSectionsImages().then((images) => {
        setSectionsImages(images);
        setIsAboutUsPageDataLoaded(true);
      }).catch((error) => {
        console.log('error', error);
        setIsAboutUsPageDataLoaded(false);
      });
    };
    loadAboutUsDataAsync();
  });

  return (
    <div className="about-us-wrapper">
      {!isAboutUsPageDataLoaded && <Spinner />}
      {isAboutUsPageDataLoaded && (
        <>
          <SecondaryPageMastheadHeader title="About Us" />
          <Introduction introductionImage={sectionsImages[0]} />
          <Invitation />
          <Features featuresImages={sectionsImages} />
        </>
      )}
    </div>
  );
}