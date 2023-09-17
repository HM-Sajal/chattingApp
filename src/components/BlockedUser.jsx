import React from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';

const BlockedUser = () => {
  return (
    <div className='box'>
        <Heading className="group_title" as="h3" title="Blocked Users"/>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
    </div>
  )
}

export default BlockedUser