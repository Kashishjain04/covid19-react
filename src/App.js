import { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import State from "./pages/State";
import Loading from "./pages/Loading";

function App() {
  return (
    <Suspense fallback={Loading}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/state/:stateCode" exact component={State} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
