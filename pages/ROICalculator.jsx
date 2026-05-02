"use client";
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/pricing',
      permanent: false,
    },
  };
}

export default function LegacyRedirect() {
  return null;
}
