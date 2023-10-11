import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const CommentButton = styled.button`
  // border: none;
  // background-color: ;
  // color: ${({ theme }) => theme.primary};
  // cursor: pointer;

  background-color: #505050;
  font-weight: 500;
  color: #B0B0B0;
  size:20px;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async () => {
    if (commentText.trim() === "") {
      return; // Don't add empty comments
    }

    try {
      // Send a POST request to add a new comment
      const res = await axios.post(`/api/comments`, {
        desc: commentText,
        videoId: videoId,
      });

      // Update the comments list with the new comment
      setComments((prevComments) => [res.data, ...prevComments]);

      // Clear the input field
      setCommentText("");
    } catch (err) {}
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {isInputFocused && commentText.trim() !== "" && (
          <CommentButton onClick={handleComment}>Comment</CommentButton>
        )}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
