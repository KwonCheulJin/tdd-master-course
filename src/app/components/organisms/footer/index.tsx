import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return <div className={clsx(className)}></div>;
}
