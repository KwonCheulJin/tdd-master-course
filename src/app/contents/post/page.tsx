import ContentCreateForm from '@/app/components/molecules/content-create-form';
import Footer from '@/app/components/organisms/footer';
import Header from '@/app/components/organisms/header';

export default function ContentPostPage() {
  return (
    <>
      <Header />
      <ContentCreateForm />
      <Footer />
    </>
  );
}
