import { IonItem, IonLabel } from "@ionic/react";
import { IStudent } from "../../../providers/Student";

export default ({ item: student }: { item: IStudent }) => <IonItem button detail href={`/students/${student.id}`} key={student.id}>
    <IonLabel>
        <h2>{student.first_name}</h2>
    </IonLabel>
</IonItem>
