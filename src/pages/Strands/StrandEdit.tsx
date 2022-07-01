import { IonBackButton, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { ModelForm } from "../../components/ModelForm";
import Page from "../../components/Page";
import Strand, { IStrand } from "../../models/Strand";

const StrandEdit: React.FC<{ match: { params: { strandId: number } } }> = (
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
              <IonBackButton
                defaultHref={`/strands/${strandId}`}
              ></IonBackButton>
            </IonButtons>
          }
        >
          <ModelForm
            provider={Strand}
            relationships={[...Strand.config.relationships]}
            model={strand}
          />
        </Page>
      ) : (
        ""
      )}
    </>
  );
};

export default StrandEdit;
