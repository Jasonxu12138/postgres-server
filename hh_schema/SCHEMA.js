const mongoose = require('mongoose');
const schema = mongoose.Schema;
const CONSTANTS = require('../utility/CONSTANTS');
const uuid = require('uuid');

//////////////////////////////////////////////////////////////////////////// DEFINE MONGOOSE SCHEMA
const mongooseUserSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    username: {type: String, required: true, index: {unique: true}},
    hashPassword: {type: String, required: true},
    userType: [String],
    refreshToken: {type: String, default: ''},
    负责区域: [String], //req
    监督区域: [String],  //req
    adminAllowAccess: {type: Array, default: []},
    nickname: {type: String, default: ''},
    resetPasswordToken: {type: String, default: ''},
    resetPasswordExpires: {type: String, default: ''},
    isActivated: {type: Boolean, default: false}
}

const mongooseRegionSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    '城市': {type: String, required: true, index: {unique: true}},
    '大区': String,
    '大区经理': String,
    '区域经理': String,
    '年度任务': {
        '1月': {type: Number, default: 0},
        '2月': {type: Number, default: 0},
        '3月': {type: Number, default: 0},
        '4月': {type: Number, default: 0},
        '5月': {type: Number, default: 0},
        '6月': {type: Number, default: 0},
        '7月': {type: Number, default: 0},
        '8月': {type: Number, default: 0},
        '9月': {type: Number, default: 0},
        '10月': {type: Number, default: 0},
        '11月': {type: Number, default: 0},
        '12月': {type: Number, default: 0},
        '总任务': {type: Number, default: 0}
    },
    '实际销量': {
        '1月': {type: Number, default: 0},
        '2月': {type: Number, default: 0},
        '3月': {type: Number, default: 0},
        '4月': {type: Number, default: 0},
        '5月': {type: Number, default: 0},
        '6月': {type: Number, default: 0},
        '7月': {type: Number, default: 0},
        '8月': {type: Number, default: 0},
        '9月': {type: Number, default: 0},
        '10月': {type: Number, default: 0},
        '11月': {type: Number, default: 0},
        '12月': {type: Number, default: 0},
        '总销量': {type: Number, default: 0}
    },
    '当日销量': {
        '金额': {type: Number, default: 0},
        '数据日期': {type: Date, default: Date.now()}
    }
}

const mongooseClientSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    '客户代码': {type: String, required: true},
    '客户名称': {type: String, required: true}, /////
    "客户区域": {type: String, required: true},
    '客户地址': {type: String, default: ''},
    '电话': {type: String, default: ''},
    '客户类型': {type: String, default: ''},
    "客户联系人": Array,
    '年累计销量': {
        '金额': {type: Number, default: 0},
        '数据日期': {type: Date, default: Date.now()}
    },
    // '年销售完成率': {type: Number, default: 0}, // 年累计销售额/年度销售任务
    '当日销量': {
        '金额': {type: Number, default: 0},
        '数据日期': {type: Date, default: Date.now()}
    },
    '产品': {type: Object, default: {}},
    '品类': {type: Object, default: {}},
    '曾用名': {type: Array, default: []},
    '项目统计': {type: Array, default: []},
}

const mongooseDailyReportSchemaConfig = {
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    '跟进记录': [{
        'statusRecordID': {type: String, required: true},
        '项目名称': {type: String, required: true},
        '项目跟进详情': {type: String, default: ''},

        '项目ID': {type: String, required: true},
        '项目状态': {type: String, required: true},
        '项目阶段': {type: String, required: true},
    }],
    '明日行程': {type: String, default: ''},
    '明日计划': {type: String, default: ''},
    '填写人': {type: String, default: '', required: true},
}

const mongooseCategorySchemaConfig = {
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    '物料代码': {type: String, default: '', index: {unique: true}},
    '物料描述': {type: String, default: ''},
    '小品类': {type: String, default: ''},
    '大类': {type: String, default: ''}
}

const mongooseProjectSchemaConfig = {
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    '跟进记录': [{
        createdAt: {type: Date, required: true, default: Date.now()},
        'statusRecordID': String,
        'dailyReportID': String,
        '填写人': String,
        '项目跟进详情': String,
        '项目状态': String,
        '项目阶段': String,
    }],
    '项目名称': {type: String, required: true},
    '项目负责人': {type: Array, required: true},
    '项目区域': {type: String, required: true},
    '项目地址': {type: String, required: true},
    '客户ID': {type: String, required: true},
    '客户名称': {type: String, required: true},
    '客户区域': {type: String, required: true},
    '项目状态': {type: String, required: true},
    '项目阶段': {type: String, required: true},
    '客户联系人': {type: Array, default: []},
    '所属行业': {type: String, default: ''},
    '重要程度': {type: String, default: ''},
    '涉及产品': {type: String, default: ''},
    '成交率': {type: String, default: ''},
    '项目体量': {type: String, default: ''},
    '项目前期情况': {type: String, default: ''}
}
// const mongooseProjectSchemaConfig = {
//     uuid: { type: String, required: true, index: { unique: true }},
//     createdAt: { type: String, required: true},
//     updatedAt: String,
// }
// mongoose.Schema.Types.String.checkRequired(v => v != null); // allow mongoose to accept empty required string
// mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

const mongooseSalesDataSchemaConfig = {
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    '单据编号': String,
    '单据日期': String,

    '客户代码': String,
    '客户名称': String,
    '渠道': String,
    '物料代码': String,
    '物料名称': String,
    '销售单位数量': String,
    '大类代码': String,
    '大类名称': String,
    '小类代码': String,
    '小类名称': String,
    '单据类型': String,
    '订单类型': String,
    '基本单位数量': String,
    '客户组': String,
    '产品线代码': String,
    '品类名称': String,
    '折后含税金额': String,
    '折前含税金额': String,
    '单价': String,
    '销售金额': String,
    '税额': String,
    '成本单价': String,
    '成本金额': String,
    '返利金额': String,
    '客户代码': String,
    '客户名称': String,
}
const mongooseSkuSchemaConfig = {
    _id: false,
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt:  {type: Date, required: true, default: Date.now()},
    '工厂': String,
    '物料': String,
    '物料描述': String,
    '可用库存': String,
    '库位': String,
    '库位描述': String,
    'ABC分类': String,
    '描述': String,
    '产地': String,
    '产地描述': String,
    '箱支数': String,
    '产品线代码': String,
    '产品线描述': String,
    '品类': String,
    '品类描述': String,
    '产品大类': String,
    '产品大类描述': String,
    '特定工厂的物料状态': String,
    '外部物料组': String,
    '描述_1': String,
    '是否配件': String,
    '产品小类': String,
    '产品小类描述': String,
    '欧普牌': String,
    '绿照': String,
    'LED': String,
    '产品物料组': String,
    '产品物料组描述': String,
}

const homehomeUserSchemaConfig = {
    wxOpenID:    {type: String, required: true, index: {unique: true}},
    uuid:        {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt:   {type: Date, required: true, default: Date.now()},
    updatedAt:   {type: Date, required: true, default: Date.now()},
    // wxOpenID:    {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    userName:    {type: String, required: true},
    orders:      {type: Array, default: []},
    membershipLevel:      {type: Number, default: 1},
    userInfo: {type: String, default: ""}
    // hashPassword: {type: String, required: true},
    // refreshToken: {type: String, default: ''},
}

const homehomeOrderSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    isActive: {type: String, required: true, default: true},
    orderHistory: [{
        createdAt: {type: Date, default: Date.now()},
        // statusRecordID: {type: String, default: uuid.v1},
        orderStatus: {type: Number}
    }],

    // userID : {type: String, required: true},
    wxOpenID: {type: String, required: true},
    userName: {type: String, required: true},
    orderStatus: {type: Number, required: true},
    orderSum: {type: Number, required: true},
    items:[{
        id: {type: String, required: true},
        name: {type: String, required: true},
        code: {type: String, required: true},
        unit: {type: String, required: true},
        retailPrice: {type: Number, required: true},
        amount: {type: Number, required: true},
        category: {type: String, required: true},
        brand: {type: String, required: true},
        // level1: {type: String, required: true},
        // level2: {type: String, required: true},
        // barcode: {type: String, required: true},
        // rn: {type: String, required: true},
        // uuid: {type: String, required: true},
        // cos_url: {type: String, required: true},
    }],
    // orderAddress: {
    //     wxOpenID: {type: String, required: true},
    //     createdAt: {type: Date, required: true, default: Date.now()},
    //     contactName: {type: String, required: true},
    //     PhoneNum: {type: Number, required: true},
    //     city: {type: String, required: true},
    //     region: {type: String, required: true},
    //     address: {type: String, required: true}
    // }
}

const homehomeProductSchemaConfig = {
    // uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    amount: String,
    id: {type: String, required: true, index: {unique: true}},
    enabled: {type: Boolean},
    brand: {type: String, required: true},
    parentID: {type: String, required: true},
    price6:{type: Number, required: true},
    level1: {type: String, required: true},
    level2: {type: String, required: true},
    mainImgUrl: {type: String, default: ""},
    descImg: {type: Array, default: []},
    // homehomeCategoryName:  {type: String, default: "uncategorized"},
    // homehomeCategoryID:  {type: String, default: "uncategorized"},

    cos_url: {type: String},
    name:  {type: String, required: true},
    // buy_price: {type: Number, required: true},
    // barcode:  {type: String, required: true},
    unit:  {type: String},
}

const homehomeCategoryMapSchemaConfig = {
    // createdAt: {type: Date, required: true, default: Date.now()},
    // updatedAt: {type: Date, required: true, default: Date.now()},
    // isActive: {type: String, required: true, default: true},
    // name: {type: String, required: true, index: {unique: true}},
    categoryID: {type: String, required: true},
    productID: {type: String, required: true},
    erpProductID: {type: String}
}

const homehomeCategorySchemaConfig = {
    // uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    enabled: {type: Boolean, required: true, default: true},
    name: {type: String, required: true, index: {unique: true}},

}

const homehomeFPItemSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    amount: String
}

const homehomeRecChannelSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    createdAt: {type: Date, required: true, default: Date.now()},
    data: {type: Object},
    body: {type: Object}

}
const homehomeAddressSchemaConfig = {
    uuid: {type: String, required: true, index: {unique: true}, default: uuid.v1},
    wxOpenID: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now()},
    contactName: {type: String, required: true},
    PhoneNum: {type: Number, required: true},
    city: {type: String, required: true},
    region: {type: String, required: true},
    address: {type: String, required: true}
}

const homehomeStockConfig = {
    createdAt: {type: Date, required: true, default: Date.now()},
    content: {type: String}
}


//////////////////////////////////////////////////////////////////////////// CONSTRUCT MONGOOSE SCHEMA
const mongooseHomeHomeCategoryMapSchema = new schema(homehomeCategoryMapSchemaConfig, {
    collection: CONSTANTS.HOMEHOME_COL_CATEGORY_MAP,
    versionKey: false
}).index({categoryID: 1, productID: 1}, {unique: true});

const mongooseHomeHomeStockSchema = new schema(homehomeStockConfig, {
    collection: CONSTANTS.HOMEHOME_COL_STOCK,
    versionKey: false,
    timestamps: true
})


const mongooseHomeHomeCategorySchema = new schema(homehomeCategorySchemaConfig, {
    collection: CONSTANTS.HOMEHOME_COL_CATEGORY, versionKey: false, timestamps: true
})

const mongooseHomeHomeAddressSchema = new schema(homehomeAddressSchemaConfig, {
    collection: CONSTANTS.HOMEHOME_ADDRESS, versionKey: false, timestamps: true
})

const mongooseHomeHomeProductSchema = new schema(homehomeProductSchemaConfig, {
    collection: "homehome_product", versionKey: false, timestamps: true
})

const mongooseHomeHomeRecChannelSchema = new schema(homehomeRecChannelSchemaConfig, {
    collection: "test", versionKey: false, timestamps: true
})

const mongooseHomeHomeUserSchema = new schema(homehomeUserSchemaConfig, {
    collection: "homehome_user", versionKey: false, timestamps: true
})


const mongooseUserSchema = new schema(mongooseUserSchemaConfig, {
    collection: CONSTANTS.COL_USER_LIST, versionKey: false, timestamps: true
})

const mongooseRegionSchema = new schema(mongooseRegionSchemaConfig, {
        collection: CONSTANTS.COL_REGION,
        versionKey: false, timestamps: true, minimize: false
    }
)
const mongooseClientSchema = new schema(mongooseClientSchemaConfig, {
        collection: CONSTANTS.COL_CLIENT_LIST,
        versionKey: false, timestamps: true, minimize: false
    }
)
const mongooseDailyReportSchema = new schema(mongooseDailyReportSchemaConfig, {
    collection: CONSTANTS.COL_DAILY_REPORT,
    versionKey: false, timestamps: true
})

const mongooseProjectSchema = new schema(mongooseProjectSchemaConfig, {
    collection: CONSTANTS.COL_PROJECT_LIST,
    versionKey: false, timestamps: true
})

const mongooseSalesDataSchema = new schema(mongooseSalesDataSchemaConfig, {
    collection: CONSTANTS.COL_SALES_DATA,
    versionKey: false, timestamps: true
})
const mongooseSkuSchema = new schema(mongooseSkuSchemaConfig, {
    collection: CONSTANTS.COL_SKU_LIST,
    versionKey: false, timestamps: true
})
const mongooseCategorySchema = new schema(mongooseCategorySchemaConfig, {
    collection: CONSTANTS.COL_CATEGORY_LIST,
    versionKey: false,
    timestamps: true
})


//////////////////////////////////////////////////////////////////////////// EXPORT SCHEMA DEFINITION AND MODEL
const MONGOOSE_HOMEHOME_CATEGORY_MAP = {
    schemaCongfig: mongooseHomeHomeCategoryMapSchema,
    model: mongoose.model('homehome_category_map', mongooseHomeHomeCategoryMapSchema),
}

const MONGOOSE_HOMEHOME_STOCK = {
    schemaCongfig: mongooseHomeHomeStockSchema,
    model: mongoose.model('homehome_stock', mongooseHomeHomeStockSchema),
}

const MONGOOSE_HOMEHOME_CATEGORY = {
    schemaCongfig: mongooseHomeHomeCategorySchema,
    model: mongoose.model('homehome_category', mongooseHomeHomeCategorySchema),
}


const MONGOOSE_HOMEHOME_PRODUCT = {
    schemaCongfig: mongooseHomeHomeProductSchema,
    model: mongoose.model('homehome_product', mongooseHomeHomeProductSchema),
}

const MONGOOSE_HOMEHOME_ADDRESS = {
    schemaCongfig: mongooseHomeHomeAddressSchema,
    model: mongoose.model('homehome_address', mongooseHomeHomeAddressSchema),
}

const MONGOOSE_HOMEHOME_USER = {
    schemaCongfig: homehomeUserSchemaConfig,
    // schema: mongooseEmployeeSchema,
    model: mongoose.model('homehome_user', mongooseHomeHomeUserSchema),
}

const MONGOOSE_TEST = {
    schemaCongfig: homehomeRecChannelSchemaConfig,
    // schema: mongooseEmployeeSchema,
    model: mongoose.model('test', mongooseHomeHomeRecChannelSchema),
}


const MONGOOSE_HOMEHOME_ORDER = {
    schemaCongfig: mongooseUserSchemaConfig,
    // schema: mongooseEmployeeSchema,
    model: mongoose.model('homehome_order', homehomeOrderSchemaConfig),
}

const MONGOOSE_USER = {
    schemaCongfig: mongooseUserSchemaConfig,
    // schema: mongooseEmployeeSchema,
    model: mongoose.model('user_list', mongooseUserSchema),
}

const MONGOOSE_CLIENT = {
    schemaCongfig: mongooseClientSchemaConfig,
    // schema: mongooseClientSchema,
    model: mongoose.model('client', mongooseClientSchema),
}

const MONGOOSE_DAILY_REPORT = {
    schemaCongfig: mongooseDailyReportSchemaConfig,
    // schema: mongooseDailyReportSchema,
    model: mongoose.model('daily_report', mongooseDailyReportSchema),
}

const MONGOOSE_PROJECT = {
    schemaCongfig: mongooseProjectSchemaConfig,
    // schema: mongooseProjectSchema,
    model: mongoose.model('project', mongooseProjectSchema),
}

const MONGOOSE_SKU = {
    schemaCongfig: mongooseSkuSchemaConfig,
    // schema: mongooseSkuSchema,
    model: mongoose.model('sku', mongooseSkuSchema),
}

const MONGOOSE_CATEGORY = {
    schemaCongfig: mongooseCategorySchemaConfig,
    model: mongoose.model('category', mongooseCategorySchema)
}

const MONGOOSE_SALES_DATA = {
    schemaCongfig: mongooseSalesDataSchemaConfig,
    // schema: mongooseSalesDataSchema,
    model: mongoose.model('sales_data', mongooseSalesDataSchema),
}

const MONGOOSE_REGION = {
    schemaCongfig: mongooseRegionSchemaConfig,
    // schema: mongooseRegionSchema,
    model: mongoose.model('regions', mongooseRegionSchema),
}

//////////////////////////////////////////////////////////////////////////// SWITCH CASES
module.exports = {
    getMongooseConfig: function getMongooseConfig(colName) {
        switch (colName) {
            case (CONSTANTS.COL_USER_LIST):
                return MONGOOSE_USER;
            case (CONSTANTS.COL_CLIENT_LIST):
                return MONGOOSE_CLIENT;
            case (CONSTANTS.COL_PROJECT_LIST):
                return MONGOOSE_PROJECT;
            case (CONSTANTS.COL_DAILY_REPORT):
                return MONGOOSE_DAILY_REPORT;
            case (CONSTANTS.COL_SALES_DATA):
                return MONGOOSE_SALES_DATA;
            case (CONSTANTS.COL_SKU_LIST):
                return MONGOOSE_SKU;
            case (CONSTANTS.COL_CATEGORY_LIST):
                return MONGOOSE_CATEGORY
            case (CONSTANTS.COL_REGION):
                return MONGOOSE_REGION;
            case (CONSTANTS.HOMEHOME_COL_USER):
                return MONGOOSE_HOMEHOME_USER;
            case (CONSTANTS.HOMEHOME_COL_ORDER):
                return MONGOOSE_HOMEHOME_ORDER;
            case (CONSTANTS.HOMEHOME_ADDRESS):
                return MONGOOSE_HOMEHOME_ADDRESS;
            case (CONSTANTS.HOMEHOME_COL_PRODUCT):
                return MONGOOSE_HOMEHOME_PRODUCT
            case (CONSTANTS.HOMEHOME_COL_CATEGORY):
                return MONGOOSE_HOMEHOME_CATEGORY
            case (CONSTANTS.HOMEHOME_COL_STOCK):
                return MONGOOSE_HOMEHOME_STOCK
            case (CONSTANTS.HOMEHOME_COL_CATEGORY_MAP):
                return MONGOOSE_HOMEHOME_CATEGORY_MAP
            case ("test"):
                return MONGOOSE_TEST;
        }
    }

};
