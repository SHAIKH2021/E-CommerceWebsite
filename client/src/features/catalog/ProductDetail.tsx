import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
// import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { useAPPDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/BasketSlice";

const ProductDetails=()=>{
    const {basket,status}=useAppSelector(state=>state.basket);
    const dispatch=useAPPDispatch();
    const {id}=useParams<{id:string}>();
    const [product,setProduct]=useState<Product | null>(null);
    const [loading,setLoading]=useState(true);
    const [quantity,setQuantity]=useState(0);
    const item = basket?.items.find(i=>i.productId===product?.id);

    useEffect(()=>{
        if(item) setQuantity(item.quantity);
         id && agent.Catalog.details(parseInt(id))
        .then(response=>setProduct(response))
        .catch(error=>console.log(error.response))
        .finally(()=>setLoading(false));
    },[id,item]);
    const handleInputChange=(e:any)=>{
        if(e.target.value>=0 && e.target.value <= Number(product?.quantityInStock) ){
            setQuantity(e.target.value);
        }
    }
     const handelUpdateCart=()=>{
        if(!item || quantity>item.quantity){
            const updatedQuantity=item?quantity-item.quantity:quantity;
            dispatch(addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }
        else{
            const updatedQuantity=item.quantity-quantity;
            dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }
     }
    if(loading) return <h3> Loading.....</h3>
    if(!product) return <h3>Product Not Found</h3>
    return(
       <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}} />
        </Grid>
        <Grid item xs={6}>
            <Typography  variant="h3">{product.name}</Typography>
            <Divider sx={{mb:2}}/>
            <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity in Stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                      onChange={handleInputChange}
                      variant="outlined"
                      type="number"
                      label='Quantity in Cart'
                      fullWidth
                      value={quantity}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton
                        disabled={item?.quantity===quantity || !item && quantity===0}
                        loading={status.includes('pending'+item?.productId)}
                        onClick={handelUpdateCart}
                        sx={{height:'55px'}}
                        color="primary"
                        size="large"
                        variant="contained"
                        fullWidth
                    >
                        {item?'Update Quantity':'Add to Cart'}
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
       </Grid>
    )
}
export default ProductDetails;