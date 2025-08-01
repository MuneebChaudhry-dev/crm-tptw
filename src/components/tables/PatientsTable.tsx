// src/components/tables/PatientsTable.tsx
'use client';

import React, { useMemo } from 'react'; // Remove useState
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
  MessageSquare,
  FileText,
  // Remove Calendar, Mail, Phone, Filter, X - no longer needed
} from 'lucide-react';
import { Button } from '@/components/ui/CustomButton/Button';
// Remove Input import - no longer needed
import { CustomSelect } from '@/components/ui/CustomSelect';
import { DISPOSITION_OPTIONS } from '@/lib/constants/dispositionOptions';

const columnHelper = createColumnHelper<Patient>();

interface PatientsTableProps {
  data: Patient[];
}

export function PatientsTable({ data }: PatientsTableProps) {
   console.log('PatientsTable received data length:', data);
  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      // ... keep all your existing column definitions unchanged ...
      columnHelper.accessor('timestamp', {
        header: 'Timestamp',
        cell: (info) => (
          <div className='text-sm text-text-secondary'>{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('clientInfo', {
        header: 'Client Info',
        cell: (info) => {
          const client = info.getValue();
          return (
            <div className='text-sm'>
              <div className='font-medium text-text-secondary'>
                {client.name}
              </div>
              <div className='text-text-secondary'>{client.email}</div>
              <div className='text-text-secondary'>{client.phone}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('dateOfBirth', {
        header: 'Date of Birth',
        cell: (info) => (
          <div className='text-sm text-text-secondary'>{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor(
        (row) => `${row.insuranceType}\nMedicare ID No.\n${row.medicareIdNo}`,
        {
          id: 'insurance',
          header: () => (
            <div className='text-left'>
              <div>Insurance Type</div>
              <div>Medicare ID No.</div>
            </div>
          ),
          cell: (info) => {
            const row = info.row.original;
            return (
              <div className='text-sm text-left'>
                <div className='text-sm text-text-secondary'>
                  {row.insuranceType}
                </div>
                <div className='text-sm text-text-secondary'>
                  {row.medicareIdNo}
                </div>
              </div>
            );
          },
        }
      ),
      columnHelper.accessor('message', {
        header: () => (
          <div className='text-center'>
            <div>Message</div>
          </div>
        ),
        cell: (info) => (
          <div className='flex justify-center'>
            {info.getValue() ? (
              <MessageSquare className='h-5 w-5 text-foreground cursor-pointer' />
            ) : (
              <div className='h-5 w-5'> - </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('disposition', {
        header: 'Disposition',
        cell: (info) => {
          const value = info.getValue();
          return (
            <div className='w-40'>
              <CustomSelect
                value={value}
                onChange={(newValue) => {
                  console.log('Disposition changed:', newValue);
                  // You can dispatch actions here to update the data
                }}
                options={DISPOSITION_OPTIONS}
                className='text-sm'
              />
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
              className={`inline-block px-2 py-1 rounded text-text-secondary font-medium ${
                isLate
                  ? 'bg-red-100  border border-[#DF0000]'
                  : 'bg-[#FED30026]  border border-[#FED300]'
              }`}
            >
              {value}
            </div>
          );
        },
      }),
      columnHelper.accessor('logs', {
        header: () => (
          <div className='text-center'>
            <div>Logs</div>
          </div>
        ),
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

  // Remove filteredData useMemo - data is already filtered from parent
  // Use data directly
  const table = useReactTable({
    data: data, // Use the already filtered data from props
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

  return (
    <div className='w-full bg-white'>
      {/* Remove entire Filter Bar section - it's now in the page */}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-foreground text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='font-bold font-lato px-3 py-3.5 text-left text-[16px] capitalize'
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
          <tbody className='divide-y divide-[#DEF1FF]'>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className='bg-[#FAFDFF]'>
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

      {/* Pagination - keep unchanged */}
      {/* Pagination - FIXED VERSION */}
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
              data.length // Use data.length instead of table.getFilteredRowModel().rows.length
            )}{' '}
            of {data.length} entries{' '}
            {/* Use data.length instead of table.getFilteredRowModel().rows.length */}
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
