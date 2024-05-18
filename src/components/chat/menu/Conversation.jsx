import { Box, Typography, styled } from '@mui/material'
import { useContext ,useEffect,useState} from 'react';
import { AccountContext } from '../../../context/AccountPr';
import { setConversation,getConversation } from '../../../service/api';
import {formDate} from '../../../utils/common-utils'

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
const Container = styled(Box)`
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});
const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;

const Conversation = ({ user }) => {
    const { setPerson ,account,newMessageFlag} = useContext(AccountContext);
    const [message, setMessage] = useState({});


    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationMessage();
    }, [account.sub, newMessageFlag, user.sub]);


    const getUser = async() => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });

    }
    return (
        <Component onClick={() => getUser()}>
            <Box>
                <Image src={user.picture} alt='' />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>
                        {user.name}
                    </Typography>
                    { 
                        message?.text && 
                        <Timestamp>{formDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>
                    {message?.text?.includes('localhost') ? 'media' : message.text}
                    </Text>
                </Box>
            </Box>
        </Component>
    )
}
export default Conversation;