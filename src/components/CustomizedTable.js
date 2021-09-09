import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchDatas, fetchLogo } from '../features/getDatas';
import CustomizedTableBody from './CustomizedTableBody';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#f8f7f7',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



function createData(name, lastPrice, time24, markets) {
  return { name, lastPrice, time24, markets };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface Props {
  datas: array;
}

const CustomizedTables = ({ coin }: Props) => {
  const classes = useStyles();

  const datas = useAppSelector(state => state.datas);
  const [coins, setCoins] = useState(null);

  const dispatch = useAppDispatch();

  const symbols = ['BNB', 'BTC', 'ETH', 'XRP', 'BCH', 'LTC'];

  useEffect(() => {
    callDatas();
    const interval = setInterval(() => {
      callDatas();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const callDatas = async () => {
    let d = await dispatch(fetchDatas());
    fetchSymbols(d);
  }

  const fetchSymbols = (d: any) => {
    let arr: any[] = [];
    symbols.map(symbol => {
      d.payload?.data.map((item: { symbol: string; }) => {
        if (item.symbol === symbol) {
          arr.push(item);
        }
      })
    })
    setCoins(arr)
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Last Price</StyledTableCell>
            <StyledTableCell align="left">24h Change</StyledTableCell>
            <StyledTableCell align="left">Markets</StyledTableCell>
          </TableRow>
        </TableHead>
        {(datas.data && coins !== null) &&
          coins.map(coin => (
            <CustomizedTableBody key={coin.id} coin={coin} />
          ))
        }
      </Table>
    </TableContainer>
  );
}


export default CustomizedTables;