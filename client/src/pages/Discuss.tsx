import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { dislike, like } from '../redux/content/actions'
import style from './homepage.module.scss'

export default function Discuss(props: any) {
  console.log('Discuss', props.location.state.id);
  const { posts } = useSelector((state: RootState) => state.content)
  const { isAuth, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const reactionLike = (e: any, postId: string) => {
    dispatch(like(postId, userId))
  }
  const reactionDis = (postId: string) => {
    dispatch(dislike(postId, userId))
  }
  return (
    <>
      {posts.filter(el => el.id === props.location.state.id).map(el => {
        return (
          <div key={el.id + 'a'} className={style.itemFront}>
            <h1>{el.title}</h1>
            <h2>{el.text}</h2>
            <div>creator: {el.creator.userName}</div>
            <div className='like-dislike'>
              {el.like.filter(el => {
                return el.userId === userId
              })[0]?.status
                ? <img
                  src='img/like-red.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={(e) => reactionLike(e, el.id)}
                />
                : <img
                  src='img/like-wh.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={(e) => reactionLike(e, el.id)}
                />
              }
              <span style={{ margin: '5px' }}>: {el.like.filter(el => el.status).filter(Boolean).length}шт.</span>
              {el.dislike.filter(el => {
                return el.userId === userId
              })[0]?.status
                ? <img
                  src='img/dis-bl.png'
                  style={{ width: '25px', height: '25px', }}
                  onClick={() => reactionDis(el.id)}
                />
                : <img
                  src='img/dis-wh.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={() => reactionDis(el.id)}
                />
              }
              <span style={{ margin: '5px' }}>: {el.dislike.filter(el => el.status).filter(Boolean).length}шт.</span>
            </div>
            <ul className={style.discuss}>
              {el.comments.map((el, i) => <li key={el.id}>{el.text}</li>)}
            </ul>
          </div>
        )
      })
      }
      <input type='text' /><button>Написать</button>
    </>
  );
}
