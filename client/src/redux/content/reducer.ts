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
  }, {
    id: 'fdffds3423dsfsd1',
    title: 'DRY – Don’t repeat yourself (не повторяй себя)',
    text: `Этот принцип настолько важен, что не требует повторения! Обычно его упоминают акронимом DRY, который впервые появился в небезызвестной книге "The pragmatic programmer", но концепт, сам по себе, был известен довольно давно. Он относится к самым мелким частям вашего ПО.

Когда вы разрабатываете крупный проект, часто приходится сталкиваться с избыточной общей сложностью реализации. Люди плохо справляются с управлением сложных систем, им лучше удается находить необычные решения определенных задач. Самое простое решение по уменьшению сложности – разделить систему на мелкие, независимые модули, которыми проще управлять.
    `,
    datePost: '02.04.2021, 15:37:28',
    creator: {
      userName: 'test2',
      userId: '6065c9e2973a1c65600a0891',
    },
    like: [{ userId: "6065c9e2973a1c65600a0891", status: false }],
    dislike: [{ userId: "6065c9e2973a1c65600a0891", status: false }],
    edit: false,
    comments: [{
      id: 'fff322',
      creator: {
        userName: 'test',
        userId: '6065c9e2973a1c65600a0891',
        dateComment: '02.04.2021, 16:45:32'
      },
      text: 'Пост просто класс!',
      like: [{ userId: "6065c9e2973a1c65600a0891", status: false }],
      dislike: [{ userId: "6065c9e2973a1c65600a0891", status: false }],
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
        posts: [...state.posts.filter(post => post.id !== action.payload.idPost)]
      };
    case actionTypes.EDIT_POST:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? { ...post, edit: !post.edit }
          : post
        )]
      };
    case actionTypes.EDIT_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? {
            ...post, comments: [...post.comments.map(comment => comment.id === action.payload.commentId
              ? { ...comment, edit: !comment.edit }
              : comment
            )]
          }
          : post
        )]
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? { ...post, comments: [...post.comments.filter(comment => comment.id !== action.payload.commentId)] }
          : post
        )]
      };
    case actionTypes.UPD_COMMENT:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? {
            ...post,
            comments: [...post.comments.map(comment => comment.id === action.payload.commentId
              ? { ...comment, text: action.payload.text || comment.text }
              : comment
            )]
          }
          : post
        )]
      };
    case actionTypes.UPD_POST:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? { ...post, title: action.payload.title || post.title, text: action.payload.text || post.text }
          : post
        )]
      };
    case actionTypes.ADD_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(post => post.id === action.payload.idPost
          ? {
            ...post,
            comments: [
              ...post.comments,
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
          : post)]
      };
    case actionTypes.DISLIKE_POST_DATA:
      return {
        ...state,
        posts: [...state.posts.map(post =>
          action.payload.postId === post.id
            ? (post.dislike.find(dislike => dislike.userId === action.payload.userId)
              ? {
                ...post,
                dislike: post.dislike.map(dislike => dislike.userId === action.payload.userId
                  ? { ...dislike, status: !dislike.status }
                  : dislike),
                like: post.like.map(like => like.userId === action.payload.userId
                  ? { ...like, status: false }
                  : like)
              }
              : {
                ...post,
                dislike: [...post.dislike, { userId: action.payload.userId, status: true }],
                like: [...post.like, { userId: action.payload.userId, status: false }]
              })
            : post
        )]
      };
    case actionTypes.DISLIKE_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(post =>
          action.payload.postId === post.id
            ? {
              ...post,
              comments: post.comments.map(comment => comment.id === action.payload.commentId
                ? (comment.dislike.find(el => el.userId === action.payload.userId)
                  ? {
                    ...comment,
                    dislike: comment.dislike.map(dislike => dislike.userId === action.payload.userId
                      ? { ...dislike, status: !dislike.status }
                      : dislike),
                    like: comment.like.map(like => like.userId === action.payload.userId
                      ? { ...like, status: false }
                      : like)
                  }
                  : {
                    ...comment,
                    dislike: [...comment.dislike, { userId: action.payload.userId, status: true }],
                    like: [...comment.like, { userId: action.payload.userId, status: false }]
                  })
                : comment)
            }
            : post
        )]
      };
    case actionTypes.LIKE_COMMENT_DATA:
      return {
        ...state,
        posts: [...state.posts.map(post =>
          action.payload.postId === post.id
            ? {
              ...post,
              comments: post.comments.map(comment => comment.id === action.payload.commentId
                ? (comment.like.find(el => el.userId === action.payload.userId)
                  ? {
                    ...comment,
                    like: comment.like.map(like => like.userId === action.payload.userId
                      ? { ...like, status: !like.status }
                      : like),
                    dislike: comment.dislike.map(dislike => dislike.userId === action.payload.userId
                      ? { ...dislike, status: false }
                      : dislike)
                  }
                  : {
                    ...comment,
                    like: [...comment.like, { userId: action.payload.userId, status: true }],
                    dislike: [...comment.dislike, { userId: action.payload.userId, status: false }]
                  })
                : comment)
            }
            : post
        )]
      };
    case actionTypes.LIKE_POST_DATA:
      return {
        ...state,
        posts: [...state.posts.map(post =>
          action.payload.postId === post.id
            ? (post.like.find(like => like.userId === action.payload.userId) ? {
              ...post,
              like: post.like.map(like => like.userId === action.payload.userId
                ? { ...like, status: !like.status }
                : like),
              dislike: post.dislike.map(dislike => dislike.userId === action.payload.userId
                ? { ...dislike, status: false }
                : dislike)
            }
              : {
                ...post,
                like: [...post.like, { userId: action.payload.userId, status: true }],
                dislike: [...post.dislike, { userId: action.payload.userId, status: false }]
              })
            : post
        )]
      };
    default:
      return state;
  }
}
