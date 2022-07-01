import { IonBackButton, IonButtons } from '@ionic/react';
import { ModelForm } from '../../components/ModelForm';
import Page from '../../components/Page';
import Strand from '../../providers/Strand';

const StrandCreate: React.FC = (props) => {

    return (<>
        <Page title={"New Strand"} toolbar={<IonButtons slot="start">
            <IonBackButton defaultHref={`/strands`}></IonBackButton>
        </IonButtons>}>
        <ModelForm provider={Strand} relationships={[...Strand.config.relationships]} />
        </Page>
    </>
    );
};

export default StrandCreate;
