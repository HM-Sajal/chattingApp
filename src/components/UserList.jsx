import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    const [userslist, setUserslist] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([]);
    let [friendList, setFriendList] = useState([])
    const userInfo = useSelector((state) => state.logedUser.value);

    useEffect(() => {
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                if (userInfo.uid !== item.key) {
                    arr.push({ ...item.val(), userid: item.key });
                }
            });
            setUserslist(arr);
        });
    }, [db, userInfo]);

    useEffect(() => {
        const friendRequestRef = ref(db, 'friendrequest');
        onValue(friendRequestRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                // Store the user IDs who have received friend requests
                arr.push(item.val().whorecevedid+item.val().whosendid);
            });
            setFriendRequestList(arr);
        });
    }, [db]);


    const handleFriendRequest = (info) => {
        // Send a friend request
        set(push(ref(db, 'friendrequest/')), {
            whosendname: userInfo.displayName,
            whosendid: userInfo.uid,
            whorecevedname: info.username,
            whorecevedid: info.userid
        });
    };
    useEffect(() => {
        const friendRequestRef = ref(db, 'friends');
        onValue(friendRequestRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                arr.push(item.val().whorecevedid+item.val().whosendid);
            });
            setFriendList(arr);
        });
    }, [db]);
    return (
        <div className='box'>
            <Heading className="group_title" as="h3" title="User List" />
            {userslist.map((item) => (
                <div className='list' key={item.userid}>
                    <div className='group_userInfo'>
                        <img src={GroupPhoto} alt="group" />
                        <div>
                            <Heading className="group_heading" as="h4" title={item.username} />
                            <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!" />
                        </div>
                    </div>
                    {friendRequestList.includes(item.userid+userInfo.uid) || friendRequestList.includes(userInfo.uid+item.userid) ? (
                        <Button variant="contained" disabled>
                            Request Pending
                        </Button>
                    ) : friendList.includes(item.userid+userInfo.uid) || friendList.includes(userInfo.uid+item.userid) ?
                        <Button variant="contained">
                            Friend
                        </Button>
                     : 
                        <Button onClick={() => handleFriendRequest(item)} variant="contained">
                            Add Friend
                        </Button>
                    }
                </div>
            ))}
        </div>
    );
};

export default UserList;
