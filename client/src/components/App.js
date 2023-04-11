import React, { useEffect, useState, createContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import TurnTracker from "./TurnTracker";
import PlayerCharacter from "./PlayerCharacter";
import Npc from "./Npc";
import Home from "./Home";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <main className="container mx-auto">
          <BrowserRouter>
            <Route>
              <NavBar />
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
      </UserContext.Provider>
    </>
  );
}

export default App;
