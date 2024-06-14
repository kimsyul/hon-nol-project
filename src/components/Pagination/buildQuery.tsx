import {
    Query,
    collection,
    query,
    where,
    orderBy,
    startAfter,
    limit,
    DocumentData,
    QueryDocumentSnapshot,
    QueryConstraint,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const buildQuery = (
    collectionName: string,
    searchTerm: string,
    orderField: string,
    itemsPerPage: number,
    lastDoc: QueryDocumentSnapshot<DocumentData> | null,
): Query<DocumentData> => {
    const constraints: QueryConstraint[] = [];

    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        constraints.push(where('title', '>=', lowerSearchTerm));
        constraints.push(where('title', '<=', lowerSearchTerm + '\uf8ff'));
        constraints.push(where('content', '>=', lowerSearchTerm));
        constraints.push(where('content', '<=', lowerSearchTerm + '\uf8ff'));
    }

    constraints.push(orderBy(orderField));

    if (lastDoc) {
        constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(itemsPerPage));

    return query(collection(db, collectionName), ...constraints);
};

export default buildQuery;

// import {
//     Query,
//     collection,
//     query,
//     where,
//     orderBy,
//     startAfter,
//     limit,
//     DocumentData,
//     QueryDocumentSnapshot,
// } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';

// interface Filter {
//     field: string;
//     value: string;
// }

// const buildQuery = (
//     collectionName: string,
//     fieldFilters: Filter[],
//     orderField: string,
//     itemsPerPage: number,
//     lastDoc: QueryDocumentSnapshot<DocumentData> | null,
// ): Query<DocumentData> => {
//     let q = query(collection(db, collectionName), orderBy(orderField));

//     fieldFilters.forEach((filter) => {
//         q = query(q, where(filter.field, '==', filter.value));
//     });

//     if (lastDoc) {
//         q = query(q, startAfter(lastDoc));
//     }

//     return query(q, limit(itemsPerPage));
// };

// export default buildQuery;
