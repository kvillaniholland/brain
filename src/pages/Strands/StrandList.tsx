import ListPage from "../../components/ListPage";
import Strand, { IStrand } from "../../models/Strand";
import StrandListItem from "./components/StrandListItem";

const StrandList: React.FC = () => {
  const filterItems = (query: string, strands: IStrand[]) =>
    strands.filter(
      (strand) => strand.name.toLowerCase().includes(query.toLowerCase()),
      "period.name"
    );

  return (
    <ListPage
      newURL="/strand/new"
      filterItems={filterItems}
      getItems={Strand.getAll}
      title="Strands"
      ListElement={StrandListItem}
    />
  );
};

export default StrandList;
