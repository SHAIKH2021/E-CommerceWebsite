import Grid from "@mui/material/Grid";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
interface Props{
    products:Product[];
}
const ProductList=({products}:Props)=>{ //when can destructure this component by {products,addProducts}:Props so we do not need to use props.name but if we need to pass much values than we need to specify eacbh name
    return(
        <Grid container spacing={4}>
         {products.map((product)=>(
           <Grid item xs={3} key={product.id}>
            <ProductCard product={product}/>
           </Grid>
         ))}
         </Grid>
    )
}
export default ProductList;