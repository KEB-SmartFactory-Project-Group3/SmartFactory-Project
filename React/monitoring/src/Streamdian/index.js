import React from 'react';
import { render } from 'react-dom';
import StreamedianPlayer from './StreamedianPlayer';
import './index.css';

// const App = () => (
// 	<div>
// 		<StreamedianPlayer id="test_video">
// 			{/* <source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" type="application/x-rtsp" /> */}
// 		</StreamedianPlayer>
// 	</div>
// );

// render(<App />, document.getElementById('root'));

const App = ({url, id}) => (
	<div>
		<StreamedianPlayer id={id} >
			{ <source  src={url} type="application/x-rtsp" /> }
		</StreamedianPlayer>
	</div>
);

export default App;