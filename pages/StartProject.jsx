"use client";
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/contact?type=website-evaluation',
      permanent: false,
    },
  };
}

export default function LegacyRedirect() {
  return null;
}
