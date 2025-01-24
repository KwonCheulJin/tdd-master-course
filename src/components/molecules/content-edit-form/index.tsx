import InputImage from '@/components/molecules/input-image';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { MIDDLE_DOT } from '@/utils/string';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function ContentEditForm({ className }: Props) {
  return (
    <form className={clsx(layoutStyles.mx, className)}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold leading-normal outline-none"
      >
        title
      </div>
      <div className="mb-8">
        <span>charles</span>
        <span>{` ${MIDDLE_DOT} `}</span>
        <span>{localizeDate(new Date('2024-12-24T00:00'))}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="leading-snug outline-none min-h-48 border-b-2 pb-12 mb-12"
      >
        body
      </div>
      <InputImage alt="thumbnail" ariaLabel="thumbnail" />
      <div className="flex justify-center mb-20">
        <button
          className={clsx(
            'px-4 py-2 rounded font-bold bg-green-300 text-black disabled:bg-neutral-800 disabled:text-white'
          )}
          disabled
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
