import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { selectStock, startLoading, recommend, getAbout, getCandle, getCompanyNews, selectPrice, getPeers } from '../actions/index';



export default function StockItem({item}) {
  const stock = item;
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.loading);

  const getTo = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return(
      today
    );
  }

  const getFrom = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(mm === 0) {
      mm = 12;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return(
      today
    );
  }

  const pageClick = (id) => {
    while(loading){return;}
    setTimeout(() => {
      history.push(`/detail/${id}`);
    }, 3000);
  }

  const time = () => {
    var today = Math.floor(new Date()/1000);
    return(today);
  }

  return(
    <>
      {!loading &&
        <TableRow onClick = {() => {
          dispatch(startLoading())
          dispatch(selectPrice(item.symbol))
          dispatch(selectStock(item))
          dispatch(getCompanyNews(item.symbol, getFrom(), getTo()))
          dispatch(getCandle(item.symbol, time()-86400, time()))
          dispatch(recommend(item.symbol))
          dispatch(getAbout(item.symbol))
          dispatch(getPeers(item.symbol))
          pageClick(item.description)}}>  
          <TableCell padding="checkbox"/>
          <TableCell>{stock.description}</TableCell>
          <TableCell align="right">{stock.symbol}</TableCell>
        </TableRow>
      }
    </>
  );
}