import { Button, Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const ItemList = ({ item }) => { 
        const dispatch = useDispatch();
        const { Meta } = Card;
        const { cartItems } = useSelector((state) => state.rootReducer);
        
        // checking whether cart have duplicate item or not
        const isItemInCart = cartItems.some((cartItem) => cartItem._id === item._id);
        //  // update cart here 
        const handleAddToCart = () =>{
            if(!isItemInCart){
              dispatch({
                type : 'ADD_TO_CART',
                payload: {...item, quantity: 1},
                
             })
             message.success("Item added to Cart");   
            }else{
              message.warning("Item already added");
            }
          
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