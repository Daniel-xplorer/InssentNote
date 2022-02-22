import React from "react";
import { connect } from "react-redux";
import { getData } from "../../actions/users";



const Home = () => {
    
    return (
        <div>
            <h1>Welcome</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    };
};
export default connect(mapStateToProps, { getData })(Home);