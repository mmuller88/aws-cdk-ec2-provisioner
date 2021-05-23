import React, { useEffect } from 'react'
import { css } from 'glamor'
import { FaUser, FaPlus } from 'react-icons/fa'
import { observer } from 'mobx-react'

import { primary } from '../theme'
// import { listUsers, onCreateUser as OnCreateUser } from '../graphql'
// import Overlay from './Overlay'
import UserStore from '../mobx/UserStore'

import { CreateUserDocument, CreateUserInput, useGetUserQuery, useListUsersQuery, User } from '../lib/api';
import { render } from 'react-dom'
import { useMutation } from 'react-query'
import { API } from '../lib/fetcher';

export function Users (){

  // users: any;
  // componentDidMount() {
  //   const { username } = this.props.userStore
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { data, isLoading, refetch } = useListUsersQuery(null, {
  //     refetchOnWindowFocus: false,
  //   });
  //   this.users = data?.listUsers.items.filter(u => u.username !== username);
  // }

  // const state = { userStore: false};
  // // toggleOverlay = (visible, userForConvo) => {
  // //   this.setState({ showOverlay: visible, userForConvo })
  // // }
  // // componentDidMount() {
  // //   this.props.subscribeToNewMessages()
  // // }

  // // const [userStore, setUserStore] = useState<UserStore>();

  const [useCreateUserMutation] = useMutation(async (input: CreateUserInput) => {
    const result = await API.getInstance().query(CreateUserDocument, { input });
    return result.data?.createUser as User;
  });

  const { username } = UserStore;
  console.log('username: ' + username);
  let users;
  if(username) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userData = useGetUserQuery({id:username}, {
      refetchOnWindowFocus: false
    }).data;
    console.log('userdata', userData);
    if(!userData.getUser) {
        console.log(username + ' does not exist so lets create ...');
        const input: CreateUserInput = {
          username,
        };
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCreateUserMutation(input);
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const usersData = useListUsersQuery(null, {
        refetchOnWindowFocus: false,
      }).data;
      users = usersData?.listUsers.items.filter(u => u.username !== username);
  }

  return (
      <div {...css(styles.container)}>
        {
          // this.state.showOverlay && (
            // <Overlay
            //   user={this.state.userForConvo}
            //   toggleOverlay={this.toggleOverlay}
            //   username={username}
            //   history={this.props.history}
            // />
          // )
        }
        <p {...css(styles.title)}>Users</p>
        {
          users?.map((u, i) => (
            <div
              key={i} {...css(styles.user)}
              // onClick={() => this.toggleOverlay(true, u)}
            >
              <FaUser />
              <p {...css(styles.username)}>{u.username}</p>
              <div {...css(styles.plusIconContainer)}>
                <FaPlus />
              </div>
            </div>
          ))
        }
      </div>
    );
}

const styles = {
  plusIconContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  username: {
    margin: 0,
    marginLeft: 10,
  },
  user: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#ededed',
    borderRadius: 20,
    marginTop: 10,
    cursor: 'pointer'
  },
  container: {
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
    borderBottom: `2px solid ${primary}`,
    paddingBottom: 4
  }
}
// const UsersWithData = compose(
//   graphql(listUsers, {
//     options: {
//       fetchPolicy: 'cache-and-network'
//     },
//     props: props => {
//       return {
//         users: props.data.listUsers ? props.data.listUsers.items : [],
//         subscribeToNewMessages: () => {
//           props.data.subscribeToMore({
//             document: OnCreateUser,
//             updateQuery: (prev, { subscriptionData: { data : { onCreateUser } } }) => {
    
//               let userArray = prev.listUsers.items.filter(u => u.id !== onCreateUser.id)
//               userArray = [
//                 ...userArray,
//                 onCreateUser,
//               ]
//               console.log('userArray:' , userArray)

//               return {
//                 ...prev,
//                 listUsers: {
//                   ...prev.listUsers,
//                   items: userArray
//                 }
//               }
//             }
//           })
//         },
//       }
//     }
//   })
// )(Users)

// export default observer(UsersWithData)