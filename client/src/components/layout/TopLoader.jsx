
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const TopLoader = () => {
    const ref = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (!ref.current) return;
        ref.current.complete();
        ref.current.continuousStart();
        const timer = setTimeout(() => ref.current.complete(), 300);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <LoadingBar
            color="oklch(67.3% 0.182 276.935)"
            ref={ref}
            height={3}
            containerStyle={{ zIndex: 9999 }}

        />
    );
}

export default TopLoader;
