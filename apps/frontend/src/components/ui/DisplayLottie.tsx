import React from 'react';
import { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';
import NavigationAnimation from '../lottie/navigationAnimated.json';

class DisplayLottie extends React.Component {
    private containerRef: React.RefObject<HTMLDivElement>;
    private animation: AnimationItem | undefined;

    constructor(props: object) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        if (this.containerRef.current) {
            this.animation = lottie.loadAnimation({
                container: this.containerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: NavigationAnimation,
            });
        }
    }

    componentWillUnmount() {
        if (this.animation) {
            this.animation.destroy();
        }
    }

    render() {
        return (
            <div className="w-[300px] h-[300px] flex justify-center items-center">
                <div ref={this.containerRef} className="w-full h-full" />
            </div>
        );
    }
}

export default DisplayLottie;