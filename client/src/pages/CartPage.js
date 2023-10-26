import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table } from "antd";
import React from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';

const CartPage = () => {
    // cartItems from redux

    const {cartItems} = useSelector((state) => state.rootReducer)

    //columns of items

    const columns = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Image', dataIndex: 'image',
          render: (image,record) => <img src={image} alt={record.name} height="60" width="60"/>},
        {title: 'Price', dataIndex: 'price'},
        {title: 'Quantity',
         dataIndex: "_id",
         render: (id, record) => (
            <div>
                <PlusCircleOutlined className = "mx-3" style={{fontSize: "20px"}}/>
                <b>{record.quantity}</b>
                <MinusCircleOutlined className = "mx-3" style={{fontSize: "20px"}}/>
            </div>
         )
        
        },
        {title: "Actions", dataIndex: "_id", render : (id, record) => <DeleteOutlined style={{fontSize: "20px"}}/>}

          
    ]
  return (
    <DefaultLayout>
        <div>CartPage</div>
        <Table columns={columns} dataSource={cartItems} pagination={{ pageSize: 5 }} />
    </DefaultLayout>
  )
}

export default CartPage