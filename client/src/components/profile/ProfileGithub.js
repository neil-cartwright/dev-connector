import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"; // as calling an action
import {getGithubRepos} from "../../actions/profile";
import Spinner from "../layout/spinner";

const ProfileGithub = ({username, getGithubRepos, repos}) => {
  return <div />;
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);
