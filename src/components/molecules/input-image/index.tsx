import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  className?: string;
}

export default function InputImage({ className }: Props) {
  return (
    <div className={clsx('flex justify-center mb-12', className)}>
      <label htmlFor="thumbnail" className="cursor-pointer">
        <Image width={200} height={200} alt="thumbnail" src="/file.svg" />
      </label>
      <input type="file" id="thumbnail" accept="image/*" className="hidden" />
    </div>
  );
}
