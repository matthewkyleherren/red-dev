'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type OftenKey = 'annual-test' | '2' | '4';

interface OftenOption {
  key: OftenKey;
  label: string;
  sublabel: string;
  priceDisplay: string;
  discountLabel?: string;
  discountStrikethrough?: string;
  value: number;
  checkoutUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const OFTEN_OPTIONS: OftenOption[] = [
  {
    key: 'annual-test',
    label: 'Signature experience',
    sublabel: '11 min full-body RLT + Mindfulness Menu',
    priceDisplay: 'CHF 33',
    value: 33,
    checkoutUrl: '/checkout/membership',
  },
  {
    key: '2',
    label: 'Extended experience',
    sublabel: '22 min full-body RLT + Mindfulness Menu',
    priceDisplay: 'CHF 55',
    value: 55,
    checkoutUrl: '/checkout/membership-2',
  },
  {
    key: '4',
    label: 'Bundle (15 credits)',
    sublabel: 'Valid 6 months · Shareable · CHF 26/credit',
    priceDisplay: 'CHF 330',
    value: 330,
    checkoutUrl: '/checkout/membership-4',
  },
];

const TAB_IMAGES = [
  {
    src: '/images/site/697698e28401ff7a45fb8c9a_img-1.avif',
    srcSet:
      '/images/site/697698e28401ff7a45fb8c9a_img-1-p-500.avif 500w, /images/site/697698e28401ff7a45fb8c9a_img-1-p-800.avif 800w, /images/site/697698e28401ff7a45fb8c9a_img-1.avif 1776w',
  },
  {
    src: '/images/site/697698e25226f422e618c693_img-2.avif',
    srcSet:
      '/images/site/697698e25226f422e618c693_img-2-p-500.avif 500w, /images/site/697698e25226f422e618c693_img-2-p-800.avif 800w, /images/site/697698e25226f422e618c693_img-2.avif 1776w',
  },
  {
    src: '/images/site/697698e22a7599edcfd84588_img-3.avif',
    srcSet:
      '/images/site/697698e22a7599edcfd84588_img-3-p-500.avif 500w, /images/site/697698e22a7599edcfd84588_img-3-p-800.avif 800w, /images/site/697698e22a7599edcfd84588_img-3.avif 1776w',
  },
  {
    src: '/images/site/697698e21124efa839098187_img-4.avif',
    srcSet:
      '/images/site/697698e21124efa839098187_img-4-p-500.avif 500w, /images/site/697698e21124efa839098187_img-4-p-800.avif 800w, /images/site/697698e21124efa839098187_img-4.avif 1776w',
  },
  {
    src: '/images/site/697698e2d04744e6df5603ea_img-5.avif',
    srcSet:
      '/images/site/697698e2d04744e6df5603ea_img-5-p-500.avif 500w, /images/site/697698e2d04744e6df5603ea_img-5-p-800.avif 800w, /images/site/697698e2d04744e6df5603ea_img-5.avif 1776w',
  },
];

const OFTEN_LABELS: Record<OftenKey, string> = {
  'annual-test': 'Single visit',
  '2': 'Extended visit',
  '4': '15-credit bundle',
};

/* ------------------------------------------------------------------ */
/*  SVG icons                                                          */
/* ------------------------------------------------------------------ */

function CheckIconOrange() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.00077 0.117371C9.3387 0.336401 9.43509 0.78791 9.21606 1.12584L4.11189 9.00084C3.98709 9.19339 3.77894 9.31596 3.55002 9.3317C3.32111 9.34744 3.09814 9.25451 2.94816 9.08085L0.177329 5.87252C-0.0858892 5.56774 -0.0521976 5.10729 0.252581 4.84407C0.557359 4.58085 1.01781 4.61454 1.28103 4.91932L3.41668 7.39218L7.9923 0.332662C8.21133 -0.00527079 8.66284 -0.10166 9.00077 0.117371Z" fill="#DC2626" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#F4F4F5" />
      <path d="M13.1667 17.3333C15.4679 17.3333 17.3333 15.4679 17.3333 13.1667C17.3333 10.8655 15.4679 9 13.1667 9C10.8655 9 9 10.8655 9 13.1667C9 15.4679 10.8655 17.3333 13.1667 17.3333Z" fill="#A1A1AA" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1667 7.75C10.1751 7.75 7.75 10.1751 7.75 13.1667C7.75 16.1582 10.1751 18.5833 13.1667 18.5833C14.6626 18.5833 16.0159 17.9777 16.9968 16.9968C17.9777 16.0159 18.5833 14.6626 18.5833 13.1667C18.5833 10.1751 16.1582 7.75 13.1667 7.75ZM6.5 13.1667C6.5 9.48477 9.48477 6.5 13.1667 6.5C16.8486 6.5 19.8333 9.48477 19.8333 13.1667C19.8333 14.7823 19.258 16.2645 18.302 17.4181L21.3169 20.433C21.561 20.6771 21.561 21.0729 21.3169 21.3169C21.0729 21.561 20.6771 21.561 20.433 21.3169L17.4181 18.302C16.2645 19.258 14.7823 19.8333 13.1667 19.8333C9.48477 19.8333 6.5 16.8486 6.5 13.1667Z" fill="#A1A1AA" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#F4F4F5" />
      <path d="M16.0629 6.43923C14.883 5.40242 13.117 5.40242 11.9371 6.43923L7.56214 10.2839C6.887 10.8772 6.5 11.7325 6.5 12.6313V18.3751C6.5 20.101 7.89911 21.5001 9.625 21.5001H10.875C11.6804 21.5001 12.3333 20.8472 12.3333 20.0418V18.1668C12.3333 17.2463 13.0795 16.5001 14 16.5001H14.0751C14.9956 16.5001 15.7418 17.2463 15.7418 18.1668V20.0418C15.7418 20.8472 16.3947 21.5001 17.2001 21.5001H18.375C20.1009 21.5001 21.5 20.101 21.5 18.3751V12.6313C21.5 11.7325 21.113 10.8772 20.4379 10.2839L16.0629 6.43923Z" fill="#A1A1AA" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#F4F4F5" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6637 7.87282C11.9411 8.07828 11.9994 8.46969 11.7939 8.74706L9.01612 12.4971C8.9113 12.6386 8.75165 12.7293 8.57643 12.7469C8.40121 12.7645 8.22669 12.7074 8.09579 12.5896L6.7069 11.3396C6.45033 11.1087 6.42953 10.7135 6.66045 10.4569C6.89136 10.2004 7.28654 10.1796 7.54311 10.4105L8.42093 11.2005L10.7894 8.00302C10.9949 7.72565 11.3863 7.66736 11.6637 7.87282ZM13.1667 10.4584C13.1667 10.1132 13.4465 9.83337 13.7917 9.83337H20.875C21.2202 9.83337 21.5 10.1132 21.5 10.4584C21.5 10.8036 21.2202 11.0834 20.875 11.0834H13.7917C13.4465 11.0834 13.1667 10.8036 13.1667 10.4584ZM6.50001 17.5417C6.50001 16.276 7.52603 15.25 8.79167 15.25C10.0573 15.25 11.0833 16.276 11.0833 17.5417C11.0833 18.8074 10.0573 19.8334 8.79167 19.8334C7.52603 19.8334 6.50001 18.8074 6.50001 17.5417ZM13.1667 17.5417C13.1667 17.1965 13.4465 16.9167 13.7917 16.9167H20.875C21.2202 16.9167 21.5 17.1965 21.5 17.5417C21.5 17.8869 21.2202 18.1667 20.875 18.1667H13.7917C13.4465 18.1667 13.1667 17.8869 13.1667 17.5417Z" fill="#A1A1AA" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 1.875C0 0.839466 0.839466 0 1.875 0H4.37056C4.86784 0 5.34476 0.197544 5.69639 0.549175L9.4545 4.30729C10.1867 5.03952 10.1867 6.22671 9.45451 6.95894L6.95894 9.4545C6.22671 10.1867 5.03952 10.1867 4.30729 9.4545L0.549175 5.69639C0.197544 5.34476 0 4.86784 0 4.37056V1.875ZM2.75 3.5C3.16421 3.5 3.5 3.16421 3.5 2.75C3.5 2.33579 3.16421 2 2.75 2C2.33579 2 2 2.33579 2 2.75C2 3.16421 2.33579 3.5 2.75 3.5Z" fill="#DC2626" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0001 5.83968C10.3453 5.83968 10.6251 6.1195 10.6251 6.46468V9.37521H13.5356C13.8808 9.37521 14.1606 9.65504 14.1606 10.0002C14.1606 10.3454 13.8808 10.6252 13.5356 10.6252H10.6251V13.5357C10.6251 13.8809 10.3453 14.1607 10.0001 14.1607C9.6549 14.1607 9.37508 13.8809 9.37508 13.5357V10.6252H6.46455C6.11937 10.6252 5.83955 10.3454 5.83955 10.0002C5.83955 9.65504 6.11937 9.37521 6.46455 9.37521H9.37508V6.46468C9.37508 6.1195 9.6549 5.83968 10.0001 5.83968Z" fill="#27272A" />
      <path d="M1.66675 9.99984C1.66675 5.39746 5.39771 1.6665 10.0001 1.6665C14.6025 1.6665 18.3334 5.39746 18.3334 9.99984C18.3334 14.6022 14.6025 18.3332 10.0001 18.3332C5.39771 18.3332 1.66675 14.6022 1.66675 9.99984Z" stroke="#27272A" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6066 1.70712C11.9971 1.31659 11.9971 0.683426 11.6066 0.292902C11.216 -0.0976227 10.5829 -0.0976228 10.1923 0.292902L5.94971 4.53554L1.70707 0.292902C1.31654 -0.0976228 0.683377 -0.0976227 0.292853 0.292902C-0.0976717 0.683426 -0.0976714 1.31659 0.292853 1.70712L4.53549 5.94976L0.292853 10.1924C-0.0976717 10.5829 -0.0976714 11.2161 0.292853 11.6066C0.683377 11.9971 1.31654 11.9971 1.70707 11.6066L5.94971 7.36397L10.1923 11.6066C10.5829 11.9971 11.216 11.9971 11.6066 11.6066C11.9971 11.2161 11.9971 10.5829 11.6066 10.1924L7.36392 5.94976L11.6066 1.70712Z" fill="white" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <path d="M15 17.9966L9 11.9966L15 5.99658" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <path d="M9 17.9983L15 11.9983L9 5.99829" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustpilotLogo() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 74 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.2712 6.37885H26.6887V7.75971H23.7681V15.5439H22.1673V7.75971H19.259L19.2712 6.37885ZM26.371 8.90839H27.7397V10.1915H27.7641C27.813 10.0082 27.8985 9.83711 28.0207 9.66603C28.1429 9.49495 28.2896 9.33609 28.4729 9.20167C28.6439 9.05503 28.8395 8.94505 29.0594 8.85951C29.2672 8.77397 29.4871 8.72509 29.7071 8.72509C29.8782 8.72509 30.0004 8.73731 30.0615 8.73731C30.1226 8.74953 30.1959 8.76175 30.257 8.76175V10.1671C30.1592 10.1426 30.0492 10.1304 29.9393 10.1182C29.8293 10.1059 29.7315 10.0937 29.6215 10.0937C29.3771 10.0937 29.145 10.1426 28.925 10.2404C28.705 10.3381 28.5217 10.4848 28.3507 10.6681C28.1918 10.8636 28.0574 11.0958 27.9596 11.3768C27.8619 11.6579 27.813 11.9878 27.813 12.3544V15.5072H26.3466L26.371 8.90839ZM36.978 15.5439H35.536V14.6151H35.5116C35.3283 14.9573 35.0594 15.2139 34.7051 15.4217C34.3507 15.6294 33.9841 15.7272 33.6175 15.7272C32.7499 15.7272 32.1144 15.5194 31.7234 15.0795C31.3323 14.6518 31.1368 13.9919 31.1368 13.1243V8.90839H32.6032V12.9777C32.6032 13.5642 32.7132 13.9797 32.9454 14.2119C33.1653 14.4563 33.4831 14.5785 33.8863 14.5785C34.1918 14.5785 34.4484 14.5296 34.6562 14.4318C34.8639 14.3341 35.035 14.2119 35.1572 14.053C35.2916 13.8942 35.3772 13.6986 35.4383 13.4787C35.4994 13.2587 35.5238 13.0143 35.5238 12.7577V8.90839H36.9902V15.5439H36.978ZM39.4709 13.4176C39.5198 13.8453 39.6786 14.1386 39.9597 14.3219C40.2407 14.4929 40.5829 14.5785 40.9739 14.5785C41.1084 14.5785 41.2672 14.5663 41.4383 14.5418C41.6094 14.5174 41.7805 14.4807 41.9271 14.4196C42.086 14.3585 42.2082 14.273 42.3059 14.1508C42.4037 14.0286 42.4526 13.8819 42.4403 13.6986C42.4281 13.5153 42.367 13.3565 42.2326 13.2343C42.0982 13.1121 41.9393 13.0265 41.7438 12.941C41.5483 12.8677 41.3161 12.8066 41.0595 12.7577C40.8029 12.7088 40.5462 12.6477 40.2774 12.5866C40.0086 12.5255 39.7397 12.4522 39.4831 12.3667C39.2265 12.2811 39.0065 12.1711 38.7988 12.0123C38.6032 11.8656 38.4322 11.6823 38.3222 11.4502C38.2 11.218 38.1389 10.9491 38.1389 10.607C38.1389 10.2404 38.2244 9.94709 38.4077 9.70269C38.5788 9.45829 38.811 9.26277 39.0798 9.11613C39.3487 8.96949 39.6542 8.85951 39.9841 8.79841C40.3141 8.73731 40.6318 8.71287 40.9251 8.71287C41.2672 8.71287 41.5972 8.74953 41.9027 8.82285C42.2082 8.89617 42.5014 9.00615 42.7458 9.17723C43.0025 9.33609 43.2102 9.55605 43.3691 9.81267C43.5401 10.0693 43.6379 10.387 43.6868 10.7536H42.1593C42.086 10.3992 41.9271 10.1671 41.6827 10.0449C41.4261 9.92265 41.145 9.86155 40.8151 9.86155C40.7173 9.86155 40.5829 9.87377 40.4485 9.88599C40.3018 9.91043 40.1796 9.93487 40.0452 9.98375C39.923 10.0326 39.813 10.1059 39.7275 10.1915C39.642 10.277 39.5931 10.3992 39.5931 10.5459C39.5931 10.7292 39.6542 10.8636 39.7764 10.9736C39.8986 11.0835 40.0574 11.1691 40.2652 11.2546C40.4607 11.328 40.6929 11.3891 40.9495 11.4379C41.2061 11.4868 41.475 11.5479 41.7438 11.609C42.0126 11.6701 42.2693 11.7434 42.5259 11.829C42.7825 11.9145 43.0147 12.0245 43.2102 12.1834C43.4057 12.33 43.5768 12.5133 43.699 12.7333C43.8212 12.9532 43.8823 13.2343 43.8823 13.552C43.8823 13.943 43.7968 14.273 43.6135 14.554C43.4302 14.8229 43.198 15.0551 42.9169 15.2261C42.6359 15.3972 42.3059 15.5194 41.9638 15.605C41.6094 15.6783 41.2672 15.7272 40.9251 15.7272C40.5096 15.7272 40.1185 15.6783 39.7642 15.5805C39.4098 15.4828 39.092 15.3361 38.8354 15.1528C38.5788 14.9573 38.3711 14.7251 38.2244 14.4318C38.0778 14.1508 37.9922 13.8086 37.98 13.4054H39.4587V13.4176H39.4709ZM44.2978 8.90839H45.4098V6.9043H46.8762V8.89617H48.196V9.98375H46.8762V13.5276C46.8762 13.6864 46.8884 13.8086 46.9006 13.9308C46.9129 14.0408 46.9495 14.1386 46.9862 14.2119C47.0351 14.2852 47.1084 14.3463 47.1939 14.383C47.2917 14.4196 47.4139 14.4441 47.585 14.4441C47.6827 14.4441 47.7927 14.4441 47.8905 14.4318C47.9882 14.4196 48.0982 14.4074 48.196 14.383V15.5194C48.0371 15.5439 47.8782 15.5561 47.7194 15.5683C47.5605 15.5927 47.4139 15.5927 47.2428 15.5927C46.8518 15.5927 46.5463 15.5561 46.3141 15.4828C46.0819 15.4094 45.8986 15.2995 45.7642 15.165C45.6298 15.0184 45.5442 14.8473 45.4953 14.6396C45.4465 14.4318 45.422 14.1752 45.4098 13.9064V9.99597H44.2978V8.88395V8.90839ZM49.2224 8.90839H50.6033V9.81267H50.6277C50.8355 9.42163 51.1165 9.15279 51.4831 8.98171C51.8497 8.81063 52.2408 8.72509 52.6807 8.72509C53.2062 8.72509 53.6583 8.81063 54.0493 9.00615C54.4404 9.18945 54.7581 9.43385 55.0147 9.76379C55.2714 10.0815 55.4669 10.4603 55.5891 10.888C55.7113 11.3157 55.7846 11.7801 55.7846 12.2567C55.7846 12.7088 55.7235 13.1365 55.6135 13.552C55.4913 13.9675 55.3202 14.3463 55.0881 14.664C54.8559 14.9817 54.5626 15.2384 54.196 15.4339C53.8294 15.6294 53.4139 15.7272 52.9251 15.7272C52.7174 15.7272 52.4974 15.7027 52.2897 15.6661C52.0819 15.6294 51.8742 15.5683 51.6787 15.4828C51.4831 15.3972 51.2998 15.2872 51.141 15.1528C50.9699 15.0184 50.8355 14.8595 50.7255 14.6885H50.7011V18.0001H49.2347V8.90839H49.2224ZM54.3426 12.2322C54.3426 11.939 54.306 11.6457 54.2204 11.3646C54.1471 11.0836 54.0249 10.8391 53.866 10.6192C53.7072 10.3992 53.5117 10.2281 53.2917 10.0937C53.0595 9.95931 52.7907 9.89821 52.4974 9.89821C51.8864 9.89821 51.4221 10.106 51.1043 10.5337C50.7988 10.9614 50.64 11.5357 50.64 12.2445C50.64 12.5866 50.6766 12.8921 50.7622 13.1732C50.8477 13.4542 50.9577 13.6986 51.1288 13.9064C51.2876 14.1141 51.4831 14.273 51.7153 14.3952C51.9475 14.5174 52.2041 14.5785 52.5096 14.5785C52.8518 14.5785 53.1206 14.5052 53.3528 14.3707C53.585 14.2363 53.7683 14.053 53.9271 13.8453C54.0738 13.6253 54.1838 13.3809 54.2449 13.0999C54.306 12.8066 54.3426 12.5255 54.3426 12.2322ZM56.9211 6.37885H58.3875V7.75971H56.9211V6.37885ZM56.9211 8.90839H58.3875V15.5439H56.9211V8.90839ZM59.695 6.37885H61.1614V15.5439H59.695V6.37885ZM65.6339 15.7272C65.1085 15.7272 64.6319 15.6416 64.2164 15.4583C63.8009 15.275 63.4588 15.0428 63.1655 14.7373C62.8844 14.4318 62.6645 14.053 62.5178 13.6253C62.3712 13.1976 62.2856 12.721 62.2856 12.22C62.2856 11.719 62.359 11.2546 62.5178 10.8269C62.6645 10.3992 62.8844 10.0326 63.1655 9.71491C63.4465 9.40941 63.8009 9.16501 64.2164 8.99393C64.6319 8.82285 65.1085 8.72509 65.6339 8.72509C66.1594 8.72509 66.636 8.81063 67.0514 8.99393C67.4669 9.16501 67.8091 9.40941 68.1024 9.71491C68.3834 10.0204 68.6034 10.3992 68.75 10.8269C68.8967 11.2546 68.9822 11.719 68.9822 12.22C68.9822 12.7333 68.9089 13.1976 68.75 13.6253C68.5912 14.053 68.3834 14.4196 68.1024 14.7373C67.8213 15.0428 67.4669 15.2872 67.0514 15.4583C66.636 15.6294 66.1716 15.7272 65.6339 15.7272ZM65.6339 14.5663C65.9516 14.5663 66.2449 14.4929 66.4771 14.3585C66.7215 14.2241 66.9048 14.0408 67.0637 13.8208C67.2225 13.6009 67.3325 13.3443 67.4058 13.0754C67.4791 12.7944 67.5158 12.5133 67.5158 12.22C67.5158 11.939 67.4791 11.6579 67.4058 11.3768C67.3325 11.0958 67.2225 10.8514 67.0637 10.6314C66.9048 10.4114 66.7093 10.2404 66.4771 10.106C66.2327 9.97153 65.9516 9.89821 65.6339 9.89821C65.3162 9.89821 65.0229 9.97153 64.7907 10.106C64.5463 10.2404 64.363 10.4237 64.2042 10.6314C64.0453 10.8514 63.9353 11.0958 63.862 11.3768C63.7887 11.6579 63.752 11.939 63.752 12.22C63.752 12.5133 63.7887 12.7944 63.862 13.0754C63.9353 13.3565 64.0453 13.6009 64.2042 13.8208C64.363 14.0408 64.5586 14.2241 64.7907 14.3585C65.0351 14.5052 65.3162 14.5663 65.6339 14.5663ZM69.4221 8.90839H70.5342V6.9043H72.0006V8.89617H73.3203V9.98375H72.0006V13.5276C72.0006 13.6864 72.0128 13.8086 72.025 13.9308C72.0372 14.0408 72.0739 14.1386 72.1105 14.2119C72.1594 14.2852 72.2327 14.3463 72.3183 14.383C72.416 14.4196 72.5382 14.4441 72.7093 14.4441C72.8071 14.4441 72.9171 14.4441 73.0148 14.4318C73.1126 14.4196 73.2226 14.4074 73.3203 14.383V15.5194C73.1615 15.5439 73.0026 15.5561 72.8437 15.5683C72.6849 15.5927 72.5382 15.5927 72.3672 15.5927C71.9761 15.5927 71.6706 15.5561 71.4384 15.4828C71.2062 15.4094 71.0229 15.2995 70.8885 15.165C70.7541 15.0184 70.6686 14.8473 70.6197 14.6396C70.5708 14.4318 70.5464 14.1752 70.5342 13.9064V9.99597H69.4221V8.88395V8.90839Z" fill="#3F3F46" />
      <path d="M17.5603 6.37885H10.8516L8.78637 0L6.70896 6.37885L0.000175476 6.36663L5.42586 10.3137L3.34846 16.6925L8.77415 12.7455L14.1998 16.6925L12.1347 10.3137L17.5603 6.37885Z" fill="#00B67A" />
      <path d="M12.5999 11.7557L12.1356 10.3137L8.78728 12.7455L12.5999 11.7557Z" fill="#005128" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MembershipPricing() {
  // Tab state
  const [activeTab, setActiveTab] = useState(0);

  // Radio state for "how often"
  const [selectedOften, setSelectedOften] = useState<OftenKey>('annual-test');

  // Modal state
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [planModalAnimating, setPlanModalAnimating] = useState(false);
  const [videoModalAnimating, setVideoModalAnimating] = useState(false);

  // Sticky bar state
  const [stickyVisible, setStickyVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile slider state
  const [mobileSlide, setMobileSlide] = useState(0);
  const totalSlides = TAB_IMAGES.length;

  // Touch swipe refs for mobile slider
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSliderTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleSliderTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleSliderTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      setMobileSlide((s) => Math.min(totalSlides - 1, s + 1));
    } else if (diff < -threshold) {
      setMobileSlide((s) => Math.max(0, s - 1));
    }
  }, [totalSlides]);

  // Derived price and checkout URL
  const selectedOption = OFTEN_OPTIONS.find((o) => o.key === selectedOften)!;
  const checkoutUrl = selectedOption.checkoutUrl;
  const priceNumber = selectedOption.value;
  const oftenLabel = OFTEN_LABELS[selectedOften];

  /* ---------------------------------------------------------------- */
  /*  Scroll lock                                                      */
  /* ---------------------------------------------------------------- */
  const scrollLockCount = useRef(0);
  const scrollY = useRef(0);

  const lockScroll = useCallback(() => {
    scrollLockCount.current += 1;
    if (scrollLockCount.current > 1) return;
    scrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    scrollLockCount.current = Math.max(0, scrollLockCount.current - 1);
    if (scrollLockCount.current !== 0) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY.current);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Modal open/close                                                 */
  /* ---------------------------------------------------------------- */
  const openPlanModal = useCallback(() => {
    setPlanModalOpen(true);
    lockScroll();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlanModalAnimating(true);
      });
    });
  }, [lockScroll]);

  const closePlanModal = useCallback(() => {
    setPlanModalAnimating(false);
    setTimeout(() => {
      setPlanModalOpen(false);
      unlockScroll();
    }, 300);
  }, [unlockScroll]);

  const openVideoModal = useCallback(() => {
    setVideoModalOpen(true);
    lockScroll();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVideoModalAnimating(true);
      });
    });
  }, [lockScroll]);

  const closeVideoModal = useCallback(() => {
    setVideoModalAnimating(false);
    setTimeout(() => {
      setVideoModalOpen(false);
      unlockScroll();
    }, 300);
  }, [unlockScroll]);

  // ESC key handler for modals
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (planModalOpen) closePlanModal();
      if (videoModalOpen) closeVideoModal();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [planModalOpen, videoModalOpen, closePlanModal, closeVideoModal]);

  /* ---------------------------------------------------------------- */
  /*  Sticky bar visibility                                            */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    function update() {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setStickyVisible(r.top <= vh);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* CSS for radio button checked state */}
      <style dangerouslySetInnerHTML={{ __html: `
        .memb_radio-btn-field:has(.memb_radio-btn:checked) {
          background: rgba(220, 38, 38, 0.05);
          border: 1px solid rgba(220, 38, 38, 0.25);
          outline: 2px solid #dc2626;
          outline-offset: -4px;
          box-shadow: 1px 5px 0px #dc2626;
        }
        .memb_radio-btn-field {
          transition: background 0.15s ease, box-shadow 0.15s ease, outline-offset 0.15s ease;
        }
        .memb-slider_pagination-dot {
          transition: width 220ms ease, border-radius 220ms ease, background-color 220ms ease;
          will-change: width;
        }
      `}} />

      <section
        id="gruns-variant"
        data-membership=""
        className="section-membership-new"
        ref={sectionRef}
      >
        <div className="page-padding padding-section-large">
          <div className="container-large z-index-2">
            <div className="memb_form-block w-form">
              <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                method="get"
                className="memb_form-component"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* ================================================ */}
                {/* DESKTOP TABS (hide-tablet)                        */}
                {/* ================================================ */}
                <div className="hide-tablet">
                  <div className="membership_tab-component w-tabs">
                    {/* Tab panes */}
                    <div className="membership_tabs-conent w-tab-content">
                      {TAB_IMAGES.map((img, i) => (
                        <div
                          key={i}
                          className={`membership_tab-pane w-tab-pane${activeTab === i ? ' w--tab-active' : ''}`}
                        >
                          <div className={`membership_tab-conten${i === 0 ? ' is-card' : ''}`}>
                            <img
                              sizes="(max-width: 1776px) 100vw, 1776px"
                              srcSet={img.srcSet}
                              alt=""
                              src={img.src}
                              className="membership_main-image"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Tab thumbnails */}
                    <div className="membership_tab-menu is-grid w-tab-menu">
                      {TAB_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`membership_tab-link is-full-width w-inline-block w-tab-link${activeTab === i ? ' w--current' : ''}`}
                          onClick={() => setActiveTab(i)}
                        >
                          <img
                            sizes="(max-width: 991px) 100vw, (max-width: 1830px) 97vw, 1776px"
                            srcSet={img.srcSet}
                            alt=""
                            src={img.src}
                            className="membership_thumbnail"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Standout row (desktop only) */}
                  <div className="hide-tablet">
                    <div className="memb-standout_row">
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <SearchIcon />
                        </div>
                        <div>630nm, 660nm &amp; 850nm wavelengths</div>
                      </div>
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <HomeIcon />
                        </div>
                        <div>Seefeldstrasse 152, Zurich</div>
                      </div>
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <ChecklistIcon />
                        </div>
                        <div>Guided mindfulness with every session</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================================================ */}
                {/* MOBILE SLIDER (show-tablet)                       */}
                {/* ================================================ */}
                <div className="show-tablet">
                  <div className="example-slider_component is-glp-hero">
                    <div
                      className="example-slider_wrap swiper is-glp-hero"
                      onTouchStart={handleSliderTouchStart}
                      onTouchMove={handleSliderTouchMove}
                      onTouchEnd={handleSliderTouchEnd}
                    >
                      <div
                        className="example-slider_list swiper-wrapper"
                        style={{
                          transform: `translateX(-${mobileSlide * 100}%)`,
                          transition: 'transform 300ms ease',
                          display: 'flex',
                        }}
                      >
                        {TAB_IMAGES.map((img, i) => (
                          <div
                            key={i}
                            className={`example-slider_item swiper-slide is-glp-hero${mobileSlide === i ? ' is-active' : ''}`}
                            style={{ flexShrink: 0, width: '100%' }}
                          >
                            <div className="membership_tab-conten is-mobile">
                              <img
                                sizes="(max-width: 1776px) 100vw, 1776px"
                                srcSet={img.srcSet}
                                alt=""
                                src={img.src}
                                className="image_cover-absolute"
                                style={{ visibility: 'visible' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Slider controls */}
                    <div className="example-slider_layout is-memberships-new">
                      <div className={`example-slider_btn_element is-prev${mobileSlide === 0 ? ' swiper-button-disabled' : ''}`}>
                        <button
                          type="button"
                          className="button-prev is-small is-dark w-inline-block"
                          onClick={() => setMobileSlide((s) => Math.max(0, s - 1))}
                        >
                          <div className="icon-1x1-xsmall w-embed">
                            <ChevronLeftIcon />
                          </div>
                        </button>
                      </div>
                      <div className="example-slider_bullet_wrap is-dark">
                        {TAB_IMAGES.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`memb-slider_pagination-dot${mobileSlide === i ? ' is-active' : ''}`}
                            onClick={() => setMobileSlide(i)}
                          />
                        ))}
                      </div>
                      <div className={`example-slider_btn_element is-next${mobileSlide === totalSlides - 1 ? ' swiper-button-disabled' : ''}`}>
                        <button
                          type="button"
                          className="button-next is-small is-dark"
                          onClick={() => setMobileSlide((s) => Math.min(totalSlides - 1, s + 1))}
                        >
                          <div className="icon-1x1-xsmall w-embed">
                            <ChevronRightIcon />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================================================ */}
                {/* RIGHT COLUMN: Form / Pricing                      */}
                {/* ================================================ */}
                <div className="memb-form_right">
                  {/* Badge row */}
                  <div className="badge-row">
                    <a
                      rel="nofollow"
                      href="https://www.trustpilot.com/review/superpower.com"
                      target="_blank"
                      className="trustpilot-component_inline is-full-wifth-tablet w-inline-block"
                    >
                      <div>Zurich&apos;s leading RLT studio</div>
                      <div className="logo_trustpilot w-embed">
                        <TrustpilotLogo />
                      </div>
                    </a>
                    <div className="line-divider-vertical hide-tablet" />
                    <div>Seefeldstrasse 152</div>
                    <div className="line-divider-vertical" />
                    <div className="badge_block">
                      <div className="icon-1x1-xsmall w-embed">
                        <CheckIconOrange />
                      </div>
                      <div>Gift cards available</div>
                    </div>
                  </div>

                  <h3 className="heading-style-h2 is-membership">Start your red. membership</h3>

                  {/* Mobile standout row */}
                  <div className="show-tablet">
                    <div className="memb-standout_row">
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <SearchIcon />
                        </div>
                        <div>630nm, 660nm &amp; 850nm wavelengths</div>
                      </div>
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <HomeIcon />
                        </div>
                        <div>Seefeldstrasse 152, Zurich</div>
                      </div>
                      <div className="memb-standout_item">
                        <div className="icon-1x1-medium w-embed">
                          <ChecklistIcon />
                        </div>
                        <div>Guided mindfulness with every session</div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing radio form */}
                  <div className="memb_right-block">
                    <div className="text-size-large">Choose your experience</div>
                    <div className="memb_radio-wrapper">
                      {/* Option 1: Signature experience */}
                      <label className="memb_radio-btn-field w-radio">
                        <div className="memb_radio-text-inner">
                          <div className="memb_radio-text-inner-block">
                            <div>Signature experience</div>
                            <div className="memb-radio_text-left-bottom">
                              <div>11 min full-body RLT + Mindfulness Menu</div>
                            </div>
                          </div>
                          <div className="memb_radio-text-inner-block is-auto">
                            <div>CHF 33</div>
                            <div className="memb-radio_month-wrapper" />
                          </div>
                        </div>
                        <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom memb_radio-btn w-radio-input${selectedOften === 'annual-test' ? ' w--redirected-checked' : ''}`} />
                        <input
                          data-often="annual-test"
                          data-often-value="199"
                          name="how-often"
                          data-name="how often"
                          type="radio"
                          id="x1"
                          style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                          checked={selectedOften === 'annual-test'}
                          onChange={() => setSelectedOften('annual-test')}
                          value="x1"
                        />
                      </label>
                    </div>

                    {/* Option 2: 2x per year */}
                    <label className="memb_radio-btn-field w-radio">
                      <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom memb_radio-btn w-radio-input${selectedOften === '2' ? ' w--redirected-checked' : ''}`} />
                      <input
                        data-often="2"
                        data-often-value="368"
                        name="how-often"
                        data-name="how often"
                        type="radio"
                        id="x2"
                        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                        checked={selectedOften === '2'}
                        onChange={() => setSelectedOften('2')}
                        value="x2"
                      />
                      <div className="memb_radio-text-inner">
                        <div className="memb_radio-text-inner-block">
                          <div>Extended experience <span className="text-pill">Recommended</span></div>
                          <div className="memb-radio_text-left-bottom">
                            <div>22 min full-body RLT + Mindfulness Menu</div>
                          </div>
                        </div>
                        <div className="memb_radio-text-inner-block is-auto">
                          <div>CHF 55</div>
                          <div className="memb-radio_month-wrapper">
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Option 3: 4x per year */}
                    <label className="memb_radio-btn-field w-radio">
                      <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom memb_radio-btn w-radio-input${selectedOften === '4' ? ' w--redirected-checked' : ''}`} />
                      <input
                        data-often="4"
                        data-often-value="648"
                        name="how-often"
                        data-name="how often"
                        type="radio"
                        id="x4"
                        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                        checked={selectedOften === '4'}
                        onChange={() => setSelectedOften('4')}
                        value="x4"
                      />
                      <div className="memb_radio-text-inner">
                        <div className="memb_radio-text-inner-block">
                          <div>Bundle (15 credits) <span className="text-pill">Best value</span></div>
                          <div className="memb-radio_text-left-bottom">
                            <div>Valid 6 months · Shareable · CHF 26/credit</div>
                          </div>
                        </div>
                        <div className="memb_radio-text-inner-block is-auto">
                          <div>CHF 330</div>
                          <div className="memb-radio_month-wrapper">
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Video modal trigger */}
                    <button
                      type="button"
                      className="memb_modal-trigger w-inline-block"
                      onClick={openVideoModal}
                    >
                      <img
                        src="/images/site/6977edc295f15759e0a7ca78_Frame%201739335168.avif"
                        loading="lazy"
                        alt=""
                        className="memb_modal-img"
                      />
                      <div className="memb-modal_text-wrapper">
                        <div>Signature vs Extended experiences</div>
                        <div className="text-style-muted">Learn how the Mindfulness Menu pairs with your session.</div>
                        <div className="memb-modal_open-icon w-embed">
                          <PlusIcon />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={checkoutUrl}
                    data-cta="membership"
                    className="button is-icon w-variant-7bd19c40-b53b-3850-8d30-c61fc64d54f7 w-inline-block"
                  >
                    <div>Start your membership</div>
                  </Link>

                  {/* Flexible payments note */}
                  <div className="text-style-muted text-size-small" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                    Cancel anytime · Gift cards available
                  </div>
                </div>
              </form>
              <div className="hide w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="hide w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================ */}
        {/* PLAN MODAL                                        */}
        {/* ================================================ */}
        {planModalOpen && (
          <div data-modal-plan="" className="memb_modal-component is-plan" style={{ display: 'flex' }}>
            <div data-modal-plan="" className="memb-modal_component-wrapper">
              <div
                className="memb-modal_component"
                style={{
                  transform: planModalAnimating ? 'translateY(0)' : 'translateY(5rem)',
                  opacity: planModalAnimating ? 1 : 0,
                  filter: planModalAnimating ? 'blur(0px)' : 'blur(5px)',
                  transition: 'transform 300ms ease, opacity 300ms ease, filter 300ms ease',
                }}
              >
                <div className="memb-modal_text-inner-wrapper is-plan">
                  <div className="hide-tablet">
                    <div className="heading-style-h3">What&apos;s the difference between our experiences?</div>
                  </div>
                  <div className="text-rich-popup w-richtext">
                    <p>The 11-minute signature experience is our core session.<br />Full-body red and near-infrared light paired with a guided meditation from the Mindfulness Menu.</p>
                    <p>The 22-minute extended experience goes deeper.</p>
                    <ul role="list">
                      <li>Deeper relaxation and recovery<br /><sup>More light exposure means more ATP production and cellular repair — ideal after workouts, stressful weeks, or when you need extra restoration.</sup></li>
                    </ul>
                    <ul role="list">
                      <li>Longer meditation journey<br /><sup>Choose from breathwork, body scans, visualisations, and sleep meditations for a more immersive mindfulness experience.</sup></li>
                    </ul>
                    <ul role="list">
                      <li>Maximum skin and tissue benefits<br /><sup>Extended exposure at 630nm, 660nm and 850nm wavelengths stimulates collagen production, reduces inflammation, and supports hormonal balance more deeply.</sup></li>
                    </ul>
                    <p>For those new to RLT, the signature session is a perfect introduction. Members focused on recovery, skin health, or stress management often prefer the extended experience.</p>
                  </div>
                </div>
                <div className="memb-modal_image-wrapper">
                  <div className="show-tablet">
                    <div className="heading-style-h2">What&apos;s the difference between our experiences?</div>
                  </div>
                  <Link href="/checkout" className="memb-modal_panel-item w-inline-block">
                    {/* TODO: replace with red. Studio imagery */}
                    <img
                      src="/images/site/6976b45d447e1815f475e8ee_Baseline%20Panel%20%5BMobile%5D.avif"
                      loading="lazy"
                      alt=""
                      className="memb-modal_panel-img-small"
                    />
                    <div className="memb-modal_panel-text-wrapper">
                      <div>Signature experience</div>
                      <div className="memb-modal-panel-text-bottom">
                        <div className="text-style-muted text-size-small">11 minutes · CHF 33</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/checkout" className="memb-modal_panel-item w-inline-block">
                    {/* TODO: replace with red. Studio imagery */}
                    <img
                      src="/images/site/697a41996a07d9572f3e0fc5_Frame%201597884035.avif"
                      loading="lazy"
                      alt=""
                      className="memb-modal_panel-img-small"
                    />
                    <div className="memb-modal_panel-text-wrapper">
                      <div>Extended experience</div>
                      <div className="memb-modal-panel-text-bottom">
                        <div className="text-style-muted text-size-small">22 minutes · CHF 55</div>
                      </div>
                    </div>
                  </Link>
                  <div className="text-pill is-advanced-panel">For deeper recovery, skin health, or stress management, choose the extended experience.</div>
                </div>
                <div className="memb-modal_gradient" />
              </div>
              {/* Close button */}
              <button
                type="button"
                data-close-modal-plan=""
                className="memb-modal_close"
                onClick={closePlanModal}
              >
                <div className="icon-1x1-xxxsmall w-embed">
                  <CloseIcon />
                </div>
              </button>
            </div>
            {/* Modal background */}
            <div
              data-modal-bg=""
              className="memb-modal-bg"
              style={{
                opacity: planModalAnimating ? 1 : 0,
                transition: 'opacity 250ms ease',
              }}
              onClick={closePlanModal}
            >
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* VIDEO MODAL                                       */}
        {/* ================================================ */}
        {videoModalOpen && (
          <div data-modal-video="" className="memb_modal-component is-video" style={{ display: 'flex' }}>
            <div data-modal-video="" className="memb-modal_component-wrapper">
              <div
                className="memb-modal_component is-video"
                style={{
                  transform: videoModalAnimating ? 'translateY(0)' : 'translateY(5rem)',
                  opacity: videoModalAnimating ? 1 : 0,
                  filter: videoModalAnimating ? 'blur(0px)' : 'blur(5px)',
                  transition: 'transform 300ms ease, opacity 300ms ease, filter 300ms ease',
                }}
              >
                <div className="memb-modal_text-inner-wrapper is-video">
                  <div className="heading-style-h3">Signature vs Extended experiences</div>
                  <img
                    src="/images/site/6977ef7f91eed06b52c82d0c_Frame%201739335365.avif"
                    loading="lazy"
                    sizes="(max-width: 1056px) 100vw, 1056px, 100vw"
                    srcSet="/images/site/6977ef7f91eed06b52c82d0c_Frame%201739335365-p-500.png 500w, /images/site/6977ef7f91eed06b52c82d0c_Frame%201739335365.avif 1056w"
                    alt=""
                    className="memb_person-img"
                  />
                  <div className="margin-top margin-small hide-tablet">
                    <p className="text-color-secondary">
                      The extended experience offers deeper relaxation, more light exposure, and a longer meditation.
                      <br /><br />
                      Learn what makes each experience unique and which one is right for you.
                    </p>
                    <div className="text-pill is-advanced-panel">For maximum benefits, 2–4 sessions per week is recommended.</div>
                  </div>
                </div>
                <div className="memb-modal_video-wrapper">
                  <div
                    data-src="https://vz-294adebf-b53.b-cdn.net/1a9f0098-3bc4-4853-be96-0f6efe56c014/playlist.m3u8"
                    data-poster="/images/site/1a9f0098-3bc4-4853-be96-0f6efe56c014_thumbnail.jpg"
                    aria-label="Open Video"
                    data-type="hls"
                    data-plyr-card="1"
                    className="video-card"
                  >
                    <div className="video-card__overlay">
                      <div data-plyr-activate="1" className="video-card__play">
                        <div className="video-card__play-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Close button */}
              <button
                type="button"
                data-close-modal-video=""
                className="memb-modal_close"
                onClick={closeVideoModal}
              >
                <div className="icon-1x1-xxxsmall w-embed">
                  <CloseIcon />
                </div>
              </button>
            </div>
            {/* Modal background */}
            <div
              data-modal-bg=""
              className="memb-modal-bg"
              style={{
                opacity: videoModalAnimating ? 1 : 0,
                transition: 'opacity 250ms ease',
              }}
              onClick={closeVideoModal}
            />
          </div>
        )}

        {/* ================================================ */}
        {/* STICKY BOTTOM CTA                                 */}
        {/* ================================================ */}
        <div
          data-membership-sticky=""
          className={`memb-sticky_bottom${stickyVisible ? ' is-visible' : ''}`}
          style={{
            transform: stickyVisible ? 'translateY(0)' : 'translateY(110%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div className="page-padding">
            <div className="container-large">
              <div className="memb-sticky_component">
                <div className="memb-sticky_left">
                  <div className="memb-sticky_img-wrapper">
                    <img
                      src="/images/site/6976b45d447e1815f475e8ee_Baseline%20Panel%20%5BMobile%5D.avif"
                      alt=""
                      data-plan-image="baseline"
                      className="image_cover-absolute"
                      style={{ visibility: 'visible' }}
                    />
                    <img
                      src="/images/site/697a41996a07d9572f3e0fc5_Frame%201597884035.avif"
                      alt=""
                      data-plan-image="advanced"
                      className="image_cover-absolute"
                      style={{ display: 'none', visibility: 'visible' }}
                    />
                  </div>
                  <div className="memb-sticky_text-wrapper">
                    <div className="memb-sticky_text-top">
                      <div className="text-size-medium">red. Membership</div>
                    </div>
                    <div className="memb-sticky_text-wrapper-bottom">
                      <div data-bind="often-label">{oftenLabel}</div>
                    </div>
                  </div>
                </div>
                <div className="memb-sticky_btn-wrapper">
                  <Link
                    href={checkoutUrl}
                    data-cta="membership"
                    className="button is-icon orange---large---rectangle w-inline-block"
                  >
                    <div>Start now &ndash; CHF {priceNumber}</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
