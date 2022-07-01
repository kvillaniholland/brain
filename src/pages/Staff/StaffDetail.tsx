import { ModelDetail } from "../../components/ModelDetail";
import Staff from "../../providers/Staff";

const StaffDetail: React.FC<{ match: { params: { staffId: number } } }> = (props) => {
    const id = props.match.params.staffId;

   return <ModelDetail provider={Staff} id={id} editURL={`/staff/${id}/edit`} />
};

export default StaffDetail;
