import React from "react";
import * as LoadingAnimation from '../../static/LoadingLottie.json';
import Lottie from "react-lottie";

export type LoadingComponentProps = {
    width?: number
    height?: number
    style?: React.CSSProperties
}

const LoadingComponent: React.FunctionComponent<LoadingComponentProps> = ({ height, width, style }) => {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Lottie options={lottieOptions} style={style} height={height} width={width} />
    )
}

export default LoadingComponent