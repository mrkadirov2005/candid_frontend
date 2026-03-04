import { type FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLoginMutation } from './use-login.mutation';
import { getErrorMessage } from '#/shared/lib/api-client';
import { getSafeRedirect } from '#/shared/utils/router.util';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginMutation = useLoginMutation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          const target = getSafeRedirect(searchParams.get('redirect'));
          navigate(target, { replace: true });
        },
      },
    );
  }

  const errorMessage = loginMutation.isError ? getErrorMessage(loginMutation.error) : null;

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPending: loginMutation.isPending,
    isDisabled: !email || !password || loginMutation.isPending,
    errorMessage,
    handleSubmit,
  };
}
