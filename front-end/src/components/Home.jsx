import React from 'react'
import backgroundImg from '../images/back.png'
import logo from '../images/Logo.png';
import {Button, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import useStyles from './Styles'
export default function Home() {
    const classes = useStyles();

    return (
        <>
            <div style={{
                position:"absolute",
                background:`url(${backgroundImg}) `,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition:'center',
                // height:'',
                width:'100vw',
                // paddingBottom:'40%',
                // overflowX:'hidden'
                }}>
                    <div className="container" style={{display:'flex',justifyContent:'space-between',marginTop:22,}}>
                        <img src={logo} style={{
                        width: 117,
                        height:'auto'
                    }}/>
                    <Link to="/join">
                        <Button variant="outlined" color="primary" className={classes.main_button}>Join Us</Button>
                    </Link>
                    </div>
                    <div className="container">

                        <div className="row " style={{marginTop:'7%'}}>
                            <div className={` col-sm-12 col-md-6 d-none mt-5 mb-3 d-md-block ${classes.home_text} `}>
                                Place where Kietins will talk to each other and get solution of their problems.
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <form className={`${classes.form} `} onSubmit={()=>{  }}>
                                    <div className="p-5">
                                        <div className={classes.form_header}>Login Here</div>
                                            <input type="text" placeholder="Username" className="mt-3 mb-5 p-2" style={{backgroundColor:'transparent',border:'2px solid black',borderRadius:'8px'}}/><br/>
                                            <input type="password" placeholder="Password" className="mb-5 p-2" style={{backgroundColor:'transparent',border:'2px solid black',borderRadius:'8px'}}/><br/>
                                        <Button variant="outlined" color="primary" type="submit" className={classes.main_button}>Login</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <br/><br/><br/> <br/>   <br/><br/><br/> <br/>    <br/>    <br/>   
                </div>
        </>
    )
}
