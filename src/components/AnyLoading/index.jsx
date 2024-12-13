import React from 'react';
import {ThreeCircles} from "react-loader-spinner";

function AnyLoading() {
    return (
        <div style={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "25px"
        }}>
            <ThreeCircles
                visible={true}
                height="50"
                width="50"
                color="#0DA5B5"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default AnyLoading;