import React, {useEffect} from 'react';
import {uniteOnAuth} from "@/store/userSlice.js";
import {useDispatch} from "react-redux";

const Orders = () => {

  const dispatch = useDispatch()
  const unite = () => {
    dispatch(uniteOnAuth())
  }

  return (
    <div>
      <div className='container'>
        <button style={{padding: 10, border: 'gray 1px solid', display: 'flex', marginBlock: 20}} onClick={unite}>unite</button>

        orders
      </div>

    </div>
  );
};

export default Orders;