import { Button, Card } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

const ItemList = ({ item }) => {
        const dispatch = useDispatch();
        const { Meta } = Card;
         // update cart here
        const handleAddToCart = () =>{
             dispatch({
                type : 'ADD_TO_CART',
                payload: {...item, quantity: 1},
             })
        }
    return (
        <Card
        hoverable
        style={{
          width: 240, marginBottom: 20
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div className='item-button'>
             <Button onClick={() => handleAddToCart()}> Add to Cart</Button>
        </div>
      </Card>
    )
}

export default ItemList