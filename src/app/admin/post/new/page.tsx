import Button from '@/components/Button';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
  return (
    <form className='flex flex-col gap-6 p-4'>
      <div className='flex flex-col gap-6 p-4'>
        <InputCheckBox labelText='Título' />
        <InputText labelText='Publicar' />
        <div className='mt-4'>
          <Button type='submit'>Criar Post</Button>
        </div>
      </div>
    </form>
  );
}
