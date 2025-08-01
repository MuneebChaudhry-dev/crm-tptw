// src/app/admin/patients/page.tsx
'use client';

import { useMemo } from 'react';
import { PatientsTable } from '@/components/tables/PatientsTable';
import { patientsData } from '@/data/patients';
import { Menu, Calendar, Search } from 'lucide-react';
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

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='bg-white'>
        <div className='flex items-center px-6 py-4'>
          <button className='p-2 pr-8 mr-8 hover:cursor-pointer border-r border-[#DADCE0]'>
            <Menu className='text-[#8CA9B1]' strokeWidth={3} size={30} />
          </button>
          <div className='flex items-center gap-4 flex-1'>
            <div className='flex items-center gap-2'>
              <Input
                type='date' // Change to date input
                placeholder='By Date'
                value={dateFilter}
                onChange={(e) => dispatch(setDateFilter(e.target.value))}
                className='w-32 h-8'
                icon={<Calendar className='h-4 w-4' />} // Move icon inside
              />
            </div>

            <div className='flex items-center gap-2'>
              <Input
                placeholder='By Email'
                value={emailFilter}
                onChange={(e) => dispatch(setEmailFilter(e.target.value))}
                className='w-40 h-8'
                icon={<Search className='h-4 w-4' />} // Move icon inside
              />
            </div>

            <div className='flex items-center gap-2'>
              <Input
                placeholder='By Phone No.'
                value={phoneFilter}
                onChange={(e) => dispatch(setPhoneFilter(e.target.value))}
                className='w-32 h-8'
                icon={<Search className='h-4 w-4' />} // Move icon inside
              />
            </div>

            <div className='flex items-center gap-2'>
              <select
                value={insuranceFilter}
                onChange={(e) => dispatch(setInsuranceFilter(e.target.value))}
                className='border border-gray-300 rounded px-2 py-1 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>By Insurance Type</option>
                <option value='Medicare'>Medicare</option>
                <option value='Blue Cross'>Blue Cross</option>
                <option value='Aetna'>Aetna</option>
                <option value='Cigna'>Cigna</option>
                <option value='United Healthcare'>United Healthcare</option>
                <option value='Humana'>Humana</option>
                <option value='Kaiser'>Kaiser</option>
              </select>
            </div>

            <div
              onClick={() => dispatch(clearAllFilters())}
              className='flex items-center gap-1 h-8'
            >
              Clear All
              <svg
                width='17'
                height='15'
                viewBox='0 0 17 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.502 13.9612L11 14L16.3175 8.4606C16.7574 8.00197 16.9996 7.39224 16.9996 6.74366C16.9996 6.09515 16.7574 5.48539 16.3175 5.02676L12.178 0.710043C11.2701 -0.236681 9.79293 -0.236681 8.88506 0.710043L0.682059 9.26415C0.242217 9.72278 0 10.3325 0 10.9811C0 11.6296 0.242217 12.2394 0.682059 12.698L2.74371 14.8479C2.83711 14.9453 2.96378 15 3.09586 15H16.502C16.777 15 17 14.7675 17 14.4806C17 14.1938 16.777 13.9612 16.502 13.9612ZM7.83365 3.27541L9.14441 4.64226L5.12739 8.83125L3.81663 7.46439L7.83365 3.27541ZM11.8424 7.45567L7.82531 11.6446L5.8317 9.56569L9.84874 5.37674L11.8424 7.45567ZM12.5467 8.19015L13.8575 9.55704L12.5138 10.9583L9.84048 13.746L8.52965 12.3791L12.5467 8.19015ZM9.58943 1.44452C10.1089 0.90283 10.9542 0.90283 11.4737 1.44452L15.6132 5.76124C16.1327 6.30297 16.1327 7.18442 15.6132 7.72612L14.5618 8.82256L8.53798 2.54093L9.58943 1.44452ZM1.38636 11.9635C1.13468 11.7011 0.996094 11.3521 0.996094 10.9811C0.996094 10.61 1.13468 10.2611 1.38633 9.99866L3.11226 8.19887L4.77514 9.93291L7.47309 12.7464L8.63816 13.9612H3.30215L1.38636 11.9635Z'
                  fill='#1C3D5A'
                />
              </svg>
            </div>

            {/* <div className='ml-auto flex items-center gap-2'>
              <span className='text-sm text-text-secondary'>
                Show 10 Records
              </span>
              <input type='checkbox' className='rounded' defaultChecked />
            </div> */}
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