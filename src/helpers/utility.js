import queryString from "query-string";

export function clearToken() {
  localStorage.removeItem('token');
}

export function getToken() {
  try {
    return localStorage.getItem('token');;
  } catch (err) {
    clearToken();
    return null;
  }
}

/*
    * Method to construct a URL with query parameters.
    * This method can accept either a property name with its corresponding value, or an object that will be deconstructed into a query string.
    * If a filter is provided, the page number is reset to zero.
    *
    * @param {string} name - The name of the property to add to the URL.
    * @param {string|object} value - The value of the property to add to the URL. If an object is provided, it is deconstructed into multiple query parameters.
    * @param {boolean} filter - A flag indicating if the 'page' parameter should be reset to zero.
    *
    * @returns {string} The constructed URL.
    */
export const constructUrl = (history, name, value, filter) => {
  // Parse the current URL query string into an object
  let queryObject = queryString.parse(history.location.search);

  if (filter) {
    queryObject['page'] = 0;
  }

  // Construct the query object from the provided name-value pair or object
  constructQueryObject(name, value, queryObject);

  // Construct the new URL by stringifying the query object and appending it to the current URL
  return history.location.pathname + '?' + queryString.stringify(queryObject, {arrayFormat: 'index'});
}

/*
* Helper method to construct a query object from a provided name-value pair or object.
*
* @param {string} name - The name of the property to add to the object.
* @param {string|object} object - The value of the property to add to the object, or an object to merge into the query object.
* @param {object} queryObject - The existing query object to modify.
*/
export const constructQueryObject = (name, object, queryObject) => {
  // If the 'object' parameter is actually an object (and not null),
  // iterate over its entries and add them to the query object
  if (typeof object === 'object' && object !== null) {
    Object.entries(object).forEach(([key, val]) => {
      queryObject[key] = val;
    });
  } else {
    // If 'object' is not actually an object, add it to the query object as a property with the provided name
    queryObject[name] = object;
  }
}


/*
* Helper method to generate a random uuid.
*/
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}