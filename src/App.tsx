import { SQLExrcuters } from "components/pages/SQLExecuters";
import {RecoilRoot, useRecoilState} from "recoil"
import { sentencesState } from "store/sentences";

function App() {
  return (
    <RecoilRoot>
      <SQLExrcuters/>
    </RecoilRoot>
  );
}

export default App;
