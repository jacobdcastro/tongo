import React from 'react';
import Head from 'next/head';

interface HeadPropTypes {
  data: {
    title: string;
  };
}

const HeadComponent = ({ data }: HeadPropTypes): JSX.Element => {
  return (
    <Head>
      <title key="page-title">{data.title}</title>
    </Head>
  );
};

export default HeadComponent;
