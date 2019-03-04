import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Video.css';


class Video extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading:true,
            link: `https://www.youtube.com/embed/${this.props.match.params.id}?autoplay=1&fs=1&origin=http://localhost:3000`,
            name:'',
            comment:'',
            data : [],
            show:false
        }
    }

    componentDidMount = () =>{
        console.log(this.props.match.params.id)
        this.setState({loading:false})
    }
    

    handleName = (e)=>{
        this.setState({name:e.target.value})
    }

    handleComment = (e) =>{
        this.setState({comment:e.target.value})
    }

    handleClick = (e) =>{
        if(this.state.name !== '' && this.state.comment !== ''){
            const data = this.state.data
            data.unshift({name:this.state.name,comment:this.state.comment})
            this.setState({show:true,data:data})
        }
        else alert('Please enter name and comment to post')
    }

    display = () =>{
        if(this.state.show){
            return <><div style={{paddingTop:'20px'}}>{this.state.data.map((e,i)=>{
                return <>
                <h5>{e.name}</h5>
                <p>{e.comment}</p>
            </>
            })}</div>
            </>
            
        }
        //this.setState({show:false})
    }
    
    render() {
        if(this.state.loading) return <h1>loading</h1>
        else{
        return (
            <>  <div className='container'>
                <div className='row'>
                <div className='col-sm-12'>
                    <iframe title='yt-video' type="text/html"
                    src={this.state.link} frameBorder="0"></iframe>
                </div>
                
                
                
                <div className='col-sm-12'>
                    <hr/>
                </div>
                
        
        <div className='col-sm-12'>
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name.." onChange={this.handleName}  />
            
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Comment</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="..." onChange={this.handleComment}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={this.handleClick}>Submit</button>
        </form>
        
        {this.display()}
        </div>
        </div>
        </div>
        </>
        );
        }
    
    }
}

export default withRouter(Video);