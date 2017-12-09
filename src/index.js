import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import Searchbar from './components/search_bar'
import Videolist from './components/video_list'
import Videodetail from './components/video_detail'
import YTSeach from 'youtube-api-search'

const API_Key='AIzaSyA3WN0TDiwxU4h6JtwTvTaItNs2-VFjDjA'
class App extends React.Component {
  constructor(props)
  {
    super(props);

    this.state={videos : [],
                selectedVideo : null};

    this.videoSearch('Motivational Videos');

  }

  videoSearch(term)
  {
    YTSeach({key : API_Key, term : term },
            (videos) => {this.setState({videos : videos, selectedVideo : videos[0]});
          });
  }


  render() {
    const videoSearch=_.debounce((term) =>{this.videoSearch(term) }, 300);

    return (
    <div className="body">
    <Searchbar onSearchChange={videoSearch} />
    <Videodetail video={this.state.selectedVideo} />
    <Videolist
    onVideoSelect={selectedVideo => this.setState({selectedVideo : selectedVideo })}
    videos={this.state.videos} />
    </div>
  );
  }
}

ReactDOM.render(<App />,document.querySelector('.container'));
