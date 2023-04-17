import React from 'react'
import Button from '../button/button'
import IconBase from '../iconbase/iconbase';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  disabledSave?: boolean;
  handleClose: () => void;
  onConfirm?: () => Promise<void>;
  title: string;
  loading?: boolean;
}

const Modal = ({ children, isModalOpen, disabledSave, handleClose, onConfirm, title, loading }: ModalProps) => {
  const handleConfirm = async() => {
    if(onConfirm){
      await onConfirm();
    }
    handleClose();
  }

  return (
    <>
      {isModalOpen && (
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
                  onClick={() => handleClose()}
                >
                  <IconBase icon={faClose} />
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className='p-6 space-y-6'>
                {children}
              </div>
              {/* <!-- Modal footer --> */}
              <div className='flex items-center p-6 space-x-2 border-t rounded-b border-gray-600'>
                <Button
                  disabled={disabledSave}
                  data-modal-hide='staticModal'
                  type='button'
                  color='success'                  
                  onClick={() => handleConfirm()}
                >
                  Save
                  {loading && <IconBase className='ml-2' icon={faSpinner} spin />}
                </Button>
                <Button
                  onClick={() => handleClose()}
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

export default Modal
