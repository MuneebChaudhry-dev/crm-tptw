// src/components/modals/FollowUpModal.tsx
'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/CustomButton/Button';

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string; date: string; time: string }) => void;
  isLoading?: boolean;
}

export function FollowUpModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: FollowUpModalProps) {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert('Please select a date');
      return;
    }

    onSubmit({
      message: message.trim(),
      date,
      time,
    });

    // Reset form
    setMessage('');
    setDate('');
    setTime('00:00');
  };

  const handleClose = () => {
    // Reset form when closing
    setMessage('');
    setDate('');
    setTime('00:00');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-[895px] mx-4 py-[30px] px-[50px]'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-semibold text-[#1C3D5A]'>Follow Up</h2>
          <button
            onClick={handleClose}
            className='p-1 hover:bg-gray-100 rounded-full cursor-pointer'
            disabled={isLoading}
          >
            {/* <X className='h-5 w-5 text-gray-500' /> */}
            <svg
              width='30'
              height='30'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z'
                stroke='#1C3D5A'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M18.75 11.25L11.25 18.75'
                stroke='#1C3D5A'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M11.25 11.25L18.75 18.75'
                stroke='#1C3D5A'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-4'>
          {/* Message Input */}
          <div className='mb-4'>
            <textarea
              placeholder='Enter message here'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2  focus:border-transparent'
              disabled={isLoading}
            />
          </div>

          {/* Date and Time Row */}
          <div className='flex justify-between items-end'>
            {/* Date Input */}
            <div className='flex justify-center gap-4 items-end w-1/2'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Date
                </label>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:border-transparent'
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Time Input */}
              <div className='w-1/2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:border-transparent'
                  disabled={isLoading}
                >
                  {/* Generate time options */}
                  {Array.from({ length: 24 }, (_, hour) => {
                    return Array.from({ length: 4 }, (_, quarter) => {
                      const minutes = quarter * 15;
                      const timeValue = `${hour
                        .toString()
                        .padStart(2, '0')}:${minutes
                        .toString()
                        .padStart(2, '0')}`;
                      const displayTime = new Date(
                        `2000-01-01T${timeValue}`
                      ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      });
                      return (
                        <option key={timeValue} value={timeValue}>
                          {displayTime}
                        </option>
                      );
                    });
                  }).flat()}
                </select>
              </div>
            </div>

            <div className='flex justify-end items-end'>
              <Button
                type='submit'
                disabled={isLoading}
                className='px-6 py-2 min-w-[131px] bg-[#8CA9B1] hover:bg-[#7A9AA2] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Save Button */}
        </form>
      </div>
    </div>
  );
}
