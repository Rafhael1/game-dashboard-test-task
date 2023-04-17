import React from 'react'
import IconBase from '../iconbase/iconbase';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';

interface ConfirmModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  disabledSave?: boolean;
  onClose: () => void;
  onConfirm?: () => Promise<void>;
  title: string;
  loading?: boolean;
  message?: string;
}

const ConfirmDialog = ({ message, isOpen, onClose, onConfirm, title, loading }: ConfirmModalProps) => {
  const handleConfirm = async() => {
    if(onConfirm){
      await onConfirm();
    }
    onClose();
  }
  
  return (
    <>
      {isOpen && (
        <div
          // ref={ref}
          id='staticModal'
          data-modal-backdrop='static'
          aria-hidden='true'
          className='fixed left-0 top-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  desktop:h-[calc(100%-1rem)] max-h-full'
        >
          <div className='relative m-auto w-full max-w-2xl mobile:max-w-lg max-h-full'>
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg shadow bg-background-quaternary'>
              {/* <!-- Modal header --> */}
              <div className='flex items-start justify-between p-4 border-b rounded-t border-gray-600'>
                <h3 className='text-xl font-semibold text-white'>
                  {title}
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white'
                  data-modal-hide='staticModal'
                  onClick={() => onClose()}
                >
                  <IconBase icon={faClose} />
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className='p-6 space-y-6'>
                <p className='text-white '>
                  {message}
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className='flex items-center p-6 space-x-2 border-t rounded-b border-gray-600'>
                <Button
                  data-modal-hide='staticModal'
                  type='button'
                  color='success'
                  onClick={() => handleConfirm()}
                >
                  Confirm
                  {loading && <IconBase className='ml-2' icon={faSpinner} spin />}
                </Button>
                <Button
                  onClick={onClose}
                  data-modal-hide='staticModal'
                  type='button'
                  color='danger'
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmDialog;