import {
  IonApp,
  IonIcon,
  IonLabel, IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bookOutline, briefcaseOutline, personOutline } from 'ionicons/icons';
import { Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import StaffDetail from './pages/Staff/StaffDetail';
import StaffEdit from './pages/Staff/StaffEdit';
import StaffList from './pages/Staff/StaffList';
import StrandCreate from './pages/Strands/StrandCreate';
import StrandDetail from './pages/Strands/StrandDetail';
import StrandEdit from './pages/Strands/StrandEdit';
import StrandList from './pages/Strands/StrandList';
import StudentCreate from './pages/Students/StudentCreate';
import StudentDetail from './pages/Students/StudentDetail';
import StudentEdit from './pages/Students/StudentEdit';
import StudentList from './pages/Students/StudentList';
import './theme/variables.css';

setupIonicReact();

const Router: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/staff" component={StaffList} />
          <Route exact path='/staff/:staffId' component={StaffDetail} />
          <Route exact path='/staff/:staffId/edit' component={StaffEdit} />

          <Route exact path="/strands" component={StrandList} />
          <Route exact path="/strand/new" component={StrandCreate} />
          <Route exact path='/strands/:strandId' component={StrandDetail} />
          <Route exact path='/strands/:strandId/edit' component={StrandEdit} />

          <Route exact path="/students" component={StudentList} />
          <Route exact path="/student/new" component={StudentCreate} />
          <Route exact path='/students/:studentId' component={StudentDetail} />
          <Route exact path='/students/:studentId/edit' component={StudentEdit} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="strands" href="/strands">
            <IonIcon icon={bookOutline} />
            <IonLabel>Strands</IonLabel>
          </IonTabButton>
          <IonTabButton tab="students" href="/students">
            <IonIcon icon={personOutline} />
            <IonLabel>Students</IonLabel>
          </IonTabButton>
          <IonTabButton tab="staff" href="/staff">
            <IonIcon icon={briefcaseOutline} />
            <IonLabel>Staff</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default Router;
