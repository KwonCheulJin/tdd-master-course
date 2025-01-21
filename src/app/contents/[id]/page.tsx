import ContentDetailAuthorAside from '@/app/components/organisms/content-detail-author-aside';
import ContentDetailCommentSection from '@/app/components/organisms/content-detail-comment-section';
import ContentDetailMain from '@/app/components/organisms/content-detail-main';

export default function ContentsDetail() {
  return (
    <>
      <ContentDetailMain />
      <ContentDetailAuthorAside />
      <ContentDetailCommentSection />
    </>
  );
}
