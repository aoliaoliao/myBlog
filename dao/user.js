const Sequelize = require( 'sequelize' )

module.exports = ( sequelize, DataTypes ) => {
  let User = sequelize.define( 'User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIdV1,
      comment: '用户ID，主键',
      primaryKey: true
    },
    nickName: {
      type: DataTypes.STRING( 50 ),
      validate: {
        len: {
          args: [ 2, 10 ],
          msg: '用户名称在2到10位字符之间'
        }
      },
      comment: '用户姓名'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/,
          msg: '密码长度不少于9位，必须包含字母和数字'
        },
        comment: '密码'
      }
    },
    avatar: {
      type: DataTypes.STRING,
      comment: '头像'
    },
    signature: {
      type: DataTypes.STRING,
      comment: '个性签名'
    },
    description: {
      type: DataTypes.STRING( 1000 ),
      comment: '个人描述'
    },
    highest: {
      type: DataTypes.ENUM( '0', '99' ),
      comment: '权限范围，99表示最高权限'
    },
    userHome: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        isIP: true,
      },
      comment: '用户的个人主页'
    },
    isLoginIn: {
      type: DataTypes.BOOLEAN,
      comment: '是否注册过'
    },
    linkedEMail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      comment: '关联邮箱'
    },

  } )

  User.associate = function ( models ) {
    // models.User.hasMany(models.Task);
  };
  return User
}