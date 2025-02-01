'use client';
import useFormStatus from '@/components/molecules/content-edit-form/hooks/use-form-status';
import { editContentAction } from '@/components/molecules/content-edit-form/server-side';
import InputImage from '@/components/molecules/input-image';
import { ContentView } from '@/domains/content/type';
import useContentEditable from '@/hooks/use-content-editable';
import useInputImage from '@/hooks/use-input-image';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { MIDDLE_DOT } from '@/utils/string';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

interface Props {
  className?: string;
  content: ContentView;
  userNickname: string;
}

export default function ContentEditForm({
  className,
  content,
  userNickname,
}: Props) {
  const router = useRouter();
  const { id } = useParams();
  const { text: title, onInput: onInputTitle } = useContentEditable(
    content.title
  );
  const { text: body, onInput: onInputBody } = useContentEditable(content.body);
  const {
    src: thumbnailSrc,
    url: thumbnailUrl,
    onChange: onChangeThumbnail,
  } = useInputImage(content.thumbnail, content.thumbnail);
  const formStatus = useFormStatus({ title, body, thumbnailUrl, content });

  const onClickSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    if (thumbnailUrl === undefined) return;
    if (typeof id === 'object') return;
    if (id === undefined) return;

    const content = await editContentAction({
      id,
      title,
      body,
      thumbnail: thumbnailUrl,
    });
    if (content === undefined) return;

    const url = `/contents/${content.id}`;
    router.push(url);
  };
  return (
    <form className={clsx(layoutStyles.mx, 'mt-8', className)} role="form">
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold leading-normal outline-none"
        onInput={onInputTitle}
        aria-label="title"
      >
        {content.title}
      </div>
      <div className="mb-8">
        <span>{userNickname}</span>
        <span>{` ${MIDDLE_DOT} `}</span>
        <span>{localizeDate(new Date(content.createdAt))}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="leading-snug outline-none min-h-48 border-b-2 pb-12 mb-12"
        onInput={onInputBody}
        aria-label="body"
      >
        {content.body}
      </div>
      <InputImage
        src={thumbnailSrc}
        onChange={onChangeThumbnail}
        ariaLabel="thumbnail"
        alt="thumbnail"
      />
      <div className="flex justify-center mb-20">
        <button
          className={clsx(
            'px-4 py-2 rounded font-bold bg-green-300 text-black disabled:bg-neutral-800 disabled:text-white disabled:cursor-not-allowed'
          )}
          disabled={!formStatus}
          onClick={onClickSubmit}
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
