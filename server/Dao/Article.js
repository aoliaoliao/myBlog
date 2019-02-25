module.exports = (sequelize, DataTypes) => {
    let Article = sequelize.define('Article', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            comment: '动态ID，主键',
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            comment: '文章名称'
        },
        summary: {
            type: DataTypes.STRING(500),
            comment: '文章简介'
        },
        summaryImage: {
            type: DataTypes.STRING(200),
            comment: '文章简介的配图'
        },
        articleAddress: {
            type: DataTypes.STRING(500),
            allowNull: false,
            comment: '上传文件存储的位置，不允许为空'
        },
        mdAddress: {
            type: DataTypes.STRING(500),
            comment: '.md 文件所在的位置'
        },
        htmlAddress: {
            type: DataTypes.STRING(500),
            comment: '.html / .htm 文件所在的位置'
        },
        author: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '作者，外键关联 Users 表',
        },
        isPrivate: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '是否私有，1：私有，0：非私有'
        },
        isComment: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '是否允许评论，1：允许，0：不允许'
        },
    }, {
        freezeTableName: true
    })

    Article.associate = function(models) {
        models.Article.belongsTo(models.User, { foreignKey: 'author', as: 'articleAuthor' })
        models.Article.hasMany(models.Comment, { foreignKey: 'articleId', as: 'articleComments' })
    };
    return Article
}