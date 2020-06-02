import React from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addEducation} from "../../actions/profile";

const AddEducation = (props) => {
  return <div></div>;
};

AddEducation.propTypes = {};

export default connect(null, addEducation)(AddEducation);
