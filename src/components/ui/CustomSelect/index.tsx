// src/components/ui/CustomSelect.tsx
import React from 'react';
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
  GroupBase,
} from 'react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
}

// Custom Dropdown Indicator Component
const DropdownIndicator = (
  props: DropdownIndicatorProps<Option, false, GroupBase<Option>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.51762 6H0.482355C0.0547937 6 -0.163021 5.44917 0.143533 5.12211L4.66117 0.302313C4.84671 0.104357 5.15326 0.104357 5.33889 0.302313L9.85652 5.12211C10.163 5.44917 9.94518 6 9.51762 6Z'
            fill='#8CA9B1'
          />
        </svg>
      ) : (
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.51762 0H0.482355C0.0547937 0 -0.163021 0.550834 0.143533 0.877891L4.66117 5.69769C4.84671 5.89564 5.15326 5.89564 5.33889 5.69769L9.85652 0.877891C10.163 0.550834 9.94518 0 9.51762 0Z'
            fill='#8CA9B1'
          />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

// Custom styles for react-select with Tailwind classes
const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '32px',
    height: '38px',
    backgroundColor: '#FFFFFF',
    borderColor: state.isFocused ? '#DEF1FF' : '#ECECEC',
    borderRadius: '5px',
    // boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#DEF1FF' : '#ECECEC',
    },
    fontSize: '14px',
    cursor: 'pointer',
    color: '#1C212D',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none',
  }),
  // valueContainer: (provided) => ({
  //   ...provided,
  //   height: '32px',
  //   padding: '0 8px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   color: '#1c3d5a',
  // }),
  // input: (provided) => ({
  //   ...provided,
  //   margin: '0',
  //   padding: '0',
  // }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  // indicatorsContainer: (provided) => ({
  //   ...provided,
  //   height: '32px',
  //   padding: '0 8px',
  // }),
  menu: (provided) => ({
    ...provided,
    zIndex: 50,
    borderRadius: '6px',
    border: '0px 1px 1px 1px solid #DEF1FF',
    backgroundColor: '#FFFFFF',
    marginTop: '2px',
  }),
  menuList: (provided) => ({
    ...provided,
    // padding: '4px',
    maxHeight: '210px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#8ca9b1'
      : state.isFocused
      ? '#f3f4f6'
      : 'white',
    color: state.isSelected ? 'white' : '#1C212D',
    padding: '8px 12px',
    borderRadius: '4px',
    margin: '2px 0',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: state.isSelected ? '#8ca9b1' : '#f3f4f6',
    },
    borderBottom: '1px solid #DEF1FF',
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1C212D',
    fontSize: '14px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
  }),
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  isDisabled = false,
  className = '',
}: CustomSelectProps) {
  const selectedOption =
    options.find((option) => option.value === value) || null;

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className={className}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={false}
        menuPosition='fixed'
        menuPlacement='auto'
        classNamePrefix='react-select'
      />
    </div>
  );
}
