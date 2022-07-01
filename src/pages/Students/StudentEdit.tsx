import { IonBackButton, IonButtons } from '@ionic/react';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Strand from '../../providers/Strand';
import { IStudent } from '../../providers/Student';
import StudentForm from './components/StudentForm';

const StudentEdit: React.FC<{ match: { params: { studentId: number } } }> = (props) => {
    const studentId = props.match.params.studentId;

    const [student, setStudent]: [IStudent | undefined, any] = useState();
  
    useEffect(() => {
        Strand.getById(studentId).then(setStudent);
    }, []);

    return (<>
        {student ? <Page title={student.first_name} toolbar={<IonButtons slot="start">
            <IonBackButton defaultHref={`/students/${studentId}`}></IonBackButton>
        </IonButtons>}>
            <StudentForm student={student} />
        </Page> : ''}
    </>
    );
};

export default StudentEdit;
