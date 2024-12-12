import "@/styles/global.css";
import Header from "@/components/Header";
import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
//import styles from "../styles/FormModule.css";
//import { useStyleRegistry } from "styled-jsx";

const firebaseConfig = {
	apiKey: "AIzaSyAW3sDDSuXlx0KVyFsdDRHgUChqQDifPf0",
	authDomain: "exercise-six-e8204.firebaseapp.com",
	projectId: "exercise-six-e8204",
	storageBucket: "exercise-six-e8204.firebasestorage.app",
	messagingSenderId: "1031322878075",
	appId: "1:1031322878075:web:9b05f69295de98c38462de",
	measurementId: "G-HFBZM2ZYGP",
};

export default function App({ Component, pageProps }) {
	const [appInitialized, setAppInitialized] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInformation, setUserInformation] = useState(null);
	const [error, setError] = useState(null);

	//create user Function
	const createUserFunction = useCallback(
		(e) => {
			e.preventDefault();
			//Assign Email and password to variables from form
			const email = e.currentTarget.email.value;
			const password = e.currentTarget.password.value;
			const auth = getAuth();

			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					//since the user is true
					setIsLoggedIn(true);
					//provide some information ab the user via setState
					setUserInformation(user);
					//clear any errors
					setError(null);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.warn({ error, errorCode, errorMessage });
					setError(errorMessage);
				});
		},
		[setError, setIsLoggedIn, setUserInformation]
	);

	//Login User Function
	const loginUserFunction = useCallback(
		(e) => {
			e.preventDefault();
			//Assign Email and Apssword to variables from form
			const email = e.currentTarget.email.value;
			const password = e.currentTarget.password.value;
			//Create reference to the auth object
			const auth = getAuth();
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;

					setIsLoggedIn(true);

					setUserInformation(user);
					setError(null);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.warn({ error, errorCode, errorMessage });
					setError(errorMessage);
				});
		},
		[setError, setIsLoggedIn, setUserInformation]
	);

	//Log Out user function
	const logoutUserFunction = useCallback(() => {
		const auth = getAuth();

		signOut(auth)
			.then(() => {
				setUserInformation(null);
				setIsLoggedIn(false);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.warn({ error, errorCode, errorMessage });
				setError(errorMessage);
			});
	}, [setError, setIsLoggedIn, setUserInformation, signOut]);

	//Initialize Firebase
	useEffect(() => {
		initializeApp(firebaseConfig);
		setAppInitialized(true);
	}, []);

	useEffect(() => {
		if (appInitialized) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// user is logged in, see docs for a list of
					// available properties
					setUserInformation(user);
					setIsLoggedIn(true);
				} else {
					// user is signed out
					setUserInformation(null);
					setIsLoggedIn(false);
				}
				// setLoading to false when everything is complete
				setIsLoading(false);
			});
		}
	}, [appInitialized]);

	if (isLoading) return null;
	console.log({ userInformation });
	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				logoutUserFunction={logoutUserFunction}
			/>
			<Component
				{...pageProps}
				createUserFunction={createUserFunction}
				isLoggedIn={isLoggedIn}
				loginUserFunction={loginUserFunction}
				userInformation={userInformation}
			/>
			<p>{error}</p>
		</>
	);
}
