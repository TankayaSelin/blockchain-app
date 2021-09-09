import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { convertNumbers } from '../helpers/ConvertNumbersToFixed';

interface Props {
    datas: array;
}


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        },
    },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#f8f7f7',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const CustomizedTableBody = ({ coin }: Props) => {
    const API_KEY = ''; //please enter your API_KEY
    const [logo, setLogo] = useState()


    useEffect(() => {
        fetchCoins(coin.id)
    }, []);



    const fetchCoins = async (id) => {
        axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + id, {
            headers: { 'X-CMC_PRO_API_KEY': API_KEY }
        })
            .then((response) => {
                setLogo(response.data.data[id].logo)
                return response.data.data[id].logo;
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <TableBody key={coin.id}>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    <img
                        id='logo'
                        src={logo}
                        alt={coin.name}
                    />
                    <span className='px-3'>{coin.symbol}</span>{coin.name}
                </StyledTableCell>
                <StyledTableCell align="left">{`$ ${convertNumbers(coin.quote.USD.price)}`}</StyledTableCell>
                <StyledTableCell align="left" className={(coin.quote.USD.percent_change_24h >= 0) ? 'positivePrice' : 'negativePrice'}>{`${convertNumbers(coin.quote.USD.percent_change_24h)}%`}</StyledTableCell>
                <StyledTableCell align="left">{coin.carbs}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
    )
}

export default CustomizedTableBody
