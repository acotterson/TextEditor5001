import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// update content in database
export const putDb = async (id, content) => {
  const contentDb = await openDB("content", 1);
  const tx = contentDb.transaction("content", "readwrite");
  const store = tx.objectStore("content");
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// get content from database
export const getDb = async () => {
  const contentDb = await openDB("content", 1);
  const tx = contentDb.transaction("content", "readonly");
  const store = tx.objectStore("content");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
