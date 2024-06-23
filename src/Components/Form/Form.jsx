import React, { useState } from 'react'

const defaultValues = {
  msv: '',
  fullname: '',
  phonenumber: '',
  email: '',
}

const Form = () => {
  const [formValue, setFormValue] = useState(defaultValues)
  const [formErrors, setFormErrors] = useState({
    msv: '',
    fullname: '',
    phonenumber: '',
    email: '',
  })
  const [user, setUser] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const validate = (event) => {
    const { value, name, pattern } = event.target
    const newErrors = { ...formErrors }

    if (!value.trim()) {
      newErrors[name] = 'Vui lòng nhập thông tin'
    } else {
      if (pattern) {
        const regex = new RegExp(pattern)
        const isValid = regex.test(value)
        if (!isValid) {
          if (name === 'email') {
            newErrors[name] = 'Giá trị email không hợp lệ, vui lòng thử lại!'
          } else if (name === 'phonenumber') {
            newErrors[name] = 'Giá trị Phone không hợp lệ, vui lòng thử lại!'
          } else if (name === 'msv') {
            newErrors[name] = 'Mã sinh viên không hợp lệ, vui lòng thử lại!'
          } else if (name === 'fullname') {
            newErrors[name] = 'Họ và tên không hợp lệ, vui lòng thử lại!'
          }
        } else {
          newErrors[name] = ''
        }
      } else {
        newErrors[name] = ''
      }
    }
    setFormErrors(newErrors)
  }

  const isDuplicate = (newUser) => {
    return user.some(
      (item) =>
        item.msv.toLowerCase() === newUser.msv.toLowerCase() ||
        item.email.toLowerCase() === newUser.email.toLowerCase()
    )
  }

  const handleOnChange = (event) => {
    const { value, name } = event.target
    setFormValue({
      ...formValue,
      [name]: value,
    })
    validate(event)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const hasError = Object.values(formErrors).some((item) => !!item)
    if (!hasError) {
      if (isDuplicate(formValue)) {
        alert('Mã sinh viên hoặc Email đã tồn tại trong danh sách.')
        return
      }
      setUser((prevUses) => [...prevUses, formValue])
      setFormValue(defaultValues) // Reset form after submission
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsers = user.filter(
    (item) =>
      item.msv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phonenumber.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <form onSubmit={onSubmit} className="w-3/4 mx-auto">
        <div className="header-form dark:bg-gray-700">
          <h1 className="text-white text-3xl font-medium p-2">
            Thông tin sinh viên
          </h1>
        </div>
        <div className="body-form bg-neutral-400 grid grid-cols-2 gap-4 p-5">
          <div>
            <label
              htmlFor="msv"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-xl pr-60"
            >
              Mã sinh viên
            </label>
            <input
              className="rounded-md border-0 py-1.5 pl-7 pr-40"
              type="text"
              id="msv"
              name="msv"
              required
              pattern="^[a-zA-Z0-9]{1,10}$"
              value={formValue.msv}
              onChange={handleOnChange}
            />
            {formErrors.msv && (
              <p className="text-red-600 text-sm text-start mt-2 ml-8">
                {formErrors.msv}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-xl pr-64"
            >
              Họ và tên
            </label>
            <input
              className="rounded-md border-0 py-1.5 pl-7 pr-40"
              type="text"
              id="fullname"
              name="fullname"
              required
              pattern="^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$"
              value={formValue.fullname}
              onChange={handleOnChange}
            />
            {formErrors.fullname && (
              <p className="text-red-600 text-sm text-start mt-2 ml-8">
                {formErrors.fullname}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phonenumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-xl pr-60"
            >
              Số điện thoại
            </label>
            <input
              className="rounded-md border-0 py-1.5 pl-7 pr-40"
              type="text"
              id="phonenumber"
              name="phonenumber"
              pattern="(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b"
              value={formValue.phonenumber}
              onChange={handleOnChange}
            />
            {formErrors.phonenumber && (
              <p className="text-red-600 text-sm text-start mt-2 ml-8">
                {formErrors.phonenumber}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-xl pl-10 text-start"
            >
              Email
            </label>
            <input
              className="rounded-md border-0 py-1.5 pl-7 pr-40"
              type="email"
              id="email"
              name="email"
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              value={formValue.email}
              onChange={handleOnChange}
            />
            {formErrors.email && (
              <p className="text-red-600 text-sm text-start mt-2 ml-8">
                {formErrors.email}
              </p>
            )}
          </div>
        </div>
        <div className="bg-neutral-400">
          <button
            type="submit"
            className="px-3 py-2 bg-green-700 mb-6 rounded-md text-white"
          >
            Thêm sinh viên
          </button>
        </div>
      </form>
      <div className="search w-3/4 mx-auto mt-10">
        <form className="mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
            {/* Optional: Reset search button */}
            {/* <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-gray-500 dark:text-gray-400 absolute end-2.5 bottom-2.5 px-3 py-2"
            >
              Clear
            </button> */}
          </div>
        </form>
      </div>
      <div className="table w-3/4 mx-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã sinh viên
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ và tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr
                  key={`sv-${item.msv}`}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.msv}
                  </td>
                  <td className="px-6 py-4">{item.fullname}</td>
                  <td className="px-6 py-4">{item.phonenumber}</td>
                  <td className="px-6 py-4">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Form
