import React from "react";
import { Redirect } from "react-router";

import logger from "../utils/logger";
const log = logger("private-route");

const PrivateRoute = ({ component: Component, ...rest }) => {
	log.debug(`Incoming route: ${rest.path}`);
	//  <Route {...rest} component={Component} />;
	switch (rest.path) {
		default: {
			log.debug("no rules specified. redirecting to /index");
		}
	}
	return <Redirect to="/index" />;
};

export default PrivateRoute;
