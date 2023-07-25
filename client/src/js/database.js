import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({value: content }); // Assumes you want to store the content as an object with a single property "content".
    await tx.complete;
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.get(1);
    await tx.complete;
    console.log('All content retrieved from the database:', allContent);
    return allContent?.value;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  }
};

// Initialize the database
initdb();

