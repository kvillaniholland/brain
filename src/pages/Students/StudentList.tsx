import ListPage from "../../components/ListPage";
import Student, { IStudent } from "../../models/Student";
import StudentListItem from "./components/StudentListItem";

const StudentList: React.FC = () => {
  const filterItems = (query: string, students: IStudent[]) =>
    students.filter(
      (student) =>
        student.first_name.toLowerCase().includes(query.toLowerCase()),
      "period.name"
    );

  return (
    <ListPage
      newURL="/student/new"
      filterItems={filterItems}
      getItems={Student.getAll}
      title="Students"
      ListElement={StudentListItem}
    />
  );
};

export default StudentList;
