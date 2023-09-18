import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Button
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
// import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAPPDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";

const BasketPage = () => {
  const {basket,status} = useAppSelector(state=>state.basket);
  const dispatch = useAPPDispatch();
 
  if (!basket) return <h3>Basket is empty</h3>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="right">
                <LoadingButton 
                     loading={status==='pendingAddItem'+item.productId} 
                     onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))} 
                     color="secondary"
                 >
                    <Add/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                       loading={status==='pendingRemoveItem'+item.productId+'rem'} 
                       onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:1,name:'rem'}))} 
                       color="error"
                  >
                    <Remove/>
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat(Number(item.price)*item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton 
                  loading={status==='pendingRemoveItem'+item.productId+'del'} 
                  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'del'}))} 
                  color="error">
                    <Delete/>
                  </LoadingButton>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={6}>
        <Grid item xs={6}>
          <BasketSummary/>
          <Button
             component={Link}
             to='/checkout'
             variant='contained'
             size='large'
             fullWidth>
              Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default BasketPage;


