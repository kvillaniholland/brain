import { IonItem, IonLabel } from "@ionic/react";
import { IStrand } from "../../../providers/Strand";

export default ({ item: strand }: { item: IStrand }) => <IonItem button detail href={`/strands/${strand.id}`} key={strand.id}>
    <IonLabel>
        <h2>{strand.name}</h2>
        <h3>{strand.location?.name}</h3>
        <p>{/*strand.staff?.[0]*/}</p>
        <p>{strand.students?.length} {strand.students?.length > 1 ? 'students' : 'student'}</p>
    </IonLabel>
</IonItem>
export {};

