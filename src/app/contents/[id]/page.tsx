import ContentDetailAuthorAside from '@/app/components/organisms/content-detail-author-aside';
import ContentDetailCommentSection from '@/app/components/organisms/content-detail-comment-section';
import ContentDetailMain from '@/app/components/organisms/content-detail-main';
import Footer from '@/app/components/organisms/footer';
import Header from '@/app/components/organisms/header';
import { getAuth } from '@/effects/authorization';
import { contentApi } from '@/effects/main/content-api.effect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getAuth(cookies);
  const { id } = await params;
  const response = await contentApi.findOne(id);
  if (response.status !== 200) redirect('/contents');
  const data = response.data;

  return (
    <>
      <Header
        contentAuthorNickname={data.content.author.nickname}
        user={user}
      />
      <ContentDetailMain content={data.content} />
      <ContentDetailAuthorAside author={data.content.author} />
      <ContentDetailCommentSection isAuthorized={!!user} />
      <Footer />
    </>
  );
}
