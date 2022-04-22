import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/',
    },
   
    {
        id: 3,
        label: 'Authentication',
        isTitle: true
    },
    {
        id: 4,
        label: 'MENUITEMS.USERS.TEXT',
        icon: 'bx bxs-user-detail',
        link: '/',
         subItems: [
            {
                id: 5,
                label: 'MENUITEMS.USERS.LIST.USERSLIST',
                link: 'users/userslist',
                parentId: 4
            },
            {
                id: 6,
                label: 'MENUITEMS.USERS.LIST.USERSGRID',
                link: 'users/usersgrid',
                parentId: 4
            },
            {
                id: 7,
                label: 'MENUITEMS.USERS.LIST.LOGINATTEMPTES',
                link: 'users/loginattempts',
                parentId: 4
            },
        ]
    },
    {
        id: 8,
        label: 'Roles & Permissions',
        icon: 'bx bxs-lock-alt',
        link: '/roles',
    },
    {
        id: 9,
        label: 'Products',
        isTitle: true
    },
    {
        id: 10,
        label: 'Products',
        icon: 'bx-calendar',
        link: '/',
        subItems: [
            {
                id: 11,
                label: 'MENUITEMS.USERS.LIST.USERSLIST',
                link: '/',
                parentId: 10
            },
            {
                id: 12,
                label: 'MENUITEMS.USERS.LIST.USERSGRID',
                link: '/',
                parentId: 10
            },
         
        ]
    },

    {
        id: 13,
        label: 'Contacts',
        isTitle: true
    },
    {
        id: 14,
        label: 'Contact me',
        icon: 'bx-calendar',
        link: '/',
    },
   
    {
        id: 15,
        label: 'Company',
        isTitle: true
    },
    {
        id: 16,
        label: 'Company',
        icon: 'bx-calendar',
        link: 'company',
    },

    {
        id: 17,
        label: ' My Company',
        icon: 'bx-calendar',
        link: 'company/mycompany',
    },
   
   
    
];

