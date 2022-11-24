import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jate = await openDB('jate_db', 1);

  const tx = jate.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');
  
  //.put or .add? 
  const request = store.put({ note: content });

  const result = await request;

  console.log('data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the jate database');

  //this is create db connection
  const jate = await openDB('jate', 1);

  //this is a new transaction that specifies store and data privileges 
  const tx = jate.transaction('jate', 'readonly');

  //open the object store
  const store = tx.objectStore('jate');

  //method to get all data from the database.
  const request = store.getAll();

  //this confims the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
