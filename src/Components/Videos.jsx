import { Stack, Box } from "@mui/material"

import { VideoCard, ChannelCard } from "./"


const Videos = ({videos}) => {
 
  return (
    <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
       {videos.map((video,idx) => (
         <Box key={idx}>
           {video.id.videoId && <VideoCard 
             video = {video}
           />}
           {video.id.channelId && <ChannelCard 
             ChannelDetail = {video}
           />}
         </Box>
       ))}
    </Stack>
  )
}

export default Videos