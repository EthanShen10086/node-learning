const { Controller } = require("egg");
const BusinessError = require("../../common/exception/businessError");

// class BaseController extends Controller {
class BaseController {
  /**获取登录用户对象*/
  get user() {
    return this.ctx.session.userInfo;
  }

  /**成功信息封装*/
  success(data) {
    this.ctx.body = {
      type: 0,
      code: "0",
      msg: "SUCCESS",
      data,
    };
    this.ctx.status = 200;
  }

  /**失败信息封装*/
  fail(result) {
    this.ctx.body = {
      type: -1,
      code: result.code,
      msg: result.msg,
    };
    this.ctx.status = 500;
  }

  /**异常处理日志打印及返回结果统一封装,适用于页面级请求*/
  handleError(error, ConstError) {
    if (error instanceof BusinessError) {
      this.ctx.hikLogger.error(error);
    } else {
      error.code = ConstError[0];
      if (!error.message) {
        error.message = ConstError[1];
      }
      this.ctx.hikLogger.error(error);
    }
    this.fail({ code: `${error.code}`, msg: `${error.message}` });
  }

  /**异常处理日志打印及返回结果统一封装,适用于rest接口*/
  throwError(error, ConstError) {
    if (error instanceof BusinessError) {
      throw error;
    } else {
      ConstError[1] = error.message || ConstError[1];
      throw new BusinessError(ConstError);
    }
  }

  /**
   *  操作日志规范
   * @author caoyunfei
   * @date 2018/12/11 15:05
   * @param moduleId 所属模块
   * @param objectType 所属对象
   * @param objectName 所属对象name
   * @param action 操作动作
   * @param actionDetail 操作内容，支持多语言时，填写操作变量的数组。变量类型支持字符串、数字、布尔值。eg："["dac","dms"]"
   * @param actionMessageId 操作内容标识,标识的多语言内容支持占位符，采用%1,%2,%n形式，
   * n表示第n个参数,占位符的值从actionDetail按位置取  如actionDetail的数组为["resourceType","indexCode"] actionMessageId的国际化的value为"修改经纬度,资源类型为1%,indexCode为2%",程序安装后的日志内容则为:
   * 修改经纬度,资源类型为resourceType,编号为indexCode
   * @param result 返回结果 1表示成功，0表示失败，2表示部分成功 actionMultiLang：是否支持多语言，0不支持/1支持；该项缺省，表示不支持多语言
   * actionMultiLang 支持多语言，1表示支持 0不支持
   * terminalType：用户登录的终端标识，0表示web组件，1表示C/S客户端，2表示移动客户端；操作者为系统内部任务时，固定为3（表示系统内部）
   * @return
   */
  operateLog({
    moduleId,
    objectType,
    objectName,
    action,
    actionDetail,
    actionMessageId,
    result,
  }) {
    const { app, ctx } = this;
    const operateLog = app.hikOperatelog.get(ctx);
    if (operateLog) {
      operateLog
        .setModuleId(moduleId)
        .setObjectType(objectType)
        .setObjectName(objectName)
        .setAction(action)
        .setActionDetail(JSON.stringify(actionDetail) || "")
        .setActionMessageId(actionMessageId)
        .setActionMultiLang("1")
        .setTerminalType("0")
        .setResult(result || "")
        .setUserId(this.user.userIndexCode)
        .setUserName(this.user.username);
    }
  }
}
module.exports = BaseController;
