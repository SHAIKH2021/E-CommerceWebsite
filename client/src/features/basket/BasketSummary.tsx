import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const {basket}=useStoreContext();
    const subtotal= basket?.items.reduce((sum,item)=>(sum + (item.price*item.quantity)),0) ?? 0;
    const deliveryFee=  subtotal>500 ? 800 : 0 ;
    const TotalPrice=  subtotal + deliveryFee;
    const checkDeliveryFee=  subtotal<500? `Delivery Fees Not Applicable`: `Delivery Fees Applicable`;
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal :</TableCell>
                            <TableCell align="right">{currencyFormat( subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee* :</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total Price :</TableCell>
                            <TableCell align="right">{currencyFormat(TotalPrice)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>*Orders over $100 qualify for free delivery :</TableCell>
                            <TableCell align="right"> {checkDeliveryFee} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}