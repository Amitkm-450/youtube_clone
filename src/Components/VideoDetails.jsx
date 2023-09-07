import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Typography, Box, Stack } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

import { Videos } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const VideoDetails = () => {
  
  const [videoDetails, setVideoDetails] = useState(null)
  const [videos, setVideos] = useState(null)
  const { id } = useParams();
  
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => {
       setVideoDetails(data.items[0])
    })

    fetchFromAPI(`videos?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => {
      setVideos(data.items)
    })
  },[id])
  
  if(!videoDetails?.snippet) {
    console.log("loading")
  }

 

  return (
    <Box minHeight="95vh">
       <Stack direction={ { xs: 'column', md: 'row'}}>
         <Box flex={1}>
            <Box sx={{ with: '100%' , position: 'sticky', top: '86px'}}>
               <ReactPlayer
                 url={`https://www.youtube.com/watch?v=${id}`}
                 className="react-player"
                 controls
               />
               <Typography color='#fff' variant="h5"
               fontWeight="bold" p={2}>
                {videoDetails?.snippet?.title}
               </Typography>
               <Stack direction="row"
               justifyContent="space-between"
               sx={{
                color: "#fff"
               }} py={1} px={2}>
                   <Link to={`channel/${videoDetails?.snippet?.channelId}`}>
                     <Typography variant={{sm: "subtitle1" , md: 'h6'}}
                       color="#fff"
                    >
                       {videoDetails?.snippet?.channelTitle}
                     </Typography>
                   </Link>
                   <Stack direction='row' gap={2}>
                     <Typography variant="body1" sx={{opacity: 0.7}}>
                       {parseInt(videoDetails?.statistics?.viewCount).toLocaleString()} views
                     </Typography>
                     <Typography variant="body1" sx={{opacity: 0.7}}>
                       {parseInt(videoDetails?.statistics?.likeCount).toLocaleString()} likes
                     </Typography>
                   </Stack>
               </Stack>
            </Box>
         </Box>
         <Box px={2} py={{md: 1,xs: 5}} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction="column" />
       </Box>
       </Stack>

      
    </Box>
  )
}

export default VideoDetails