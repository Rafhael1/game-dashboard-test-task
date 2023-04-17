import React from 'react'
import Button from '../button/button'
import IconBase from '../iconbase/iconbase';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ children, isModalOpen, handleClose, onConfirm, title, loading }: any) => {
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
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className='p-6 space-y-6'>
                {children}
              </div>
              {/* <!-- Modal footer --> */}
              <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                <Button
                  data-modal-hide='staticModal'
                  type='button'
                  color='success'
                  onClick={() => handleConfirm()}
                >
                  Salvar
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
