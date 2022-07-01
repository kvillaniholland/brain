import { IonButton, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import Strand, { IStrand } from "../../../models/Strand";
import Student, { IStudent } from "../../../models/Student";
import Timeslot, { ITimeslot } from "../../../models/Timeslot";

function useProvider(providerMethod: () => Promise<any>, empty: any = []) {
  const [data, setData] = useState(empty);
  useEffect(() => {
    providerMethod().then(setData);
  }, []);
  return data;
}

async function saveStudent(student: IStudent) {
  const createdStudent = await Student.save(student);
}

export default ({ student = {} as IStudent }: { student?: IStudent }) => {
  student.strands = student.strands || [];
  const strands: IStrand[] = useProvider(Strand.getAll);
  const timeslots: ITimeslot[] = useProvider(Timeslot.getAll);

  const ready = strands.length && timeslots.length;

  return !ready ? (
    <></>
  ) : (
    <>
      <p>
        First Name:{" "}
        <IonInput
          value={student.first_name}
          onIonChange={(e) => (student.first_name = e.detail.value!)}
        />
      </p>
      <p>
        Last Name:{" "}
        <IonInput
          value={student.last_name}
          onIonChange={(e) => (student.last_name = e.detail.value!)}
        />
      </p>
      {timeslots.map((timeslot) => (
        <p key={timeslot.id}>
          {timeslot.name}:{" "}
          <IonSelect
            onIonChange={(e) =>
              student.strands.push(
                strands.find((s) => s.id === e.detail.value)!
              )
            }
          >
            {strands
              .filter((strand) => strand.period.id === timeslot.id)
              .map((strand) => (
                <IonSelectOption value={strand.id} key={strand.id}>
                  {strand.name}
                </IonSelectOption>
              ))}
          </IonSelect>
        </p>
      ))}
      <IonButton onClick={(e) => saveStudent(student)}>Save</IonButton>
    </>
  );
};
