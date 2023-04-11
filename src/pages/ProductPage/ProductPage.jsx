import React, {useCallback, useEffect} from 'react';

import Spinner from "../../components/Spiner/Spiner";
import Product from "../../components/Product/Product";
import s from '../../components/Product/Product.module.css'
import {useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {useDispatch, useSelector} from "react-redux";
import {getSingleProductThunk} from "../../redux/redux-thunk/singleProduct-thunk/getSingleProductThunk";
import {changeLikeProductThunk} from "../../redux/redux-thunk/products-thunk/changeLikeProductThunk";
import {setProductState} from "../../redux/redux-slice/singleProduct/singleProductSlice";

const ProductPage = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const {singleProduct, isLoading, error: isError} = useSelector(state => state.singleProduct);

    console.log('singleProduct-->', singleProduct);

    useEffect(() => {
        dispatch(getSingleProductThunk(productId))
    }, [dispatch, productId])

    const handleProductLike = useCallback(() => {
        dispatch(changeLikeProductThunk(singleProduct)).then(updateProduct => {
            dispatch(setProductState(updateProduct.payload.product));
        })
    }, [dispatch, singleProduct]);

    return (
        <div className="container">
            {isLoading ? (
                <div className={s.wrapperLoader}>
                    <Spinner/>
                </div>
            ) : (
                !isError && <Product {...singleProduct} onProductLike={handleProductLike}/>)}
            {isError ? (
                <NotFoundPage/>
            ) : null}
        </div>
    );
};

export default ProductPage;
