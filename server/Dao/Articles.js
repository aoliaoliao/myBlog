module.exports = ( sequelize, DataTypes ) => {
  let Articles = sequelize.define( 'Articles', {
    id: {
      type: DataTypes.UUID, // uniqid
      defaultValue: DataTypes.UUIdV1,
      validate: {
        isUUID: 1
      },
      primaryKey: true,
      comment: '文章ID'
    },
    name: {
      type: DataTypes.STRING( 100 ),
      validate: {
        notNull: true,
        notEmpty: true,
        len: {
          args: [ 1, 50 ],
          msg: '文章名称长度为1位至50位'
        }
      },
      comment: '文章名称'
    },
    mdAddress: {
      type: DataTypes.STRING( 500 ),
      comment: '.md 文件所在的位置'
    },
    htmlAddress: {
      type: DataTypes.STRING( 500 ),
      comment: '.html / .hml 文件所在的位置'
    },
    author: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIdV1,
      validate: {
        isUUID: 1
      },
      comment: '作者，外键关联 Users 表',
    },
    types: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIdV1,
      validate: {
        isUUID: 1
      },
      comment: '类别，外键关联 Types 表'
    },
    isComment: {
      type: DataTypes.BOOLEAN,
      comment: '是否允许评论'
    }


  } )

  Articles.associate = function ( models ) {
    // models.User.hasMany(models.Task);
  };
  return Articles
}