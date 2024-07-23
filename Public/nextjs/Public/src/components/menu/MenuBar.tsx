import { useState } from 'react';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { getLocalStorage, getUserLanguage } from '../helper/Helper';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { modelChanger } from '@/features/reducers/login/LoginModel.Reducer';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import React from 'react';
import Language from '@/components/header/Header.json';
import Profile from '../profile/Profile';

type Anchor = 'right';

export default function MenuBar() {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];

    const personId = getLocalStorage()?.PersonId;
    const [show, setShow] = useState({ right: false });

    const loginHandler = () => {
        dispatch(modelChanger(true));
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setShow({ ...show, [anchor]: open });
            };


    const list = (anchor: Anchor) => (
        <Box
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ width: 300 }}
        >
            <Divider />
            <Profile />
        </Box>
    );


    return (
        <>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    {personId ?
                        <Tooltip title="My Account">
                            <IconButton
                                onClick={toggleDrawer(anchor, true)}
                                size="small"
                                sx={{ ml: 5 }}>
                                <Avatar style={{ backgroundColor: "#2d4fb0", fontSize: "small" }} sx={{ width: 30, height: 30 }}>
                                    <ion-label style={{ fontSize: "x-small", fontWeight: "bold" }}> {getLocalStorage()?.FirstName.charAt(0).toUpperCase()}</ion-label>
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        :
                        <Button className='header-btn' variant="contained" onClick={() => loginHandler()}>{dataLocalization.Login}</Button>
                    }
                    <Drawer
                        anchor={anchor}
                        open={show[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    )
}


