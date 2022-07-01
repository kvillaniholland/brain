import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonSearchbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import Page, { PageProps } from "./Page";

function dotGet(obj: any, path: string) {
  return path.split(".").reduce((r, k) => r?.[k], obj);
}

function groupBy(arr: any[], prop: string) {
  return arr.reduce((acc, curr) => {
    (acc[dotGet(curr, prop)] = acc[dotGet(curr, prop)] || []).push(curr);
    return acc;
  }, {});
}

type ListPageProps = PageProps & {
  filterItems: (query: string, collection: any[]) => any[];
  getItems: () => Promise<any[]>;
  groupByKey?: string;
  ListElement: any;
  newURL?: string;
};

const groupedList = (collection: { [key: string]: any }, ListElement: any) => (
  <>
    {Object.keys(collection).map((key) => (
      <IonItemGroup key={key}>
        <IonItemDivider>
          <IonLabel>{key}</IonLabel>
        </IonItemDivider>
        {collection[key].map((item: any) => (
          <ListElement item={item} />
        ))}
      </IonItemGroup>
    ))}
  </>
);

const flatList = (collection: any[], ListElement: any) => (
  <>
    {collection.map((item: any, index: number) => (
      <ListElement key={index} item={item} />
    ))}
  </>
);

const ListPage: React.FC<ListPageProps> = ({
  title,
  getItems,
  groupByKey,
  filterItems,
  ListElement,
  newURL,
}) => {
  const [collection, setCollection]: [any[], any] = useState([]);
  const [filteredCollection, setFilteredCollection]: [
    { [key: string]: any[] },
    any
  ] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    getItems().then((collection) => {
      const groupedCollection = groupByKey
        ? groupBy(collection, groupByKey)
        : collection;
      setCollection(collection);
      setFilteredCollection(groupedCollection);
    });
  }, []);

  useEffect(() => {
    const filteredCollection = filterItems(query, collection);
    const groupedCollection = groupByKey
      ? groupBy(filteredCollection, groupByKey)
      : filteredCollection;
  }, [query]);

  return (
    <Page
      title={title}
      toolbar={
        <IonSearchbar
          onIonChange={(e) => setQuery(e.detail.value!)}
          showCancelButton="focus"
        />
      }
    >
      {groupByKey
        ? groupedList(collection, ListElement)
        : flatList(collection, ListElement)}
      {newURL && (
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton href={newURL}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      )}
    </Page>
  );
};

export default ListPage;
