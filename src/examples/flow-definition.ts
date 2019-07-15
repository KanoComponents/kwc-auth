const backText = 'Back';
export const flowDefinition = [
    {
        id: 'play',
    },
    {
        id: 'username',
    },
    {
        id: 'update-username',
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
            link: 'login',
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
        id: 'update-email',
    },
    {
        id: 'login',
    },
    {
        id: 'success',
    },
];
