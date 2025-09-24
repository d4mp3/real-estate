import React, { useEffect, useState, useRef, useMemo, useContext, useReducer } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// Contexts
import StateContext from "../Contexts/StateContext";

// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	FormControlLabel,
	Checkbox,
	Snackbar,
} from "@mui/material";

function ProfileUpdate(props) {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);
  console.log("props.userProfile", props.userProfile);

	const initialState = {
		agencyNameValue: props.userProfile.agencyName ?? "",
		phoneNumberValue: props.userProfile.phoneNumber ?? "",
		bioValue: props.userProfile.bio ?? "",
		uploadedPicture: [],
		profilePictureValue: props.userProfile.profilePic ?? "",
		sendRequest: 0,
		openSnack: false,
		disabledBtn: false,
	};

	function ReducerFunction(state, action) {
		switch (action.type) {
			case "CATCH_AGENCY_CHANGE":
				return {
					...state,
					agencyNameValue: action.agencyNameChosen,
				};

			case "CATCH_PHONE_NUMBER_CHANGE":
				return {
					...state,
					phoneNumberValue: action.phoneNumberChosen,
				};

			case "CATCH_BIO_CHANGE":
				return { ...state, bioValue: action.bioChosen };

			case "CATCH_UPLOADED_PICTURE":
				return { ...state, uploadedPicture: action.pictureChosen };

			case "CATCH_PROFILE_PICTURE_CHANGE":
				return {
					...state,
					profilePictureValue: action.profilePictureChosen,
				};

			case "CHANGE_SEND_REQUEST":
				return { ...state, sendRequest: state.sendRequest + 1 };

			case "OPEN_THE_SNACK":
				return { ...state, openSnack: true };

			case "DISABLE_THE_BUTTON":
				return { ...state, disabledBtn: true };

			case "ALLOW_THE_BUTTON":
				return { ...state, disabledBtn: false };

			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(ReducerFunction, initialState);

	// // Sync incoming userProfile props into local reducer state when they change
	// useEffect(() => {
	// 	if (props.userProfile) {
	// 		dispatch({
	// 			type: "CATCH_AGENCY_CHANGE",
	// 			agencyNameChosen: props.userProfile.agencyName ?? "",
	// 		});
	// 		dispatch({
	// 			type: "CATCH_PHONE_NUMBER_CHANGE",
	// 			phoneNumberChosen: props.userProfile.phoneNumber ?? "",
	// 		});
	// 		dispatch({
	// 			type: "CATCH_BIO_CHANGE",
	// 			bioChosen: props.userProfile.bio ?? "",
	// 		});
	// 		dispatch({
	// 			type: "CATCH_PROFILE_PICTURE_CHANGE",
	// 			profilePictureChosen: props.userProfile.profilePic ?? "",
	// 		});
	// 	}
	// }, [props.userProfile]);

	// Use effect to cath uploaded picture
	useEffect(() => {
		if (state.uploadedPicture[0]) {
			dispatch({
				type: "CATCH_PROFILE_PICTURE_CHANGE",
				profilePictureChosen: state.uploadedPicture[0],
			});
		}
	}, [state.uploadedPicture[0]]);

	// use effect to send the request
	useEffect(() => {
		if (state.sendRequest) {
			async function UpdateProfile() {
				const formData = new FormData();

				if (
					typeof state.profilePictureValue === "string" ||
					state.profilePictureValue === null
				) {
					formData.append("agency_name", state.agencyNameValue);
					formData.append("phone_number", state.phoneNumberValue);
					formData.append("bio", state.bioValue);
					formData.append("seller", GlobalState.userId);
				} else {
					formData.append("agency_name", state.agencyNameValue);
					formData.append("phone_number", state.phoneNumberValue);
					formData.append("bio", state.bioValue);
					formData.append("profile_picture", state.profilePictureValue);
					formData.append("seller", GlobalState.userId);
				}

				try {
					const response = await Axios.patch(
						`https://www.lbrepcourseapi.com/api/profiles/${GlobalState.userId}/update/`,
						formData
					);

					dispatch({ type: "OPEN_THE_SNACK" });
				} catch (e) {
					dispatch({ type: "ALLOW_THE_BUTTON" });
				}
			}
			UpdateProfile();
		}
	}, [state.sendRequest]);

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate(0);
			}, 1500);
		}
	}, [state.openSnack]);

	function FormSubmit(e) {
		e.preventDefault();
		dispatch({ type: "CHANGE_SEND_REQUEST" });
		dispatch({ type: "DISABLE_THE_BUTTON" });
	}

	function ProfilePictureDisplay() {
		if (typeof state.profilePictureValue !== "string") {
			return (
				<ul>
					{state.profilePictureValue ? (
						<li>{state.profilePictureValue.name}</li>
					) : (
						""
					)}
				</ul>
			);
		} else if (typeof state.profilePictureValue === "string") {
			return (
				<Grid
					item
					style={{
						marginTop: "0.5rem",
						marginRight: "auto",
						marginLeft: "auto",
					}}
				>
					<img
						src={props.userProfile.profilePic}
						style={{ height: "5rem", width: "5rem" }}
					/>
				</Grid>
			);
		}
	}

	return (
		<>
			<div
				style={{
					width: "50%",
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: "3rem",
					border: "5px solid black",
					padding: "3rem",
				}}
			>
				<form onSubmit={FormSubmit}>
					<Grid item container justifyContent="center">
						<Typography variant="h4">MY PROFILE</Typography>
					</Grid>

					<Grid item container style={{ marginTop: "1rem" }}>
						<TextField
							id="agencyName"
							label="Agency Name*"
							variant="outlined"
							fullWidth
							value={state.agencyNameValue}
							onChange={(e) =>
								dispatch({
									type: "CATCH_AGENCY_CHANGE",
									agencyNameChosen: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid item container style={{ marginTop: "1rem" }}>
						<TextField
							id="phoneNumber"
							label="Phone Number*"
							variant="outlined"
							fullWidth
							value={state.phoneNumberValue}
							onChange={(e) =>
								dispatch({
									type: "CATCH_PHONE_NUMBER_CHANGE",
									phoneNumberChosen: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid item container style={{ marginTop: "1rem" }}>
						<TextField
							id="bio"
							label="Bio"
							variant="outlined"
							multiline
							rows={6}
							fullWidth
							value={state.bioValue}
							onChange={(e) =>
								dispatch({
									type: "CATCH_BIO_CHANGE",
									bioChosen: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid item container>
						{ProfilePictureDisplay()}
					</Grid>

					<Grid
						item
						container
						xs={6}
						style={{
							marginTop: "1rem",
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						<Button
							variant="contained"
							component="label"
							fullWidth
							style={{
								backgroundColor: "blue",
								color: "white",
								fontSize: "0.8rem",
								border: "1px solid black",
								marginLeft: "1rem",
							}}
						>
							PROFILE PICTURE
							<input
								type="file"
								accept="image/png, image/gif, image/jpeg"
								hidden
								onChange={(e) =>
									dispatch({
										type: "CATCH_UPLOADED_PICTURE",
										pictureChosen: e.target.files,
									})
								}
							/>
						</Button>
					</Grid>

					<Grid
						item
						container
						xs={8}
						style={{
							marginTop: "1rem",
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							style={{
								backgroundColor: "green",
								color: "white",
								fontSize: "1.1rem",
								marginLeft: "1rem",
								// "&:hover": {
								// 	backgroundColor: "blue",
								// },
							}}
							disabled={state.disabledBtn}
						>
							UPDATE
						</Button>
					</Grid>
				</form>
				<Snackbar
					open={state.openSnack}
					message="You have successfully updated your profile!"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
				/>
			</div>
		</>
	);
}

export default ProfileUpdate;
