import React from 'react'

// use grid layout for users and chat
const ChatPage = () => {
  return (
    <div className=' grid lg:grid-cols-[500px_1fr] relative'>
        {/* <div className='absolute top-0 h-full w-full bg-amber-700 z-20'></div> */}
      {/* left*/}
      <div className=''>
        <p className='text-2xl text-center text-white mt-10 capitalize'>
          chat room name
        </p>

        <p className='text-2xl text-white text-center'>
          participants <span className='bg-rose-500 rounded-full p-1'>10</span>
        </p>

        <div className=' min-h-[300px] mt-12 m-10 bg-white rounded'>
          <ul>
            <li>
              {/* <img src='' alt='' /> */}
              <div>
                <p></p>
              </div>
            </li>
          </ul>
        </div>

        <p className='text-center text-2xl text-white'>Chat Requests</p>
        <div className=' min-h-[200px] mt-12 m-10 bg-white rounded'>

        </div>
      </div>
      {/* right  */}
      <div className=''>
        <p className='text-2xl text-center text-white mt-10 capitalize'>
          chat away
        </p>

        <section className='mt-20'>
          <div className='max-w-[1000px] h-[500px] bg-white mx-auto rounded relative'>
            {/*  */}
          </div>
          <div className=' bottom-0 w-full bg-white max-w-[1000px] mx-auto mt-3 rounded'>
            <form action=''>
              <input
                type='text'
                className='text-2xl  w-full h-full p-4 rounded'
                placeholder='Start Typing'
              />
            </form>
          </div>
        </section>

        <section className='mt-10  flex justify-center'>
          <div>
            <button className='bg-rose-500 text-white text-2xl p-3 rounded cursor-pointer'>
              leave chat
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ChatPage
