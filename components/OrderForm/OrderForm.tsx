'use client';
import { useMutation } from '@tanstack/react-query';
import css from './OrderForm.module.css';
import { makeBooking } from '@/lib/api';
import { BookingRequestPayload, BookingRequestResponse } from '@/types/types';
import { useState } from 'react';
import Icon from '../Icon/Icon';
import toast from 'react-hot-toast';

interface FormErrors {
  name?: string;
  email?: string;
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function OrderForm({ id }: { id: string }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState({ name: '', email: '' });

  const validate = (name: string, email: string): FormErrors => {
    const error: FormErrors = {};

    if (name.trim().length === 0) {
      error.name = 'Please enter your name.';
    }

    if (name.trim().length > 50) {
      error.name = 'Name is too long.';
    }

    if (email.trim().length === 0 || !EMAIL_REGEX.test(email)) {
      error.email = 'Please enter your email.';
    }
    return error;
  };
  const { mutate, isPending, isError } = useMutation<
    BookingRequestResponse,
    Error,
    BookingRequestPayload
  >({
    mutationFn: user => makeBooking(id, user),
    onSuccess(data) {
      toast.success(data.message, {
        duration: 6000,
        style: {
          borderRadius: '12px',
          background: 'var(--grey-green)',
          color: '#fff',
          fontSize: '16px',
        },
      });
      setValues({ name: '', email: '' });
    },
  });
  const handleSubmit = (formData: FormData) => {
    const userInfo: BookingRequestPayload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };

    const newErrors = validate(userInfo.name, userInfo.email);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    mutate(userInfo);
  };
  return (
    <div className={css.box}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} action={handleSubmit}>
        <div className={css.nameBox} data-error={Boolean(errors.name)}>
          <input
            className={css.input}
            type="text"
            name="name"
            autoComplete="name"
            id="name"
            maxLength={50}
            value={values.name}
            onChange={e =>
              setValues(state => ({ ...state, name: e.target.value }))
            }
            placeholder=" "
          />
          <label className={css.label} htmlFor="name">
            Name*
          </label>

          {errors.name && (
            <>
              <Icon id="icon-error" className={css.iconError} />
              <p className={css.errorText}>{errors.name}</p>
            </>
          )}
        </div>

        <div className={css.emailBox} data-error={Boolean(errors.email)}>
          <input
            className={css.input}
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            maxLength={254}
            value={values.email}
            onChange={e => {
              setValues(state => ({ ...state, email: e.target.value }));
            }}
            placeholder=" "
          />
          <label className={css.label} htmlFor="email">
            Email*
          </label>

          {errors.email && (
            <>
              <Icon id="icon-error" className={css.iconError} />
              <p className={css.errorText}>{errors.email}</p>
            </>
          )}
        </div>

        <button className={css.submitBtn} type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </button>

        {isError && (
          <p className={css.errorText}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default OrderForm;
