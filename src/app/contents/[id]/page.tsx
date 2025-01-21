import ContentDetailAuthorAside from '@/src/app/components/organisms/content-detail-author-aside';
import ContentDetailCommentSection from '@/src/app/components/organisms/content-detail-comment-section';
import ContentDetailMain from '@/src/app/components/organisms/content-detail-main';
import Footer from '@/src/app/components/organisms/footer';
import Header from '@/src/app/components/organisms/header';

export default function ContentsDetail() {
  return (
    <>
      <Header />
      <ContentDetailMain />
      <ContentDetailAuthorAside />
      <ContentDetailCommentSection />
      <Footer />
    </>
  );
}
