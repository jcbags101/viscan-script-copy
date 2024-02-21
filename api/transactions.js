import { collection, getDocs } from "firebase/firestore";
import saveNewDocumentWithNumericId from "./helper";
import { db } from "@/app/utils/firebaseConfig";

const fetchTransactions = async () => {
  const transactionsCol = collection(db, "transactions");
  const dataSnapshot = await getDocs(transactionsCol);
  const dataList = dataSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataList;
};

const createTransaction = async (transaction) => {
  return saveNewDocumentWithNumericId("transactions", transaction);
};

export { fetchTransactions, createTransaction };
