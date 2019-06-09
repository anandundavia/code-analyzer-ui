import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// import { loginSuccessful } from "../../reducers/auth/auth.reducer";

import logger from "../utils/logger";
const log = logger("registration");

const styles = theme => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		marginTop: theme.spacing.unit * 8,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: "80vw",
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		// alignItems: "center",
		// prettier-ignore
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	googleLogo: {
		marginRight: theme.spacing.unit
	},
	select: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "300px",
		alignSelf: "center"
	},
	actions: {
		marginTop: theme.spacing.unit * 8,
		width: "300px",
		alignSelf: "center"
	},
	backButton: {
		marginRight: theme.spacing.unit * 2
	}
});

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps: ["Select a Language", "Provide Code", "Results"],
			activeStep: 0,
			languages: ["JavaScript"]
		};
	}

	renderSteps() {
		const { steps, activeStep } = this.state;
		return (
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		);
	}

	renderMain() {
		const { classes } = this.props;
		const { activeStep, languages } = this.state;
		if (activeStep === 0) {
			return (
				<div className={classes.select}>
					<FormControl fullWidth>
						<InputLabel htmlFor="lang">Language</InputLabel>
						<Select
							value="JavaScript"
							inputProps={{
								name: "lang",
								id: "lang"
							}}
						>
							{languages.map(aLang => (
								<MenuItem key={aLang} value={aLang}>
									{aLang}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			);
		}
		return <Paper>Hi</Paper>;
	}

	goToNextStep = () => {
		const { activeStep, steps } = this.state;
		if (activeStep === steps.length - 1) {
			this.setState({ activeStep: 0 });
		} else {
			this.setState({ activeStep: activeStep + 1 });
		}
	};

	goToPrevStep = () => {
		const { activeStep } = this.state;
		this.setState({ activeStep: activeStep - 1 });
	};

	renderActions() {
		const { classes } = this.props;
		const { steps, activeStep, languages } = this.state;
		return (
			<div className={classes.actions}>
				<Button
					disabled={activeStep === 0}
					onClick={this.goToPrevStep}
					className={classes.backButton}
				>
					Back
				</Button>
				<Button variant="contained" color="primary" onClick={this.goToNextStep}>
					{activeStep === steps.length - 1 ? "Reset" : "Next"}
				</Button>
			</div>
		);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.main}>
				<Paper className={classes.paper}>
					{this.renderSteps()}
					{this.renderMain()}
					{this.renderActions()}
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// snackbar: state.snackbar,
	// user: state.user
});

const mapDispatchToProps = {
	// loginSuccessful
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Registration));
