import React from 'react'
import FormTextInput from '../components/inputs/FormTextInput'

const elements = [
  {
    id: 1,
    type: 'text',
    name: 'userName',
    placeholder: 'Enter User Name',
    defaultValue: 'test-user-123',
  },
  {
    id: 2,
    type: 'text',
    name: 'firstName',
    placeholder: 'Test',
  },
  {
    id: 3,
    type: 'text',
    name: 'lastName',
    placeholder: 'Enter Last Name',
    defaultValue: 'User',
  },
  {
    id: 4,
    type: 'text',
    name: 'email',
    placeholder: 'Enter Email',
    defaultValue: 'test.user@gmail.com',
  },
  {
    id: 5,
    type: 'text',
    name: 'password',
    placeholder: 'Enter Password',
    defaultValue: '111111',
  },
  {
    id: 6,
    type: 'checkbox',
    name: 'isVerified',
    text: 'Is Verified',
    defaultValue: true,
  },
  {
    id: 7,
    type: 'checkbox',
    name: 'isOnline',
    text: 'Is On Line',
    defaultValue: false,
  },
]
const UserDash = () => {
  return (
    <div>
      <section className='py-10'>
        <p className='text-3xl text-white text-center'>User Dashboard</p>
      </section>

      <section>
        <div className='grid grid-cols-2'>
          <div>
            <p className='text-2xl text-white text-center mb-3'>User Info</p>
            <div className='max-w-[700px] mx-auto'>
              <form action='' className=''>
                <div className='grid grid-cols-2 gap-5 '>
                  {/*TEXT */}
                  {elements
                    .filter((item) => item.type === 'text')
                    .map((item, i) => {
                      return (
                        <FormTextInput
                          key={i}
                          type={item.type}
                          placeholder={item.placeholder}
                          className={`input w-full mb-2`}
                          defaultValue={item.defaultValue}
                        />
                      )
                    })}
                </div>
                {/*BOOLEANS */}
                <div className='flex gap-5'>
                  {elements
                    .filter((item) => item.type === 'checkbox')
                    .map((item, i) => {
                      return (
                        <label key={i} htmlFor={item.name}>
                          <p className='text-white'> {item.text}</p>
                          <input
                            id={item.name}
                            name={item.name}
                            type='checkbox'
                            defaultChecked={item.defaultValue}
                            className='checkbox checkbox-secondary'
                          />
                        </label>
                      )
                    })}
                </div>

                <div className='flex justify-end'>
                  <button className='bg-rose-500 text-white text-2xl p-2 rounded'>
                    update
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div></div>
        </div>
      </section>
    </div>
  )
}

export default UserDash
