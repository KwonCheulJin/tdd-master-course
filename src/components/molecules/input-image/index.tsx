import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

interface Props {
  className?: string;
  src: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  ariaLabel?: string;
  alt: string;
}

export default function InputImage({
  className,
  src,
  onChange,
  ariaLabel,
  alt,
}: Props) {
  return (
    <div className={clsx('flex justify-center mb-12', className)}>
      <label htmlFor="thumbnail" className="cursor-pointer">
        <Image width={200} height={200} alt={alt} src={src} />
      </label>
      <input
        type="file"
        id="thumbnail"
        accept="image/*"
        className="hidden"
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </div>
  );
}
