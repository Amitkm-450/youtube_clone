import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material";

import { Videos, ChannelCard} from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";
import zIndex from "@mui/material/styles/zIndex";

const ChannelDetails = () => {
  const [videos, setVideos] = useState([])
  const [channelDetail, setChannelDetail] = useState(null);
  const {id} = useParams();
  
  useEffect(() => {
     fetchFromAPI(`channels?part=snippet&id=${id}`)
     .then((data) => setChannelDetail(data?.items[0]));
  
  
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
     .then((data) => setVideos(data?.items));

  }, [id])
  console.log(channelDetail)
  return (
    <Box minHeight='95vh'>
       <Box>
        <div
          style={{
            background: "#6cd9f0",
            zIndex: 5,
            height: '300px'
          }}>
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop='-95px'/>
       </Box>
       <Box>
        <Box sx={{ mr: {md: '20px', sx: '10px'}}}>
          <Videos videos={videos} />
        </Box>
       </Box>
    </Box>
  )
}

export default ChannelDetails