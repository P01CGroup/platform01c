import Head from 'next/head';

type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
};

const Seo = ({ title, description, keywords }: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
  </Head>
);

export default Seo; 