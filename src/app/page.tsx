import MswWrapper from '@/src/app/components/msw-wrapper';
import Test from '@/src/app/components/msw-wrapper/test';

export default function Home() {
  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold text-center leading-snug">
        <div>FRONT-END</div>
        <div className="text-6xl text-green-400">TDD 완전정복</div>
      </h1>

      <MswWrapper>
        <Test />
      </MswWrapper>
    </div>
  );
}
