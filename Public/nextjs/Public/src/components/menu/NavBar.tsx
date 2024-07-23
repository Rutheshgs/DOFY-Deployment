import React from 'react'
import Profile from '../profile/Profile'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { getLocalStorage } from '../helper/Helper'
import Link from 'next/link'

type props = {
    open?: any
}

const NavBar = ({ open }: props) => {
    const personId = getLocalStorage()?.PersonId;


    const openNav = () => {
        let open = document.getElementById('mySidenav');
        open!.style.width = '300px';
    }

    const closeNav = () => {
        let close = document.getElementById('mySidenav');
        close!.style.width = '0px';
    }

    return (
        <>
            <ion-item>
                {personId ?
                    <Tooltip title="My Account">
                        <IconButton
                            onClick={() => openNav()}
                            size="small"
                            sx={{ ml: 5 }}>
                            <Avatar style={{ backgroundColor: "#2d4fb0", fontSize: "small" }} sx={{ width: 30, height: 30 }}>
                                <ion-label style={{ fontSize: "x-small", fontWeight: "bold" }}> {getLocalStorage()?.FirstName.charAt(0).toUpperCase()}</ion-label>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    :
                    <Button className='header-btn' variant="contained" >Login</Button>
                }

            </ion-item>
            <Profile />
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>    
               
            </div>
        </>
    )
}

export default NavBar