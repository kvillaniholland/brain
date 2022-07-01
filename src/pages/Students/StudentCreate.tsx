import { IonBackButton, IonButtons } from "@ionic/react";
import Page from "../../components/Page";
import StudentForm from "./components/StudentForm";

const StudentCreate: React.FC = () => (
  <>
    <Page
      title={"New Student"}
      toolbar={
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/students`}></IonBackButton>
        </IonButtons>
      }
    >
      <StudentForm />
    </Page>
  </>
);

export default StudentCreate;
