import React from 'react';
const Spinner = () => (

        <div class="spinner-border text-primary" role="status"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: ("-50%, -50%"),
                zIndex: "100",
                height: "50px",
                width: "50px",
                fontSize: "100px"
            }}>
            <span class="visually-hidden">Loading...</span>
        </div>

);
export default Spinner;