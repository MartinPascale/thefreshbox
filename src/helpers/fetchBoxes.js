import { setIsLoading, setBoxes } from '../reducers/actions';

const fetchBoxes = (dispatch) => {
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  const getItems = async () => {
    dispatch(setIsLoading(true));
    const doc = new GoogleSpreadsheet(
      '1qJvgAWwrogyCEnOGnz-hySHqnD2APZDrQrO4mItHgUU'
    );
    doc.useApiKey('AIzaSyCGTXQtR5IK2ko9rTkA4XxzZpcafBb76sA');
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();

    const boxes = rows.filter((box) => box.name !== '' && box.total !== '0');

    dispatch(setBoxes(boxes));
    dispatch(setIsLoading(false));
  };

  getItems();
};

export default fetchBoxes;
