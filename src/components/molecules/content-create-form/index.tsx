'use client';
import useFormStatus from '@/components/molecules/content-create-form/hooks/use-form-status';
import { createContentAction } from '@/components/molecules/content-create-form/server-side';
import InputImage from '@/components/molecules/input-image';
import useContentEditable from '@/hooks/use-content-editable';
import useInputImage from '@/hooks/use-input-image';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { MIDDLE_DOT } from '@/utils/string';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

interface Props {
  className?: string;
}

export default function ContentCreateForm({ className }: Props) {
  const router = useRouter();
  const { text: title, onInput: onInputTitle } = useContentEditable('');
  const { text: body, onInput: onInputBody } = useContentEditable('');
  const {
    src: thumbnailSrc,
    url: thumbnailUrl,
    onChange: onChangeThumbnail,
  } = useInputImage('/file.svg');
  const formStatus = useFormStatus({ title, body, thumbnailUrl });

  const onClickSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    if (thumbnailUrl === undefined) return;

    const content = await createContentAction({
      title,
      body,
      thumbnail: thumbnailUrl,
    });
    if (content === undefined) return;

    const url = `/contents/${content.id}`;
    router.push(url);
  };
  return (
    <form className={clsx(layoutStyles.mx, className)}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold leading-normal outline-none"
        onInput={onInputTitle}
        aria-label="title"
      ></div>
      <div className="mb-8">
        <span>charles</span>
        <span>{` ${MIDDLE_DOT} `}</span>
        <span>{localizeDate(new Date('2024-12-24T00:00'))}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="leading-snug outline-none min-h-48 border-b-2 pb-12 mb-12"
        onInput={onInputBody}
        aria-label="body"
      ></div>
      <InputImage
        src={thumbnailSrc}
        onChange={onChangeThumbnail}
        ariaLabel="thumbnail"
        alt="thumbnail"
      />
      <div className="flex justify-center mb-20">
        <button
          className={clsx(
            'px-4 py-2 rounded font-bold bg-green-300 text-black disabled:bg-neutral-800 disabled:text-white'
          )}
          disabled={!formStatus}
          onClick={onClickSubmit}
        >
          생성하기
        </button>
      </div>
    </form>
  );
}
