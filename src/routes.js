import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Plan from './components/Plan.vue'
import Plantpal from './components/Plantpal.vue'
import Howtouse from './components/Howtouse.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import CovidMap from './components/CovidMap.vue'

export default [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/plan', name: "modify", component: Plan },
  { path: '/plantpal', component: Plantpal },
  { path: '/howtouse', component: Howtouse },
  { path: '/login', component: SignIn},
  { path: '/signup', component: SignUp},
  { path: '/covidmap', component: CovidMap}
]

