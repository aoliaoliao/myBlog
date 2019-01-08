module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            comment: '动态ID，主键',
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '关联的用户ID',
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '关联用户的昵称'
        },
        articleId: {
            type: DataTypes.UUID,
            comment: '关联的文章ID',
        },
        momentId: {
            type: DataTypes.UUID,
            comment: '关联的动态ID',
        },
        parentCommentId: {
            type: DataTypes.UUID,
            comment: '父评论ID'
        },
        text: {
            type: DataTypes.STRING(200),
            comment: 'Comment的具体内容'
        },
    }, {
        freezeTableName: true
    })

    Comment.associate = function(models) {
        models.Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'commentAuthor'
        })
    };
    return Comment
}