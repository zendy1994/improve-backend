export const Routes = {
  file: {
    prefix: 'file',
    upload: '/upload',
    uploadMultiple: '/upload/multiple',
  },
  otp: {
    prefix: 'otp',
    verification: '/verification',
  },
  auth: {
    prefix: 'auth',
    signUp: '/sign-up',
    signIn: '/sign-in',
    signOut: '/sign-out',
    emailVerification: '/email-verification',
    changePassword: '/change-password',
  },
  user: {
    prefix: 'user',
    getOne: '/:userId',
    avatar: '/avatar',
    list: '/list',
  },
  follow: {
    prefix: 'follow',
    getOne: '/:userId',
    followings: '/followings',
    followers: '/followers',
    newFollowers: '/new-followers',
    topFollowed: '/top-followed',
  },
};
