import React, { ReactElement, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useOutsideClick';
import IconBase from '../iconbase/iconbase';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';

interface TableProps {
  columns: {
    label: string
    selector?: string,
    format?: (row: any) => string,
    render?: (row: any) => JSX.Element
  }[];
  data?: any | any[];
  filter?: ReactElement;
  isLoading?: boolean;
}

const Table = ({ columns, data, filter, isLoading }: TableProps) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null) 
  
  const handleClickOutside = () => {
    setFilterDropdownOpen(false);
  };
  
  useClickOutside(backdropRef, handleClickOutside);
  
  return (
    <>
      <div ref={backdropRef} className='mb-4 justify-end flex'>
        <Button
          data-dropdown-toggle='dropdownRadio'
          className='pt-2 pb-2 pr-6 pl-6 transition-colors inline-flex items-center focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 bg-primary text-white hover:bg-indigo-600 hover:border-ray-600 focus:ring-indigo-700'
          type='button'
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
        >
          Filter  
          <IconBase icon={faFilter} className='ml-2 text-gray-50' />     
        </Button>
        <div
          className={`${!filterDropdownOpen && 'hidden'} text-gray-200 p-3 z-10 w-64 justify-start mt-10 absolute divide-y rounded-lg shadow bg-gray-800 divide-gray-700`}
          data-popper-reference-hidden=''
          data-popper-escaped=''
          data-popper-placement='top'
        >
          {filter}
        </div>
      </div>
      <div className='relative overflow-y-scroll shadow-md rounded-lg'>
        <table className='min-w-full text-sm text-left text-gray-300'>
          <thead className='text-xs uppercase bg-primary text-gray-200'>
            <tr>
              {columns.map((el) => (
                <th key={el.label} scope='col' className='px-6 py-3'>
                  {el.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Loading */}
            {!data && isLoading && (
              <tr className='bg-background-quaternary border-b border-gray-700'>
                <td className='px-6 py-4' colSpan={columns.length}>
                  <div className='flex justify-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-primary'></div>
                  </div>
                </td>
              </tr>
            )}
            {/* Display data */}
            {!isLoading && data?.map((el: any, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 == 0
                    ? 'bg-background-quaternary'
                    : 'bg-background-tertiary'
                } border-b border-gray-700`}
              >
                {columns.map((column, index) => (
                  <td key={index} className='px-6 py-4'>
                    {
                      column.render ? column.render(el) :
                      column.format ? column.format(el) :
                      column.selector ? el[column.selector] :
                      '-'
                    }
                  </td>
                ))}
              </tr>
            ))}
            {/* No data */}
            {!isLoading && data && !(data.length > 0) && (
              <tr className='bg-background-quaternary border-b border-gray-700'>
                <td className='px-6 py-4' colSpan={columns.length}>
                  <div className='flex justify-center'>
                    <p className='text-gray-400'>No data</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
