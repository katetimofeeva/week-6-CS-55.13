import app from "@/lib/firebase-app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

const db = getFirestore(app);

export async function getSortedList() {
  const snapshot = await getDocs(collection(db, "people"));
  const jsObj = snapshot.docs.map(person => ({
    id: person.id,
    ...person.data(),
  }));

  jsObj.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return jsObj.map(person => ({
    id: person.id.toString(),
    name: person.name,
  }));
}

export async function getAllIds() {
  const snapshot = await getDocs(collection(db, "people"));
  const dataObj = snapshot.docs.map(person => ({
    id: person.id,
    ...person.data(),
  }));
  console.log(dataObj, "dataObj");
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
  const snapshot = await getDocs(collection(db, "people"));
  const dataObj = snapshot.docs.map(person => ({
    id: person.id,
    ...person.data(),
  }));

  const foundPerson = dataObj.filter(item => item.id.toString() === id);

  if (foundPerson.length) {
    return foundPerson[0];
  } else {
    return {};
  }
}
