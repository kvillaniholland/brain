import { IonBackButton, IonButtons } from "@ionic/react";
import { useProvider } from "../../components/ModelDetail";
import { ModelForm } from "../../components/ModelForm";
import Page from "../../components/Page";
import Staff from "../../models/Staff";

const StaffEdit: React.FC<{ match: { params: { staffId: number } } }> = (
  props
) => {
  const id = props.match.params.staffId;

  const staff = useProvider(() => Staff.getById(id));

  return (
    <>
      {staff ? (
        <Page
          title={staff.first_name}
          toolbar={
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/staff/${id}`}></IonBackButton>
            </IonButtons>
          }
        >
          <ModelForm
            provider={Staff}
            relationships={[...Staff.config.relationships]}
            model={staff}
          />
        </Page>
      ) : (
        ""
      )}
    </>
  );
};

export default StaffEdit;
