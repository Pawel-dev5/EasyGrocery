import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const CircleProgressBar = ({ children, onFinish, id }: { children: ReactNode; onFinish: () => void; id: string }) => {
	const [fill, setFill] = useState(1);

	// setTimeout(() => {
	// 	if (fill === 100) {
	// 		setFill(0);
	// 		console.log('elo');
	// 	} else {
	// 		setFill(fill + 1);
	// 	}
	// }, 500);
	// console.log(fill);

	// useEffect(() => {
	// 	console.log('effect');
	// 	setFill(fill + 1);
	// 	return () => {
	// 		setFill(0);
	// 	};
	// }, [5000]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (fill === 100) {
	// 			onFinish();
	// 			setFill(0);
	// 		} else {
	// 			setFill((filld) => filld + 1);
	// 		}
	// 	}, 25);
	// 	return () => clearInterval(interval);
	// }, []);
	// console.log(fill);
	// if (fill === 0) {
	// 	onFinish();
	// }
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setFill((prevCounter) => prevCounter + 1);
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, []);
	const [start, setStart] = useState<any>(null);
	// useEffect(() => {
	// 	setFill(0);
	// 	console.log(start);
	// 	if (start) {
	// 		console.log('elo');
	// 		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	// 		start.reAnimate(100, 8000); // Will fill the progress bar linearly in 8 seconds
	// 	}
	// }, [id]);
	useEffect(() => {
		setFill(1);
		console.log('elo2');
	}, [id]);
	useEffect(() => {
		setFill(1);
		console.log('elo2');
	}, []);
	console.log(id);
	console.log(fill);
	if (fill === 1) {
		return (
			<AnimatedCircularProgress
				size={25}
				width={3}
				// fill={fill}
				fill={100}
				duration={5000}
				tintColor="#00e0ff"
				backgroundColor="#3d5875"
				ref={(ref) => setStart(ref)}
				// ref={(ref) => {}}
				onAnimationComplete={() => {
					onFinish();
					// setFill(0);
				}}
			>
				{() => <View>{children}</View>}
			</AnimatedCircularProgress>
		);
	}
	return null;
};
