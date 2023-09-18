import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
// import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { useAPPDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/BasketSlice";
interface Props{
    product:Product;
}
const ProductCard=({product}:Props)=>{
    // const [loading ,setLoading]=useState(false);
    const {status}=useAppSelector(state=>state.basket);
    const dispatch=useAPPDispatch();
   
    return(
        <Card >
        <CardHeader
        avatar={
            <Avatar sx={{bgcolor:'secondary.main'}}>
                {product.name.charAt(0).toUpperCase()}
            </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
            sx:{fontWeight:'bold',color:'primary.main'}
        }}
         />   
        <CardMedia
          sx={{ height: 140, backgroundSize:'contained',bgcolor:'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            {currencyFormat(Number(product.price))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}/{product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
          loading={status.includes('pendingAddItem'+ product.id)}
          onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))} 
          size="small">Add to cart</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">VIEW</Button>
        </CardActions>
      </Card>
    )
}
export default ProductCard;