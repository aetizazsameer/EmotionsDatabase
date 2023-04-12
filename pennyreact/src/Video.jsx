//----------------------------------------------------------------------
// Video.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import axios from 'axios';

const Video = () => {
    const [src, setSrc] = useState('');

    useEffect(() => {
      axios.get('/participant/get_URL')
        .then(response => {
          setSrc(response.data.url);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
        <video controls width="100%">
        <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    );
};

export default Video;