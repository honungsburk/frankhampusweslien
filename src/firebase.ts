import * as firebase from "firebase/app";
import * as Firestore from "firebase/firestore";
import { firebaseConfig } from "../Env/firebase.secrets";
import * as Storage from "firebase/storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Query } from "firebase/firestore";

export const app = firebase.initializeApp(firebaseConfig);
export const db = Firestore.getFirestore(app);
Firestore.connectFirestoreEmulator(db, "localhost", 8080);
export const storage = Storage.getStorage(app);
Storage.connectStorageEmulator(storage, "localhost", 9199);

export function usePaginatedCollection<T>(
  limit: number,
  query: Firestore.Query<T>
): {
  data: Firestore.QueryDocumentSnapshot<T>[];
  thereIsMore: boolean;
  loadMore: () => void;
  error: any;
} {
  const [data, setData] = useState<Firestore.QueryDocumentSnapshot<T>[]>([]);
  const [fetching, setFetching] = useState(false);
  const [thereIsMore, setThereIsMore] = useState(true);
  const [error, setError] = useState<any>(undefined);

  // Callback to add more data
  const loadMore = useCallback(() => {
    if (fetching) {
      return;
    }
    setFetching(true);
    let paginatedQuery = Firestore.query(query, Firestore.limit(limit));

    // If there already is data we fetch from where we ended last time
    if (data.length > 0) {
      const lastVisible = data[data.length - 1];
      paginatedQuery = Firestore.query(
        paginatedQuery,
        Firestore.startAfter(lastVisible)
      );
    }

    Firestore.getDocs(paginatedQuery)
      .then((docs) => {
        setError(undefined);
        setData([...data, ...docs.docs]);
        setThereIsMore(docs.docs.length >= limit);
      })
      .catch((err) => setError(err))
      .finally(() => setFetching(false));
  }, [data, fetching, query, limit]);

  // Initally load data once
  useEffect(() => {
    setData([]);
    setThereIsMore(true);
  }, [query]);

  // Initally load data once
  useEffect(() => {
    if (data.length === 0) {
      loadMore();
    }
  }, [data, loadMore]);

  return {
    data: data,
    thereIsMore: thereIsMore,
    loadMore: loadMore,
    error: error,
  };
}
