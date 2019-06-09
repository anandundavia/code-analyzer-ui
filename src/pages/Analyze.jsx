import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Axios from "axios";
import constants from "../constants";

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
		alignSelf: "center"
	},
	backButton: {
		marginRight: theme.spacing.unit * 2
	},
	code: {
		alignSelf: "center",
		width: "80%"
	},
	or: {
		textAlign: "center"
	},
	upload: {
		marginTop: theme.spacing.unit * 2,
		alignSelf: "center",
		textAlign: "center"
	},
	result: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	loading: {
		alignSelf: "center",
		textAlign: "center"
	}
});

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps: ["Select a Language", "Provide Code", "Results"],
			activeStep: 0,
			languages: ["JavaScript"],
			code: "",
			file: null,
			results: null
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

	handleCodeChange = e => {
		this.setState({ code: e.target.value });
	};

	handleFileChange = e => {
		this.setState({ file: e.target.files[0] });
	};

	renderMain() {
		const { classes } = this.props;
		const { activeStep, languages, code } = this.state;
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
		} else if (activeStep === 1) {
			return (
				<div className={classes.code}>
					<FormControl fullWidth>
						<TextField
							multiline
							rows="8"
							rowsMax="8"
							value={code}
							onChange={this.handleCodeChange}
							className={classes.textField}
							margin="normal"
							variant="outlined"
						/>
					</FormControl>
					<Typography className={classes.or} component="h4" variant="subheading">
						OR
					</Typography>
					<FormControl fullWidth className={classes.upload}>
						<input
							className={classes.input}
							style={{ display: "none" }}
							id="raised-button-file"
							type="file"
							onChange={this.handleFileChange}
						/>
						<label htmlFor="raised-button-file">
							<Button variant="contained" component="span" className={classes.button}>
								Upload a file
							</Button>
						</label>
					</FormControl>
				</div>
			);
		} else {
			const { file, code } = this.state;
			if (!file && !code) {
				return (
					<div className={classes.result}>
						<Typography className={classes.or} component="h4" variant="subheading">
							Either upload a file or paste the code.
						</Typography>
					</div>
				);
			}
			if (!this.state.results) {
				this.getResults();
				return (
					<div className={classes.result}>
						<CircularProgress className={classes.loading} />
					</div>
				);
			} else {
				const firstFileResult = this.state.results[0];
				const messages = firstFileResult.messages;
				return (
					<div className={classes.result}>
						<Typography className={classes.or} component="h1" variant="headline">
							Results
						</Typography>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Line Number</TableCell>
									<TableCell align="right">Rule ID</TableCell>
									<TableCell align="right">Message</TableCell>
									<TableCell align="right">Severity</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{messages.map(row => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.line}
										</TableCell>
										<TableCell align="right">{row.ruleId}</TableCell>
										<TableCell align="right">{row.message}</TableCell>
										<TableCell align="right">{row.severity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				);
			}
		}
	}

	goToNextStep = () => {
		const { activeStep, steps } = this.state;
		if (activeStep === steps.length - 1) {
			this.setState({
				steps: ["Select a Language", "Provide Code", "Results"],
				activeStep: 0,
				languages: ["JavaScript"],
				code: "",
				file: null,
				results: null
			});
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
		const { steps, activeStep } = this.state;
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

	getResults() {
		const { file, code } = this.state;
		let data, url;
		if (file) {
			url = `${constants.api.base}${constants.api.endpoints.file}`;
			data = new FormData();
			data.append("file", file);
			data.append("lang", "js");
		} else if (code) {
			url = `${constants.api.base}${constants.api.endpoints.raw}`;
			data = { lang: "js", payload: code };
		}
		Axios.post(url, data, { method: "POST" }).then(res => {
			this.setState({ results: res.data });
		});
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Registration));
