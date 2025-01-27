import ContentCreateForm from '@/components/molecules/content-create-form';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { getAuth } from '@/effects/authorization';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentPostPage() {
  const user = await getAuth(cookies);

  if (user === undefined) redirect('/users/sign-in');
  return (
    <>
      <Header user={user} />
      <ContentCreateForm userNickname={user.nickname} />
      <Footer />
    </>
  );
}
