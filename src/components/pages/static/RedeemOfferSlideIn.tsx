import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BreakLine from '../../general/BreakLine';
import PageContent from '../../layout/PageContent';
import Paragraph from '../../general/Paragraph';
import { XanoOffer } from '../../../@types/apiTypes/offer';
import moment from 'moment';
import useDisableScroll from '../../../hooks/useDisableScroll';
import { redeemOffer } from '../../../lib/offers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';
import { useMutation } from 'react-query';
import { CircularProgress } from '@material-ui/core';

interface SlideInProps {
  isOpen: boolean;
}

const SlideIn = styled.div<SlideInProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 5;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};

  .offerModal {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.bg};
    z-index: 6;
    /* height: 90%; */
    width: 90%;
    transition: 500ms;
    border-radius: 5px;
    /* overflow-y: scroll; */

    header {
      position: relative;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 15px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid ${props => props.theme.border};
      border-bottom: 1px solid ${props => props.theme.border};

      h1 {
        text-align: center;
        width: 100vw;
        font-weight: 700;
      }

      .closeBtn {
        background: none;
        border: none;
        position: absolute;
        z-index: 6;
        left: 8px;

        &:hover {
          cursor: pointer;
        }

        img {
          height: 32px;
          width: auto;
        }
      }
    }

    .offerCoverImg {
      width: 100%;
      height: 175px;
      object-fit: cover;
    }

    main {
      margin: 0;
      padding: 10 17px;
      max-height: 300px;
      overflow-y: scroll;

      small {
        font-size: 0.8rem;
        color: ${props => props.theme.subHText};
      }

      .offerContent {
        h2 {
          margin: 18px auto 15px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .offerCode {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          height: 105px;
          border-radius: 5px;
          border: 2px dashed ${props => props.theme.fg};
          margin: 15px 0;

          h3 {
            font-size: 1.5rem;
            font-weight: 700;
          }
        }
      }
    }
    .modalFooter {
      width: 100%;
      height: 69px;
      margin-top: 20px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid ${props => props.theme.border};
      background-color: ${props => props.theme.bg};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      text-align: center;

      .fullWidthMsg {
        margin: auto;

        .successMsg {
          color: ${props => props.theme.green};
          font-size: 1.1rem;
          font-weight: 700;
        }
      }

      .cancelBtn {
        font-size: 1.14rem;
        padding: 15px;
        border: none;
        font-weight: 600;
        background: none;
      }

      .confirmBtn {
        background-color: ${props => props.theme.green};
        color: white;
        font-weight: 500;
        padding: 10px 45px;
        border: none;
        border-radius: 5px;
        height: 100%;
      }
    }
  }

  @media (max-height: 640px) {
    .offerModal {
      height: 90%;
    }
  }
`;

interface PropTypes {
  isOpen: boolean;
  toggleOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: XanoOffer;
}

const RedeemOfferSlideIn = ({
  isOpen,
  toggleOfferDialog,
  data,
}: PropTypes): JSX.Element => {
  const disableScroll = useDisableScroll();
  const brandId = useSelector((state: RootState) => state.brand.id);
  const [mutate, { status }] = useMutation(
    async () => {
      await axios({
        method: 'POST',
        url: '/api/redeem-offer',
        data: { offerId: data.id, brandId },
      });
    },
    {
      onSuccess: () => {
        const offersRedeemed = localStorage.getItem('offers_redeemed');
        if (offersRedeemed) {
          const arr = JSON.parse(offersRedeemed);
          arr.push(data.id);
          localStorage.setItem('offers_redeemed', JSON.stringify(arr));
        } else {
          localStorage.setItem('offers_redeemed', JSON.stringify([data.id]));
        }
      },
    }
  );

  const checkOfferAlreadyRedeemed = (): boolean => {
    if (typeof localStorage === 'undefined') return false;
    const offersRedeemed = localStorage.getItem('offers_redeemed');
    if (!offersRedeemed) return false;
    const arr: number[] = JSON.parse(offersRedeemed);
    return arr.includes(data.id);
  };

  useEffect(() => {
    disableScroll(isOpen);
  }, [disableScroll, isOpen]);

  return (
    <SlideIn isOpen={isOpen}>
      <div className="offerModal">
        <header>
          <button className="closeBtn" onClick={() => toggleOfferDialog(false)}>
            <img src="/assets/icons/close.svg" alt="close modal" />
          </button>
          <h1>Tongo VIP</h1>
        </header>

        <img
          className="offerCoverImg"
          src={`https://x608-3b7f-b1ce.n7.xano.io${data.photo.path}`}
          alt=""
        />

        <PageContent>
          <div className="offerContent">
            <h2>{data.title}</h2>
            <Paragraph content={data.description} readmore={false} />
            <div className="offerCode">
              <small>Show this code at venue</small>
              <h3>{data.coupon_code}</h3>
              {/* <small>
                Valid through{' '}
                {moment(data.end_date_time).format('MMM Do, YYYY')}
              </small> */}
            </div>
            <small>* Must show hotel key if asked by venue staff.</small>
          </div>
        </PageContent>

        <div className="modalFooter">
          {status === 'idle' && !checkOfferAlreadyRedeemed() && (
            <>
              <button
                className="cancelBtn"
                onClick={() => toggleOfferDialog(false)}
              >
                Cancel
              </button>
              <button className="confirmBtn" onClick={mutate}>
                Confirm
              </button>
            </>
          )}
          {status === 'loading' && (
            <div className="fullWidthMsg">
              <CircularProgress />
            </div>
          )}
          {(status === 'success' || checkOfferAlreadyRedeemed()) && (
            <div className="fullWidthMsg">
              <span className="successMsg">OFFER HAS BEEN REDEEMED</span>
            </div>
          )}
        </div>
      </div>
    </SlideIn>
  );
};

export default RedeemOfferSlideIn;
