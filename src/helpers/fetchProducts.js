import { setIsLoading, setProducts } from '../reducers/actions';

const fetchProducts = (dispatch) => {
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  const getItems = async () => {
    dispatch(setIsLoading(true));
    const doc = new GoogleSpreadsheet(
      '1qJvgAWwrogyCEnOGnz-hySHqnD2APZDrQrO4mItHgUU'
    );
    doc.useApiKey('AIzaSyCGTXQtR5IK2ko9rTkA4XxzZpcafBb76sA');
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const fruits = rows.filter(
      (fruit) => fruit.Categoria === 'Fruta' && fruit.Precio !== '0'
    );

    const vegetables = rows.filter(
      (vegetable) =>
        vegetable.Categoria === 'Verdura' && vegetable.Precio !== '0'
    );

    dispatch(setProducts(fruits, vegetables));
    dispatch(setIsLoading(false));
  };

  getItems();
};

export default fetchProducts;
