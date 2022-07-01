import { IonItem, IonLabel } from "@ionic/react";
import ListPage from "../../components/ListPage";
import Staff, { IStaff } from "../../models/Staff";

const StaffListItem = ({ item: staff }: { item: IStaff }) => (
  <IonItem button detail href={`/staff/${staff.id}`} key={staff.id}>
    <IonLabel>
      <h2>{staff.first_name}</h2>
    </IonLabel>
  </IonItem>
);

const StaffList: React.FC = () => {
  const filterItems = (query: string, staff: IStaff[]) =>
    staff.filter(
      (staff) => staff.first_name.toLowerCase().includes(query.toLowerCase()),
      "period.name"
    );

  return (
    <ListPage
      newURL="/staff/new"
      filterItems={filterItems}
      getItems={Staff.getAll}
      title="Staff"
      ListElement={StaffListItem}
    />
  );
};

export default StaffList;
