// src/app/admin/patients/page.tsx
'use client';

import { useMemo } from 'react';
import { PatientsTable } from '@/components/tables/PatientsTable';
import { patientsData } from '@/data/patients';
import { Menu, Calendar, Mail, Phone, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/CustomInput/Input';
import { Button } from '@/components/ui/CustomButton/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setDateFilter,
  setEmailFilter,
  setPhoneFilter,
  setInsuranceFilter,
  clearAllFilters,
} from '@/store/slices/patientsSlice';

export default function PatientsPage() {
  const dispatch = useAppDispatch();
  const { dateFilter, emailFilter, phoneFilter, insuranceFilter } =
    useAppSelector((state) => state.patients);

  // In PatientsPage, replace the filteredData useMemo with this debug version:
  const filteredData = useMemo(() => {
    console.log('Filtering with:', {
      dateFilter,
      emailFilter,
      phoneFilter,
      insuranceFilter,
    });

    if (!dateFilter && !emailFilter && !phoneFilter && !insuranceFilter) {
      console.log('No filters applied, returning all data');
      return patientsData;
    }

    const filtered = patientsData.filter((patient) => {
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

      const matches =
        matchesDate && matchesEmail && matchesPhone && matchesInsurance;

      if (!matches) {
        console.log('Patient filtered out:', patient.clientInfo.name, {
          matchesDate,
          matchesEmail,
          matchesPhone,
          matchesInsurance,
        });
      }

      return matches;
    });

    console.log(
      'Filtered results:',
      filtered.length,
      'out of',
      patientsData.length
    );
    return filtered;
  }, [dateFilter, emailFilter, phoneFilter, insuranceFilter]);

  const hasActiveFilters =
    dateFilter || emailFilter || phoneFilter || insuranceFilter;
console.log('Redux State:', {
  dateFilter,
  emailFilter,
  phoneFilter,
  insuranceFilter,
});
console.log('Original Data Length:', patientsData.length);
console.log('Filtered Data Length:', filteredData.length);
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='flex items-center px-6 py-4'>
          <button className='p-2 pr-8 mr-8 hover:cursor-pointer border-r border-[#DADCE0]'>
            <Menu className='text-[#8CA9B1]' strokeWidth={3} size={30} />
          </button>
          <div className='flex items-center gap-4 flex-1'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium'>By Date</span>
              <Input
                placeholder='Filter by date'
                value={dateFilter}
                onChange={(e) => dispatch(setDateFilter(e.target.value))}
                className='w-32 h-8'
              />
            </div>

            <div className='flex items-center gap-2'>
              <Mail className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium'>By Email</span>
              <Input
                placeholder='Filter by email'
                value={emailFilter}
                onChange={(e) => dispatch(setEmailFilter(e.target.value))}
                className='w-40 h-8'
              />
            </div>

            <div className='flex items-center gap-2'>
              <Phone className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium'>By Phone No.</span>
              <Input
                placeholder='Filter by phone'
                value={phoneFilter}
                onChange={(e) => dispatch(setPhoneFilter(e.target.value))}
                className='w-32 h-8'
              />
            </div>

            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium'>By Insurance Type</span>
              <select
                value={insuranceFilter}
                onChange={(e) => dispatch(setInsuranceFilter(e.target.value))}
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
                onClick={() => dispatch(clearAllFilters())}
                className='flex items-center gap-1 h-8'
              >
                <X className='h-3 w-3' />
                Clear All
              </Button>
            )}

            <div className='ml-auto flex items-center gap-2'>
              <span className='text-sm text-text-secondary'>
                Show 10 Records
              </span>
              <input type='checkbox' className='rounded' defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow'>
          <PatientsTable data={filteredData} />
        </div>
      </div>
    </div>
  );
}
<Menu strokeWidth={3} />;