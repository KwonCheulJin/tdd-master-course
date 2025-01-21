import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return <div className={clsx('bg-neutral-950 mt-auto h-32', className)}></div>;
}
