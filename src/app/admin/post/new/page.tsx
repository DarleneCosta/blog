import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
  return (
    <>
      <div className='flex flex-row gap-4 p-4'>
        <Button>
          Criar Post <PlusIcon />
        </Button>

        <Button variant='ghost' size='sm'>
          Criar Post <PlusIcon />
        </Button>

        <Button variant='danger' size='lg'>
          Criar Post <PlusIcon />
        </Button>
      </div>
      <div className='flex flex-row gap-4 p-4'>
        <Button disabled>
          Criar Post <PlusIcon />
        </Button>

        <Button variant='ghost' size='sm' disabled>
          Criar Post <PlusIcon />
        </Button>

        <Button variant='danger' size='lg' disabled>
          Criar Post <PlusIcon />
        </Button>
      </div>
    </>
  );
}
