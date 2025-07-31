// src/components/tables/PatientsTable.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Patient } from '@/types/patient';
import {
  ChevronDown,
  MessageSquare,
  FileText,
  Calendar,
  Mail,
  Phone,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/CustomButton/Button';
import { Input } from '@/components/ui/CustomInput/Input';

const columnHelper = createColumnHelper<Patient>();

interface PatientsTableProps {
  data: Patient[];
}

export function PatientsTable({ data }: PatientsTableProps) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState('');

  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      columnHelper.accessor('timestamp', {
        header: 'Timestamp',
        cell: (info) => (
          <div className='text-sm text-gray-700'>{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('clientInfo', {
        header: 'Client Info',
        cell: (info) => {
          const client = info.getValue();
          return (
            <div className='text-sm'>
              <div className='font-medium text-gray-900'>{client.name}</div>
              <div className='text-gray-600'>{client.email}</div>
              <div className='text-gray-600'>{client.phone}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('dateOfBirth', {
        header: 'Date of Birth',
        cell: (info) => (
          <div className='text-sm text-gray-700'>{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor(
        (row) => `${row.insuranceType}\nMedicare ID No.\n${row.medicareIdNo}`,
        {
          id: 'insurance',
          header: () => (
            <div className='text-center'>
              <div>Insurance Type</div>
              <div>Medicare ID No.</div>
            </div>
          ),
          cell: (info) => {
            const row = info.row.original;
            return (
              <div className='text-sm text-center'>
                <div className='font-medium'>{row.insuranceType}</div>
                <div className='text-gray-600'>{row.medicareIdNo}</div>
              </div>
            );
          },
        }
      ),
      columnHelper.accessor('message', {
        header: 'Message',
        cell: (info) => (
          <div className='flex justify-center'>
            {info.getValue() ? (
              <MessageSquare className='h-5 w-5 text-blue-500' />
            ) : (
              <div className='h-5 w-5'></div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('disposition', {
        header: 'Disposition',
        cell: (info) => {
          const value = info.getValue();
          return (
            <div className='relative'>
              <select
                value={value}
                className='appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => {
                  // Handle disposition change
                  console.log('Disposition changed:', e.target.value);
                }}
              >
                <option value='Follow Up'>Follow Up</option>
                <option value='New Lead'>New Lead</option>
                <option value='Late by 2D'>Late by 2D</option>
                <option value='Late by 3D'>Late by 3D</option>
              </select>
              <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
            </div>
          );
        },
      }),
      columnHelper.accessor('followUp', {
        header: 'Follow Up',
        cell: (info) => {
          const value = info.getValue();
          const isLate = value.includes('Late');
          return (
            <div
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                isLate
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}
            >
              {value}
            </div>
          );
        },
      }),
      columnHelper.accessor('logs', {
        header: 'Logs',
        cell: (info) => (
          <div className='flex justify-center'>
            {info.getValue() ? (
              <FileText className='h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer' />
            ) : (
              <div className='h-5 w-5'></div>
            )}
          </div>
        ),
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((patient) => {
      const matchesDate =
        !dateFilter ||
        patient.timestamp.toLowerCase().includes(dateFilter.toLowerCase());
      const matchesEmail =
        !emailFilter ||
        patient.clientInfo.email
          .toLowerCase()
          .includes(emailFilter.toLowerCase());
      const matchesPhone =
        !phoneFilter || patient.clientInfo.phone.includes(phoneFilter);
      const matchesInsurance =
        !insuranceFilter ||
        patient.insuranceType
          .toLowerCase()
          .includes(insuranceFilter.toLowerCase());

      return matchesDate && matchesEmail && matchesPhone && matchesInsurance;
    });
  }, [data, dateFilter, emailFilter, phoneFilter, insuranceFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const clearAllFilters = () => {
    setDateFilter('');
    setEmailFilter('');
    setPhoneFilter('');
    setInsuranceFilter('');
  };

  const hasActiveFilters =
    dateFilter || emailFilter || phoneFilter || insuranceFilter;

  return (
    <div className='w-full bg-white'>
      {/* Filter Bar */}
      <div className='flex items-center gap-4 p-4 bg-gray-50 border-b'>
        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium'>By Date</span>
          <Input
            placeholder='Filter by date'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className='w-32 h-8'
          />
        </div>

        <div className='flex items-center gap-2'>
          <Mail className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium'>By Email</span>
          <Input
            placeholder='Filter by email'
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className='w-40 h-8'
          />
        </div>

        <div className='flex items-center gap-2'>
          <Phone className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium'>By Phone No.</span>
          <Input
            placeholder='Filter by phone'
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className='w-32 h-8'
          />
        </div>

        <div className='flex items-center gap-2'>
          <Filter className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium'>By Insurance Type</span>
          <select
            value={insuranceFilter}
            onChange={(e) => setInsuranceFilter(e.target.value)}
            className='border border-gray-300 rounded px-2 py-1 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>All</option>
            <option value='Medicare'>Medicare</option>
            <option value='Blue Cross'>Blue Cross</option>
            <option value='Aetna'>Aetna</option>
            <option value='Cigna'>Cigna</option>
            <option value='United Healthcare'>United Healthcare</option>
            <option value='Humana'>Humana</option>
            <option value='Kaiser'>Kaiser</option>
          </select>
        </div>

        {hasActiveFilters && (
          <Button
            variant='outline'
            size='sm'
            onClick={clearAllFilters}
            className='flex items-center gap-1 h-8'
          >
            <X className='h-3 w-3' />
            Clear All
          </Button>
        )}

        <div className='ml-auto flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Show 10 Records</span>
          <input type='checkbox' className='rounded' defaultChecked />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-slate-500 text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-4 py-3 text-left text-sm font-medium'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4 py-3'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between px-4 py-3 bg-gray-50 border-t'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-700'>
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{' '}
            to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span className='text-sm text-gray-700'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
