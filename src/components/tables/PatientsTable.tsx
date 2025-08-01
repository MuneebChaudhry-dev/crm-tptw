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
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
  onPageChange?: (page: number) => void;
  onDispositionChange?: (leadId: string, dispositionStatus: string) => Promise<void>;
}

export function PatientsTable({
  data,
  pagination,
  onPageChange,
  onDispositionChange,
}: PatientsTableProps) {
  console.log('PatientsTable received data length:', data);
  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      // ... keep all your existing column definitions unchanged ...
      columnHelper.accessor('created_at', {
        header: 'Timestamp',
        cell: (info) => {
          const date = new Date(info.getValue());
          return (
            <div className='text-sm text-text-secondary'>
              {date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}{' '}
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          );
        },
      }),
      columnHelper.accessor('clientInfo', {
        header: 'Client Info',
        cell: (info) => {
          const client = info.getValue();
          return (
            <div className='text-sm'>
              <div className='font-medium text-text-secondary'>
                {client?.name}
              </div>
              <div className='text-text-secondary'>{client?.email}</div>
              <div className='text-text-secondary'>{client?.phone}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('dob', {
        header: 'Date of Birth',
        cell: (info) => (
          <div className='text-sm text-text-secondary'>{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor(
        (row) => `${row.insurance_type}\nMedicare ID No.\n${row.med_id}`,
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
                  {row.insurance_type || '-'}
                </div>
                <div className='text-sm text-text-secondary'>
                  {row.med_id || '-'}
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
      columnHelper.accessor('disposition_status', {
        header: 'Disposition',
        cell: (info) => {
          const value = info.getValue();
          const patient = info.row.original;

          return (
            <div className='w-40'>
              <CustomSelect
                value={value}
                onChange={(newValue) => {
                  // Call the onDispositionChange prop
                  if (onDispositionChange) {
                    onDispositionChange(patient.id, newValue);
                  }
                }}
                options={DISPOSITION_OPTIONS}
                className='text-sm'
              />
            </div>
          );
        },
      }),
      columnHelper.accessor('follow_up_date', {
        header: 'Follow Up',
        cell: (info) => {
          const value = info.getValue();
          if (!value)
            return <div className='text-sm text-text-secondary'>-</div>;

          const followUpDate = new Date(value);
          const today = new Date();
          const diffTime = today.getTime() - followUpDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const isLate = diffDays > 0;
          const displayText = isLate
            ? `Late by ${diffDays}D`
            : followUpDate.toLocaleDateString();

          return (
            <div
              className={`inline-block px-2 py-1 rounded text-text-secondary font-medium ${
                isLate
                  ? 'bg-red-100 border border-[#DF0000]'
                  : 'bg-[#FED30026] border border-[#FED300]'
              }`}
            >
              {displayText}
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
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Enable manual pagination
    pageCount: pagination?.last_page || 1,
    state: {
      pagination: {
        pageIndex: (pagination?.current_page || 1) - 1,
        pageSize: pagination?.per_page || 10,
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
            {pagination
              ? (pagination.current_page - 1) * pagination.per_page + 1
              : 1}{' '}
            to{' '}
            {pagination
              ? Math.min(
                  pagination.current_page * pagination.per_page,
                  pagination.total
                )
              : data.length}{' '}
            of {pagination?.total || data.length} entries
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              onPageChange && onPageChange((pagination?.current_page || 1) - 1)
            }
            disabled={!pagination?.prev_page_url}
          >
            Previous
          </Button>

          <span className='text-sm text-gray-700'>
            Page {pagination?.current_page || 1} of {pagination?.last_page || 1}
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              onPageChange && onPageChange((pagination?.current_page || 1) + 1)
            }
            disabled={!pagination?.next_page_url}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
