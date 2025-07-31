// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/CustomInput/Input';
import { Button } from '@/components/ui/CustomButton/Button';
import Image from 'next/image';

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-foreground  flex'>
      {/* Left side - Image */}
      <div className='hidden lg:flex lg:w-1/2 relative'>
        <div className='w-full h-full bg-background  flex items-center justify-center'>
          {/* Replace with your actual image */}
          <Image
            src='/images/auth/loginBg.jpg'
            layout='fill'
            objectFit='cover'
            alt='Login Background'
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className='w-full bg-background rounded-tl-[60px] rounded-bl-[60px] lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          {/* Logo and Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center mb-6'>
              <Image
                src='/images/auth/login_logo.png'
                alt='Logo'
                width={270}
                height={132}
                className='object-contain'
              />
            </div>
            <h1 className='text-[28px] font-normal text-heading mb-2  font-dm-serif'>
              Welcome TPTW Member
            </h1>
            <p className='text-para'>Login to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {error && (
              <div className='bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-md text-sm'>
                {error}
              </div>
            )}

            <Input
              label='Username*'
              type='email'
              placeholder='Enter your username'
              {...register('username', {
                required: 'Username is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              error={errors.username?.message}
            />

            <Input
              label='Password*'
              isPassword
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />

            <Button
              type='submit'
              variant='primary'
              size='lg'
              loading={loading}
              className='w-full font-bold'
            >
              Login
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className='mt-8 p-4 bg-foreground/10 rounded-lg'>
            <h3 className='text-sm font-medium text-heading mb-2'>
              Demo Credentials:
            </h3>
            <div className='text-xs text-white-700 space-y-1'>
              <p>
                <strong>Admin:</strong> admin@tptw.com / admin123
              </p>
              <p>
                <strong>User:</strong> user@tptw.com / user123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
