import clsx from 'clsx';
import Link from 'next/link';
import { UserRoundIcon } from 'lucide-react';
import { Button } from '../Button';
import { InputText } from '../InputText';

export const CreateUserForm = () => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={false}
          defaultValue={''}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='Email'
          placeholder='Seu email'
          disabled={false}
          defaultValue={''}
          required
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={false}
          required
        />
        <InputText
          type='password'
          name='passwordConfirmation'
          labelText='Confirmar senha'
          placeholder='Sua senha novamente'
          disabled={false}
          required
        />
        <Button disabled={false} type='submit' className='mt-4'>
          <UserRoundIcon />
          Criar conta
        </Button>
        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
};
