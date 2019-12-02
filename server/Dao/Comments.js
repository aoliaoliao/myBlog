module.exports = (sequelize, DataTypes) => {
    let Comments = sequelize.define('Comments', {
        id: {
            type: DataTypes.CHAR(18),
            comment: '评论的ID，主键',
            primaryKey: true
        },
        userId: {
            type: DataTypes.CHAR(18),
            allowNull: false,
            comment: '关联的用户ID',
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '关联用户的昵称'
        },
        articleId: {
            type: DataTypes.CHAR(18),
            comment: '关联的文章ID',
        },
        momentId: {
            type: DataTypes.CHAR(18),
            comment: '关联的动态ID',
        },
        parentCommentId: {
            type: DataTypes.CHAR(18),
            comment: '父评论ID'
        },
        text: {
            type: DataTypes.STRING(200),
            comment: 'Comment的具体内容'
        },
    }, {
        freezeTableName: true
    })

    Comments.associate = function(models) {
        models.Comments.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'commentAuthor'
        })
    };
    return Comments
}