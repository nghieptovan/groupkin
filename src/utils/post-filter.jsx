import localStorage from '../utils/local-storage'
import _ from 'lodash'
export const filtersToUlr = filters => {
  let queryString = "";
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      let value = "";
      if (typeof filters[key].value === "object") {
        value = filters[key].value.join(",");
      } else {
        value = filters[key].value;
      }

      if( key == 'start_date' || key == 'end_date' ){
        value = _.split(value, '+', 1);
      } 


      if (value !== "" && value !== -1) {
        queryString += `&${key}=${value}`;
      }
    }
  }
  return queryString;
};

export const filtersToQueryString = filters => {
  let queryString = "";
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      let value = "";
      if (typeof filters[key].value === "object") {
        value = filters[key].value.join(",");
      } else {
        value = filters[key].value;
      }
      if (value !== "" && value !== -1) {
        if (filters[key].fieldName === "_start") {
          let numberPage = value >= 1 ? value - 1 : 0;
          let totalPerPage = filters.limit.value ? filters.limit.value : 20;
          queryString += `&_start=${numberPage * totalPerPage}`;
        } else {
          queryString += `&${filters[key].fieldName}=${value}`;
        }
      }
    }
  }
  return queryString;
};

export const queryStringToObject = queryString => {
  let objectReturn = {};
  for (const key in queryString) {
    if (key == queryString[key].fieldName ) {
      if(key == 'start_date' || key == 'end_date'){
        objectReturn[key] = queryString[key].value.replace('+07:00','');
      }
      else
        objectReturn[key] = queryString[key].value;     
    }
  }
  return objectReturn;
};

export const formatterCurrency = moneystring => {
  let formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatted.format(moneystring);
} 
export const formatterNumber = number => {
  return new Intl.NumberFormat('de-DE').format(number);
} 

export const buildDiscountString = discountObj => {
  let queryString = "";
  for (const key in discountObj) {
    if (discountObj.hasOwnProperty(key)) {
      let value = "";
      
      if(discountObj[key] > 0) 
      {
        value = `${key} : ${discountObj[key]}`;
      }

      if (value !== "" && value !== -1) {
        queryString += queryString == "" ? value : `,${value}`;
      }
    }
  }

  return queryString;
  
} 

export const buildCategoryDropDown = categories => {

  let dataReturn = [];
  _.forEach(categories, (cat) => {
    let item = {
      "_id": cat._id,
      "status": cat.status,
      "is_root_category": cat.is_root_category,
      "name": cat.name,
      "label": cat.name,
      "url": cat.url,
      "createdAt": cat.createdAt,
      "updatedAt": cat.updatedAt,
      "id": cat.id
    }
    if(inYourCategory(item._id)){
      dataReturn.push({...item, value: item})
    }    
    if (cat.categories) {
        _.forEach(cat.categories, (cat1) => {
            if(cat1){
              let item = {
                "_id": cat1.id,
                "status": cat1.status,
                "is_root_category": cat1.is_root_category,
                "label": '----'+ cat1.name,
                "name": cat1.name,
                "url": cat1.url,
                "createdAt": cat1.createdAt,
                "updatedAt": cat1.updatedAt,
                "id": cat1.id
              };
              if(inYourCategory(item._id)){
                dataReturn.push({...item, value: item})
              }
              
              if (cat1.categories) {
                  _.forEach(cat1.categories, (cat2) => {
                    let item = {
                      "_id": cat2._id,
                      "status": cat2.status,
                      "is_root_category": cat2.is_root_category,
                      "label": '--------'+cat2.name,
                      "name": cat2.name,
                      "url": cat2.url,
                      "createdAt": cat2.createdAt,
                      "updatedAt": cat2.updatedAt,
                      "id": cat2.id
                    }
                    if(inYourCategory(item._id)){
                      dataReturn.push({...item, value: item})
                    }
                  })
              }
            }
            
        })
    }
  })

  return dataReturn
}

function inYourCategory(idCat){
  return _.some(localStorage.get("_user").categories, { "_id": idCat });
}

export const buildCategoryManageDropDown = categories => {

  let dataReturn = [];
  _.forEach(categories, (cat) => {
    let item = {
      "_id": cat._id,
      "status": cat.status,
      "is_root_category": cat.is_root_category,
      "name": cat.name,
      "label": cat.name,
      "url": cat.url,
      "value": cat.id,
      "id": cat.id
    }
    dataReturn.push({...item, value: item})   
    if (cat.categories) {
        _.forEach(cat.categories, (cat1) => {
            if(cat1){
              let item = {
                "_id": cat1.id,
                "status": cat1.status,
                "is_root_category": cat1.is_root_category,
                "label": '----'+ cat1.name,
                "name": cat1.name,
                "url": cat1.url,
                "value": cat1.id,
                "id": cat1.id
              };
              dataReturn.push({...item, value: item})
              if (cat1.categories) {
                  _.forEach(cat1.categories, (cat2) => {
                    let item = {
                      "_id": cat2._id,
                      "status": cat2.status,
                      "is_root_category": cat2.is_root_category,
                      "label": '--------'+cat2.name,
                      "name": cat2.name,
                      "url": cat2.url,
                      "value": cat2.id,
                      "id": cat2.id
                    }
                    dataReturn.push({...item, value: item})
                  })
              }
            }
            
        })
    }
  })

  return dataReturn
}
