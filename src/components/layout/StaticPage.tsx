import React, { useEffect, useState } from 'react';
import { BackButton } from '../general/buttons';
import PageHeader from '../pages/static/Header';
import PageContent from './PageContent';
import RedeemOfferSlideIn from '../pages/static/RedeemOfferSlideIn';
import { GetStaticPropsContext } from 'next';
import { UseRedeemOffer } from '../../@types/hooks';
import { PageType } from '../../@types/general';
import { XanoVenue } from '../../@types/apiTypes/venue';
import { XanoListing } from '../../@types/apiTypes/listing';
import { isXanoVenue } from '../../lib/listings';
import useInitialBrandSetter from '../../hooks/useInitialBrandSetter';
import useOfferAvailable from '../../hooks/useOfferAvailable';
import useXanoImageByWindowSize from '../../hooks/useXanoImageByWindowSize';

interface PropTypes {
  ctx?: GetStaticPropsContext;
  children: JSX.Element[];
  redeemOfferState: UseRedeemOffer;
  pageType?: PageType;
  data: XanoVenue | XanoListing;
  offerIsAvailable?: boolean;
}

const StaticPage = ({
  // ctx,
  children,
  redeemOfferState,
  data,
  pageType,
  offerIsAvailable,
}: PropTypes): JSX.Element => {
  const [imgUrl, setImgUrl] = useState<string>();
  const setImgSize = useXanoImageByWindowSize();
  useInitialBrandSetter();
  const { offerDialogIsOpen, toggleOfferDialog } = redeemOfferState;

  const imgPath = isXanoVenue(data)
    ? data.main_image
      ? data.main_image.path
      : null
    : data.photo
    ? data.photo.path
    : null;

  useEffect(() => {
    setImgUrl(`
        https://x608-3b7f-b1ce.n7.xano.io${imgPath}?tpl=${setImgSize(2)}`);
  }, []);

  return (
    <>
      <BackButton backupUrl="/" />
      {imgPath ? (
        <PageHeader imgSrc={imgUrl} imgAlt="" />
      ) : (
        <PageHeader
          imgSrc="/assets/heroImg/image1.png"
          imgAlt="Santa Barbara at sunset"
        />
      )}
      <PageContent isStaticPage>{children}</PageContent>
      {offerIsAvailable && (
        <RedeemOfferSlideIn
          data={data._offer_of_venue[0]}
          isOpen={offerDialogIsOpen}
          toggleOfferDialog={toggleOfferDialog}
        />
      )}
    </>
  );
};

export default StaticPage;
