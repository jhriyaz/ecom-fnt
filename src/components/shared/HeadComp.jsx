import Head from "next/head";

const HeadComp = ({
  title = "Ecommerce Website",
  description = "An ecommerce application building for learning purposes.",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComp;
