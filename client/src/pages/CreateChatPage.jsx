import React from 'react'
import LogoutBtn from '../components/Auth Buttons/LogoutBtn'

const CreateChatPage = () => {
  return (
    <div>
      <section>
        <p className='capitalize text-3xl text-center text-white pt-20'>
          create or join chat
        </p>
      </section>

      <section className='mt-10'>
        <div className='grid grid-cols-2'>
          <div>
            <form action='' className='max-w-[500px] mx-auto'>
              <p className='capitalize text-2xl text-center text-white mb-5'>
                create a room
              </p>
              <input
                type='text'
                className='bg-white w-full text-3xl p-4'
                placeholder='Type Room Name'
              />
              <div className='mt-3 flex flex-col'>
                <button className='bg-rose-500 text-white cursor-pointer text-2xl p-3 w-full mb-2'>
                  Start Chat
                </button>
                <LogoutBtn />
              </div>
            </form>
          </div>
          <div>
            <p className='text-2xl text-center text-white capitalize'>
              rooms in use
            </p>

            <ul className='max-w-[300px] mx-auto mt-10'>
              <li className='flex  justify-between items-center bg-white rounded h-10 mb-2'>
                <p className='px-2 capitalize'>travel room </p>
                <button className='bg-rose-500 h-full text-white w-30 cursor-pointer'>
                  join room
                </button>
              </li>

              <li className='flex  justify-between items-center bg-white rounded h-10 mb-2'>
                <p className='px-2 capitalize'>marketing room </p>
                <button className='bg-rose-500 h-full text-white w-30 cursor-pointer'>
                  join room
                </button>
              </li>

              <li className='flex  justify-between items-center bg-white rounded h-10 mb-2'>
                <p className='px-2 capitalize'>sales room </p>
                <button className='bg-rose-500 h-full text-white w-30 cursor-pointer'>
                  join room
                </button>
              </li>

              <li className='flex  justify-between items-center bg-white rounded h-10 mb-2'>
                <p className='px-2 capitalize'>tech room </p>
                <button className='bg-rose-500 h-full text-white w-30 cursor-pointer'>
                  join room
                </button>
              </li>

              <li className='flex  justify-between items-center bg-white rounded h-10 mb-2'>
                <p className='px-2 capitalize'>executives room </p>
                <button className='bg-rose-500 h-full text-white w-30 cursor-pointer '>
                  waiting...
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateChatPage
