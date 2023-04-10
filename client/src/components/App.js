import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login'
import TurnTracker from './TurnTracker'
import PlayerCharacter from "./PlayerCharacter";
import Npc from './Npc'
import Home from './Home'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return <Login onLogin={setUser} />

  return (
    <>
      <main className="container mx-auto">
        <BrowserRouter>
          <Route>
            <NavBar user={user} setUser={setUser} />
          </Route>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/npc" component={Npc} />
          <Route path="/playercharacter" component={PlayerCharacter} />
          <Route path="/turntracker" component={TurnTracker} />
          <Route path="/login" component={Login} />
        </Switch>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App
