import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import CreatePostImg from "../images/createpost.svg";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer.jsx";
import { useHistory } from "react-router-dom";
import Loading from "./Loading.jsx";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
	cardHover: {
		boxShadow: "0px 3px 5px grey",
		borderRadius: 7,
		position: "absolute",
		left: "50%",
		top: "50%",
		width: "auto",
		transform: "translate(-50%,-50%)",
		padding: "80px",
		transition: "0.4s all",
		"&:hover": {
			boxShadow: "grey 0px 0px 2px",
		},
	},
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));

export default function CreatePost() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	const [detail, setDetail] = useState({ title: "", description: "" });
	//sending post details
	const [photo, setPhoto] = useState(null);
	const setAvatar = (e) => {
		const file = e.target.files[0];
		setPhoto(file);
	};

	const sendPost = (e) => {
		e.preventDefault();
		const url = `http://127.0.0.1:4000`;
		const formData = new FormData();
		formData.append("photo", photo);
		formData.append("title", detail.title);
		formData.append("description", detail.description);
		// console.log(data)
		!detail.title || !detail.description
			? toast.warn("please provide some value", {
					position: "bottom-left",
					autoClose: 4000,
			  })
			: axios({
					method: "post",
					url: `${url}/user/createpost`,
					data: formData,
					headers: {
						Authorization:
							"Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "multipart/form-data",
					},
			  })
					.then((res) => {
						toast.success("Post created", {
							position: "bottom-left",
							autoClose: 4000,
						});
						setDetail({ title: "", description: "", comment: "" });
					})
					.catch((e) =>
						toast.error("Post photo must be less than 3MB.", {
							position: "bottom-left",
							autoClose: 4000,
						})
					);
	};

	useEffect(() => {
		axios({
			method: "get",
			url: `/checkuserauth`,
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then((res) => {
				setLoading(false);
			})
			.catch((e) => history.push("/"));
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div
						style={{
							display: "flex",
							height: "80vh",
							alignItems: "center",
							width: "100vw",
						}}
					>
						<form
							autocomplete="off"
							className={`${classes.cardHover} col text-center`}
							onSubmit={sendPost}
						>
							<input
								type="text "
								className="mb-4 p-2"
								value={detail.title}
								style={{
									backgroundColor: "transparent",
									border: "2px solid grey",
									borderRadius: "8px",
									fontWeight: "bolder",
								}}
								name="title"
								placeholder="Title "
								onChange={(e) =>
									setDetail({
										...detail,
										title: e.target.value,
									})
								}
							/>
							<br />
							<textarea
								type="text "
								className="mb-4 p-2"
								value={detail.description}
								style={{
									backgroundColor: "transparent",
									border: "2px solid grey",
									borderRadius: "8px",
									fontWeight: "bolder",
									maxHeight:'45vh'
								}}
								rows="4" 
								cols="23"
								name="description"
								placeholder="Description "
								onChange={(e) =>
									setDetail({
										...detail,
										description: e.target.value,
									})
								}
							>
							</textarea>
							<br />

							<input
								accept="image/*"
								className={`${classes.input}`}
								id="icon-button-file"
								type="file"
								name="postphoto"
								onChange={setAvatar}
							/>
							<label htmlFor="icon-button-file">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
									title="image should be less than 3mb"
								>
									<PhotoCamera style={{ float: "left" }} />
									<span style={{ color: "red" }}> * </span>
								</IconButton>
							</label>
							<br />
							<Button
								style={{ float: "left" }}
								variant="contained"
								color="primary"
								type="submit"
								disabled={
									!photo ||
									!detail.title ||
									!detail.description
										? true
										: false
								}
							>
								Post
							</Button>
						</form>
					</div>
					<Footer />
				</div>
			)}
		</>
	);
}
