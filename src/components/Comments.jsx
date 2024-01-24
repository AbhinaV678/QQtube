import React from "react";
import { useState, useEffect } from "react";
import { Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CardContent, CardMedia, Typography, Box } from "@mui/material";
import { demoProfilePicture } from "../utils/constants";
import { Link } from "react-router-dom";

const Comments = ({ id }) => {
  const [comments, setComments] = useState(null);

  function createMarkup(html) {
    return { __html: html };
  }

  useEffect(() => {
    fetchFromAPI(
      `commentThreads?part=snippet&videoId=${id}&maxResults=50`
    ).then((data) => setComments(data?.items));
  }, [id]);

  if (!comments) return <Loader />;

  return (
    <Box>
      {comments.map((item) => (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            color: "#fff",
          }}
        >
          <Link
            to={
              item?.snippet?.topLevelComment?.snippet?.authorChannelId?.value
                ? `/channel/${item?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`
                : "/"
            }
          >
            <CardMedia
              image={
                item?.snippet?.topLevelComment?.snippet
                  ?.authorProfileImageUrl || demoProfilePicture
              }
              sx={{
                borderRadius: "50%",
                height: "40px",
                width: "45px",
                mr: 2,
                border: "1px solid #e3e3e3",
              }}
            />
          </Link>
          <Typography sx={{ color: "white" }}>
            {item?.snippet?.topLevelComment?.snippet?.authorDisplayName ||
              "Name not available at this moment."}{" "}
            {new Date(
              item?.snippet?.topLevelComment?.snippet?.publishedAt
            ).getMonth() +
              1 +
              "/" +
              new Date(
                item?.snippet?.topLevelComment?.snippet?.publishedAt
              ).getFullYear() || "null"}
            <br></br>
            {(
              <div
                dangerouslySetInnerHTML={createMarkup(
                  item?.snippet?.topLevelComment?.snippet?.textDisplay
                )}
              />
            ) || "Comment not available at this moment."}
          </Typography>
        </CardContent>
      ))}
    </Box>
  );
};

export default Comments;
