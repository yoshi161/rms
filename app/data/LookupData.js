const LookupData = {

    grade: [
        {
            code: 'SE1',
            type: 'SE',
            desc: 'SE - JP'
        },
        {
            code: 'SE2',
            type: 'SE',
            desc: 'SE - PG'
        },
        {
            code: 'SE3',
            type: 'SE',
            desc: 'SE - AP'
        },
        {
            code: 'SE4',
            type: 'SE',
            desc: 'SE - AN'
        },

        {
            code: 'SM',
            type: 'MJF',
            desc: 'MJF - SM'
        },
        {
            code: 'PM',
            type: 'MJF',
            desc: 'MJF - PM'
        },
    ],

    gradeConfig:{
        'SE1'   : true,
        'SE2'   : true,
        'SE3'   : true,
        'SE4'   : true,
        'SM'    : true,
        'PM'    : true,
    },

    office: [
        {
            code: 'DPS',
            type: 'OFFICE',
            desc: 'Bali'
        },
        {
            code: 'JOG',
            type: 'OFFICE',
            desc: 'Yogyakarta'
        },
        {
            code: 'JKT',
            type: 'OFFICE',
            desc: 'Jakarta'
        },
        {
            code: 'BDG',
            type: 'OFFICE',
            desc: 'Bandung'
        },
        {
            code: 'SBY',
            type: 'OFFICE',
            desc: 'Surabaya'
        },
    ],

    officeConfig:{
        'DPS'   : true,
        'JOG'   : true,
        'JKT'   : true,
        'BDG'   : true,
        'SBY'   : true,
    },

    division: [
        {
            code: 'SWDR',
            type: 'DIV',
            desc: 'SWD Red'
        },
        {
            code: 'SWDG',
            type: 'DIV',
            desc: 'SWD Green'
        },
        {
            code: 'SWDB',
            type: 'DIV',
            desc: 'SWD Blue'
        },
        {
            code: 'SWDBl',
            type: 'DIV',
            desc: 'SWD Black'
        },
        {
            code: 'CDC',
            type: 'DIV',
            desc: 'CDC'
        },
    ],

}

export default LookupData;