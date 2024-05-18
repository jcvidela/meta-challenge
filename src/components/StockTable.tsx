import * as React from "react";
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getStockListForAutocomplete } from "../../api";

interface IStock {
  symbol: string;
  name: string;
  currency: string;
  type: string;
}

const StockPreferenceForm: React.FC = () => {
  const [searchName, setSearchName] = React.useState<string>("");
  const [searchSymbol, setSearchSymbol] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [stocks, setStocks] = React.useState<IStock[]>([]);
  const [filteredStocks, setFilteredStocks] = React.useState<IStock[]>([]);

  React.useEffect(() => {
    fetchStockList();
  }, []);

  async function fetchStockList() {
    try {
      const stockList = await getStockListForAutocomplete();
      setStocks(stockList.data);
      setFilteredStocks(stockList.data);
    } catch (error) {
      console.error("Error fetching stock list:", error);
    }
  }

  function handleSearchNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchName(event.target.value);
    filterStocks(event.target.value, searchSymbol);
  }

  function handleSearchSymbolChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchSymbol(event.target.value);
    filterStocks(searchName, event.target.value);
  }

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function filterStocks(name: string, symbol: string) {
    const filtered = stocks.filter((stock) => {
      return (
        stock.name.toLowerCase().includes(name.toLowerCase()) &&
        stock.symbol.toLowerCase().includes(symbol.toLowerCase())
      );
    });
    setFilteredStocks(filtered);
  }

  return (
    <div>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        value={searchName}
        onChange={handleSearchNameChange}
      />
      <TextField
        label="Buscar por símbolo"
        variant="outlined"
        value={searchSymbol}
        onChange={handleSearchSymbolChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Símbolo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>
                    <Link to={`/stock/${stock.symbol}`}>{stock.symbol}</Link>
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.currency}</TableCell>
                  <TableCell>{stock.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={filteredStocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default StockPreferenceForm;
