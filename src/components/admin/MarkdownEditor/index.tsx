import { useId } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
};

export const MarkdownEditor = ({
  labelText = '',
  value,
  setValue,
  textAreaName,
  disabled = false,
}: MarkdownEditorProps) => {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <MDEditor
        className='whitespace-pre-wrap'
        value={value}
        onChange={value => setValue(value ?? '')}
        height={400}
        preview='edit'
        hideToolbar={disabled}
        textareaProps={{
          name: textAreaName,
          id,
          disabled,
        }}
        previewOptions={{
          rehypePlugins: [rehypeSanitize],
          remarkPlugins: [remarkGfm],
        }} //evitar ataque XSS
      />
    </div>
  );
};
