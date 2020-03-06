/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

export { classSet } from './classSet';
export { queryFocusable } from './queryFocusable';
export { formatLabel } from './labelUtils';

export default class $u {
  addId (array, custom) {//add an id to an array of strings, working on additinal functinality 
      let tempArray = [];
      array.forEach((element, index) => {
          let tempObject = {id: index};
          if (typeof(element) === 'object') {//if object build 
              Object.assign(tempObject, element);
              // Object.key(element).forEach(key => {
              //     tempObject[key] = element[key];
              // })
          } else {//string array, add name or custom property name
              if (custom) {
                  tempObject[custom] = element;
              } else {
                  tempObject['name'] = element;
              }
          }
          tempArray.push(tempObject);
      });    
      return tempArray;
  }
  /*
  *@params:
  *  array: Object[]// this is the array of objects to itterate over 
  *  attribute: String// this is the field in the object that you want to check against
  *  value: Any// this value is the actual value you want to check for 
  * */
  findByAttribute (array, attribute, value){//  return index of object with atribute matching value returns -1 for non existnt 
      const arrayLength = array.length;
      let index = -1;
      for (let i = 0; i < arrayLength; i++) {
          if (array[i][attribute] === value) {
              index = i;
              break;
          }
      }
      return index;
  }
  findEllsByAttribute (array, attribute, value) {//return array of elememnts containing attribute or emty array
      const arrayLength = array.length;
      let newArray = [];
      for (let i = 0; i < arrayLength; i++) {
          if (array[i][attribute] === value) {
              array[i].index = i;
              newArray.push(array[i]);
              break;
          }
      }
      return newArray;
  }
  fromProxy (object) {//fnc to remove object from proxy
      return JSON.parse(JSON.stringify(object));
  }
  isEmpty(value){
      return (value == null || value.length === 0);
  }
}