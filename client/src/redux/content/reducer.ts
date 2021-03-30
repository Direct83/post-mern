import { actionTypes, ContentReducerIS, ContentActionTypes } from '../actionTypes';
import { makeId } from '../../utils/makeId'

const initialState = {
  posts: [{
    id: 'fdffds3423dsfsd',
    title: 'testTitle',
    text: 'testText',
    creator: 'test',
    like: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
    dislike: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
  }, {
    id: 'fdffds3423dsfsdkkk',
    title: 'testTitle',
    text: 'testText',
    creator: 'test',
    like: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
    dislike: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
  }],
};
export default function userReducer(state = initialState, action: ContentActionTypes): ContentReducerIS {
  switch (action.type) {
    case actionTypes.ADD_POST_DATA:
      return {
        ...state,
        posts: [...state.posts, { ...action.payload, id: makeId(20) }]
      };
    case actionTypes.DISLIKE_POST_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el =>
          action.payload.postId === el.id
            ? (el.dislike.find(el => el.userId === action.payload.userId) ? {
              ...el,
              dislike: el.dislike.map(el => el.userId === action.payload.userId
                ? { ...el, status: !el.status }
                : el),
              like: el.like.map(el => el.userId === action.payload.userId
                ? { ...el, status: false }
                : el)
            }
              : {
                ...el,
                dislike: [...el.dislike, { userId: action.payload.userId, status: true }],
                like: [...el.like, { userId: action.payload.userId, status: false }]
              })
            : el
        )]
      };
    case actionTypes.LIKE_POST_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el =>
          action.payload.postId === el.id
            ? (el.like.find(el => el.userId === action.payload.userId) ? {
              ...el,
              like: el.like.map(el => el.userId === action.payload.userId
                ? { ...el, status: !el.status }
                : el),
              dislike: el.dislike.map(el => el.userId === action.payload.userId
                ? { ...el, status: false }
                : el)
            }
              : {
                ...el,
                like: [...el.like, { userId: action.payload.userId, status: true }],
                dislike: [...el.dislike, { userId: action.payload.userId, status: false }]
              })
            : el
        )]
      };
    default:
      return state;
  }
}
