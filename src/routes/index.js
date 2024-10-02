import { Routes, Route} from 'react-router-dom'
import Profile from '../pages/editProfile';
import User from '../pages/User'
import Report from '../pages/report'
import ProfileUser from '../components/UserProfile'



function RoutesApp() {
    return(
        <Routes>
            
            <Route path="/" element={ <User/>} />
            <Route path='/editProfile' element = {  <Profile/> }/>
            <Route path='/report' element = { <Report/> } />
            <Route path='/profile' element = { <ProfileUser/> } />

        </Routes>
    )
}

export default RoutesApp;
