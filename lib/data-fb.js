import app from "@/lib/firebase-app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

const db = getFirestore(app);

async function getCollection(name) {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map(person => ({
    id: person.id,
    ...person.data(),
  }));
}

export async function getSortedList() {
  const jsObj = await getCollection("people");

  jsObj.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return jsObj.map(person => ({
    id: person.id.toString(),
    name: person.name,
  }));
}

export async function getAllIds() {
  const dataObj = await getCollection("people");

  return dataObj.map(({ id }) => {
    console.log(id, "id");
    return {
      params: {
        id: id.toString(),
      },
    };
  });
}

export async function getPerson(id) {
  const dataObj = await getCollection("people");

  const foundPerson = dataObj.filter(item => item.id.toString() === id);

  if (foundPerson.length) {
    return foundPerson[0];
  } else {
    return {};
  }
}
