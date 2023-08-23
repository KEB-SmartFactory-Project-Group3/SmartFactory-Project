import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useProductsList() {

  const [serialnum, setSerialnum] = useState([]);
  const [liststate, setListstate] = useState([]);
  const [listcount, setListcount] = useState([]);
  const [listdefect, setListdefect] = useState([]);
  const [productionTime, setProductionTime] = useState([]);

  useEffect(() => {
    const intervalTime = setInterval(callDefectListApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);
  async function callDefectListApi() {
    try {
        const productListData = await retrieveData('productsList');
        
        console.log('API Responses productslist', productListData);
        
        if (productListData && Array.isArray(productListData)) {
            const serialnum = [];
            const liststate = [];
            const listcount = [];
            const listdefect = [];
            const productionTime = [];
            
            productListData.forEach(item => {
              serialnum.push(item.serialnum);
              liststate.push(item.liststate);
              listcount.push(item.listcount);
              listdefect.push(item.listdefect);
              productionTime.push(item.productionTime);
            });
            
            setSerialnum(serialnum);
            setListstate(liststate);
            setListcount(listcount);
            setListdefect(listdefect);
            setProductionTime(productionTime);
        }
    } catch (error) {
        console.log("Error fetching productsList:", error);
    }
}
  return {
  serialnum,
  liststate,
  listcount,
  listdefect,
  productionTime,   
  };

}

export default useProductsList;
