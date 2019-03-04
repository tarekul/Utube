import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import './Home.css'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {isLoading:true,data:[],pageToken:'',saved:''}
    }

    getVideoList = (query,pageToken='')=>{
        axios({ 
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
                part: 'snippet',
                maxResults: 8,
                videoDefinition: 'high',
                type: 'video',
                videoEmbeddable: 'true',
                key: 'AIzaSyDjQJDqIRITkKviY4lVH3eUF1NPcNrgGuA',//'AIzaSyCb9A4kjrypWw84UxCN6AwnagElm_90OlU',
                q: query,
                pageToken: pageToken
            }
        })
        .then(response=>{
            const videoListData = []
            response.data.items.forEach(vid=>{
                let temp = {}
                temp.video_id = vid.id.videoId  //video id
                temp.img = vid.snippet.thumbnails.medium.url //img url
                temp.title = vid.snippet.title //title
                videoListData.push(temp)
            })
            let temp2 = this.state.data.concat(videoListData)
            localStorage.setItem('vids',JSON.stringify(temp2))
            this.setState({isLoading:false,data:temp2,pageToken:response.data.nextPageToken})
        })
    }

    componentDidMount(){
        if(localStorage.getItem('vids')){
            this.setState({isLoading:false,data:JSON.parse(localStorage.getItem('vids'))})
        }
    }

    handleInput = (e) =>{
        if(e.keyCode === 13) {
            this.setState({data:[]})
            return this.getVideoList(e.target.value,this.state.pageToken)
        }
    }

    handleSubmit = (e)=>{
        //console.log(this.state.data)
         this.setState({data:[]})
        return this.getVideoList(this.state.saved,this.state.pageToken)
    }


    handleit = (e) =>{
        this.setState({saved:e.target.value})
    }

    render() {
        if(this.state.isLoading) return <>
        
        <div className="col">
        <div class="d-flex justify-content-center">
        <div class="p-2 bd-highlight">
        <form class="form-inline" style={{paddingLeft:'10%'}} >
            <input className="form-control mr-sm-2" type="search" placeholder="Search for videos..." aria-label="Search" onChange={this.handleit} onKeyDown={this.handleInput}/>
            <button type="submit" class="btn btn-danger" onClick={this.handleSubmit}>Search</button>
        </form>
        {/* <input className="form-control mr-sm-2" type="search" placeholder="Search for videos..." aria-label="Search" onKeyDown={this.handleInput}/> */}
        <p className='little'>No Search Results Yet! Please submit a search above!</p>
        </div>
        </div>
        </div>
        
        </>
        else{ 
            // <h3>Search results for BLANK</h3>
            return <>
            <div className='row'>
            <div class="col-sm-12">
            <div class="d-flex justify-content-center">
            <div class="p-2 bd-highlight">
            <form class="form-inline" >
            <input className="form-control mr-sm-2" type="search" placeholder="Search for videos..." aria-label="Search" onChange={this.handleit} onKeyDown={this.handleInput}/>
            <button type="submit" class="btn btn-danger" onClick={this.handleSubmit}>Search</button>
            </form>
            </div>
            </div>
            
            </div>
            
            <div class='container' style={{paddingLeft:'10%'}}>
            <div class="d-flex justify-content-center">
            <div class="p-2 bd-highlight">
            <div class='row'>
            {this.state.data.map((vid, i)=>{
                return <div className='col-sm-6'>
                        <Link to={`/video/${vid.video_id}`}><img src={vid.img} alt={vid.img} /></Link>
                        <p>{vid.title}</p>
                    </div>
                })}
            </div>
            </div>
            </div>
            </div>
            </div>
            
            
            </>
            
        }     
    }   
}


export default withRouter(Home)
