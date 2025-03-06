import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { useSelector } from 'react-redux'
import { selectDetails } from '../redux/checkoutSLice'

export default function Checkout() {
    const obj = { fullname: '', phone: '', email: '', addressline1: '', addressline2: '', area: '', city: '', pincode: '', state: '' }
    const [data, setData] = useState({ ...obj })
    const details = useSelector(selectDetails);

    useEffect(() => {
        if(details){setData({...details})}
        else{ setData({...obj})}
    },[])

    return (
        <>
            <div className="bg-white flex flex-col gap-5 mx-auto md:flex-row sm:mt-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="shadow-xl p-3 m-1 rounded-2xl sm:p-8 mb-5">
                    <h2 className="text-2xl text-gray-900 pb-1">Shipping Detals</h2>
                    <hr className='text-gray-400' />
                    <div className='mt-5'>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="fullname" className='pb-1 px-1 text-gray-700'>Full Name</label>
                            <input type="text" id='fullname' name='fullname'
                                className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                value={data.fullname}
                                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 mt-5">
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className='pb-1 px-1 text-gray-700'>Phone No</label>
                                    <input type="text" id='phone' name='phone'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.phone}
                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className='pb-1 px-1 text-gray-700'>Email</label>
                                    <input type="text" id='email' name='email'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="addressline1" className='pb-1 px-1 text-gray-700'>Address Line 1</label>
                            <input type="text" id='addressline1' name='addressline1'
                                className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                value={data.addressline1}
                                onChange={(e) => setData({ ...data, addressline1: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="addressline2" className='pb-1 px-1 text-gray-700'>Address line 2</label>
                            <input type="text" id='addressline2' name='addressline2'
                                className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                value={data.addressline2}
                                onChange={(e) => setData({ ...data, addressline2: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-5 mt-5 flex-col sm:flex-row">
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="area" className='pb-1 px-1 text-gray-700'>Area</label>
                                    <input type="text" id='area' name='area'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.area}
                                        onChange={(e) => setData({ ...data, area: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="city" className='pb-1 px-1 text-gray-700'>City</label>
                                    <input type="text" id='city' name='city'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.city}
                                        onChange={(e) => setData({ ...data, city: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 mt-5 flex-col sm:flex-row">
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="pincode" className='pb-1 px-1 text-gray-700'>Pincode</label>
                                    <input type="text" id='pincode' name='pincode'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.pincode}
                                        onChange={(e) => setData({ ...data, pincode: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <label htmlFor="state" className='pb-1 px-1 text-gray-700'>State</label>
                                    <input type="text" id='state' name='state'
                                        className='px-3 py-1 rounded-md border-gray-300 border-1 focus:outline-blue-300'
                                        value={data.state}
                                        onChange={(e) => setData({ ...data, state: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src="https://cdn.shopify.com/s/files/1/0869/9904/0290/files/payments_badge_final.png?v=1712136362"
                                style={{ display: 'block', width: '100%', height: 'auto', margin: '20px auto' }}
                                className='sm:max-w-3/4' />
                        </div>
                    </div>


                </div>
                <CheckoutSummary data={data} />
            </div>
        </>
    )
}
