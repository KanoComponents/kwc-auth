const backText = 'Back';
export const viewsArray = [
    {
        id: 'landing',
    },
    {
        id: 'play',
    },
    {
        id: 'username',
        backButton: {
            text: backText,
            link: '/landing',
        },
    },
    {
        id: 'password',
        backButton: {
            text: backText,
            link: 'username',
        },
    },
    {
        id: 'forgot-username',
        backButton: {
            text: backText,
            link: 'login',
        },
    },
    {
        id: 'forgot-password',
        backButton: {
            text: backText,
            link: 'login',
        },
    },
    {
        id: 'forgot-email',
        backButton: {
            text: backText,
            link: '/',
        },
    },
    {
        id: 'email',
        backButton: {
            text: backText,
            link: 'password',
        },
    },
    {
        id: 'login',
        backButton: {
            text: backText,
            link: 'landing',
        },
    },
    {
        id: 'success',
    },
];
