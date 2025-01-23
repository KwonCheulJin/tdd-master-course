import ContentsMain from '@/components/organisms/contents-main';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { getAuth } from '@/effects/authorization';
import { cookies } from 'next/headers';

export default async function Contents() {
  const user = await getAuth(cookies);
  return (
    <>
      <Header user={user} />
      <ContentsMain />
      <Footer />
    </>
  );
}
