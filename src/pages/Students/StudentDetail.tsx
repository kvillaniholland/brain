import { IonBackButton, IonButton, IonButtons } from '@ionic/react';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Student, { IStudent } from '../../providers/Student';

const StudentDetail: React.FC<{ match: { params: { studentId: number } } }> = (props) => {
    const studentId = props.match.params.studentId;

    const [student, setStudent]: [IStudent | undefined, any] = useState();
  
    useEffect(() => {
        Student.getById(studentId).then(setStudent);
    }, []);

    return (<>
        {student ? <Page title={student.first_name} toolbar={<IonButtons slot="start">
            <IonBackButton defaultHref="/students"></IonBackButton>
        </IonButtons>}>
            <IonButton href={`/students/${studentId}/edit`}>Edit</IonButton>
        </Page> : ''}
    </>

   
    );
};

export default StudentDetail;
