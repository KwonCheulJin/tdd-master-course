import ContentEditForm from '@/components/molecules/content-edit-form';
import ContentDetailHeader from '@/components/organisms/content-detail-header';
import Footer from '@/components/organisms/footer';
import { getAuth } from '@/effects/authorization';
import { contentApi } from '@/effects/main/content-api.effect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getAuth(cookies);
  if (user === undefined) redirect('/users/sign-in');

  const { id } = await params;
  const response = await contentApi.findMyOne(id, user.nickname);
  if (response.status !== 200) redirect('/contents');
  const data = response.data;
  return (
    <>
      <ContentDetailHeader
        contentAuthorNickname={data.content.author.nickname}
        user={user}
      />
      <ContentEditForm content={data.content} userNickname={user.nickname} />
      <Footer />
    </>
  );
}
