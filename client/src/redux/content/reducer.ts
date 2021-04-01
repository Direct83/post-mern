import { actionTypes, ContentReducerIS, ContentActionTypes } from '../actionTypes';
import { makeId } from '../../utils/makeId'

const initialState = {
  posts: [{
    id: 'fdffds3423dsfsd',
    title: 'Принцип программирования KISS — делайте вещи проще',
    text: `Большая часть программных систем необосновано перегружена практически ненужными функциями, что ухудшает удобство их использование конечными пользователями, а также усложняет их поддержку и развитие разработчиками. Следование принципу «KISS» позволяет разрабатывать решения, которые просты в использовании и в сопровождении.

    KISS — это принцип проектирования и программирования, при котором простота системы декларируется в качестве основной цели или ценности. Есть два варианта расшифровки аббревиатуры: «keep it simple, stupid» и более корректный «keep it short and simple».
    `,
    datePost: '31.03.2021, 13:29:55',
    creator: {
      userName: 'test',
      userId: '6065b0f067b4f66434e2d1e4',
    },
    like: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
    dislike: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
    edit: false,
    comments: [{
      id: 'fff322',
      creator: {
        userName: 'test',
        userId: '6065b0f067b4f66434e2d1e4',
        dateComment: '31.03.2021, 13:31:55'
      },
      text: 'Привет, мне очень понравился твой пост! спасибо!',
      like: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
      dislike: [{ userId: "6061fff9b3d24b0af8495a44", status: false }],
      edit: false,
    }]
  }]
};
export default function userReducer(state = initialState, action: ContentActionTypes): ContentReducerIS {
  switch (action.type) {
    case actionTypes.ADD_POST_DATA:
      return {
        ...state,
        posts: [...state.posts, { ...action.payload, id: makeId(20) }]
      };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter(el => el.id !== action.payload.idPost)]
      };
    case actionTypes.EDIT_POST:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? { ...el, edit: !el.edit }
          : el
        )]
      };
    case actionTypes.EDIT_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? {
            ...el, comments: [...el.comments.map(el => el.id === action.payload.commentId
              ? { ...el, edit: !el.edit }
              : el
            )]
          }
          : el
        )]
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? { ...el, comments: [...el.comments.filter(el => el.id !== action.payload.commentId)] }
          : el
        )]
      };
    case actionTypes.UPD_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? {
            ...el,
            comments: [...el.comments.map(el => el.id === action.payload.commentId
              ? { ...el, text: action.payload.text || el.text }
              : el
            )]
          }
          : el
        )]
      };
    case actionTypes.UPD_POST:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? { ...el, title: action.payload.title || el.title, text: action.payload.text || el.text }
          : el
        )]
      };
    case actionTypes.ADD_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el => el.id === action.payload.idPost
          ? {
            ...el,
            comments: [
              ...el.comments,
              {
                id: makeId(20),
                creator: { ...action.payload.creator },
                text: action.payload.text,
                edit: false,
                like: [],
                dislike: [],
              }
            ]
          }
          : el)]
      };
    case actionTypes.DISLIKE_POST_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el =>
          action.payload.postId === el.id
            ? (el.dislike.find(el => el.userId === action.payload.userId)
              ? {
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
    case actionTypes.DISLIKE_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el =>
          action.payload.postId === el.id
            ? {
              ...el,
              comments: el.comments.map(el => el.id === action.payload.commentId
                ? (el.dislike.find(el => el.userId === action.payload.userId)
                  ? {
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
                : el)
            }
            : el
        )]
      };
    case actionTypes.LIKE_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(el =>
          action.payload.postId === el.id
            ? {
              ...el,
              comments: el.comments.map(el => el.id === action.payload.commentId
                ? (el.like.find(el => el.userId === action.payload.userId)
                  ? {
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
                : el)
            }
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
