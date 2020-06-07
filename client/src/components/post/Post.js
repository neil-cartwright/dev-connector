import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/spinner";
import {getPost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentItem from "../post/CommentItem";
import CommentForm from "../post/CommentForm";

const Post = ({getPost, post: {post, loading}, match}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to posts
      </Link>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id}></CommentForm>
      <div className="comments">
        {Array.isArray(post.comments)
          ? post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              ></CommentItem>
            ))
          : window.location.reload(false)}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);
