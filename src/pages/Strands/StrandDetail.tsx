import { IonBackButton, IonButton, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import Strand, { IStrand } from "../../models/Strand";

const StrandDetail: React.FC<{ match: { params: { strandId: number } } }> = (
  props
) => {
  const strandId = props.match.params.strandId;

  const [strand, setStrand]: [IStrand | undefined, any] = useState();

  useEffect(() => {
    Strand.getById(strandId).then(setStrand);
  }, []);

  return (
    <>
      {strand ? (
        <Page
          title={strand.name}
          toolbar={
            <IonButtons slot="start">
              <IonBackButton defaultHref="/strands"></IonBackButton>
            </IonButtons>
          }
        >
          <p>Room: {strand?.location.name}</p>
          <p>Period: {strand?.period.name}</p>
          <p>
            Staff: {strand?.staff.map((staff) => staff.first_name).join(", ")}
          </p>
          <p>
            Students:{" "}
            {strand?.students
              .map((student) => `${student.first_name} ${student.last_name}`)
              .join(", ")}
          </p>
          <p>Total Students: {strand?.students.length}</p>
          <IonButton href={`/strands/${strandId}/edit`}>Edit</IonButton>
        </Page>
      ) : (
        ""
      )}
    </>
  );
};

export default StrandDetail;
