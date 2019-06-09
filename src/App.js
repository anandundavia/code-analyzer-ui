import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";
import { store, history } from "./reducers";

// import Registration from "./pages/Registration/Registration";
// import MakeCall from "./pages/MakeCall/MakeCall";
import PrivateRoute from "./components/PrivateRoute";
import Analyze from "./pages/Analyze";

const App = () => (
	<Provider store={store}>
		<CssBaseline />
		<div>
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/index" component={Analyze} />
					{/* <Route exact path="/registration" component={Registration} /> */}
					{/* <PrivateRoute exact path="/make-call" component={MakeCall} /> */}
					{/* <PrivateRoute exact path="/ongoing-call" component={OngoingCall} /> */}
					<Redirect from="**" to="/index" />
				</Switch>
			</ConnectedRouter>
		</div>
	</Provider>
);

export default App;
