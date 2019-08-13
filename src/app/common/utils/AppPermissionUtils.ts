export class AppPermissionUtils {

  public static expObjToString(expObj) {
    let expStr = '';
    Object.keys(expObj).forEach(key => {
      expStr += key + ':' + expObj[key].join(',') + '\n';
    });
    return expStr;
  }

  // 将权限表示式解析成obj，比如：{"/courses":["GET","POST"],"/courses/{id}":["GET"]}
  public static parseExpObj(expStr) {
    if (!expStr) {
      return;
    }

    const expObj = {};
    try {
      const lines = expStr.trim().split(/[\r\n]+/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const index = line.indexOf(':');
        const path = line.substring(0, index);
        if (!expObj.hasOwnProperty(lines[i].trim())) {
          expObj[path] = [];
        }

        const methods = line.substring(index + 1).trim().toUpperCase().split(/[,\\s]+/);
        for (let j = 0; j < methods.length; j++) {
          if (expObj[path].indexOf(methods[j]) === -1) {
            expObj[path].push(methods[j]);
          }
        }
      }
      return expObj;
    } catch (err) {
      return null;
    }
  }

  // AntPathRequestMatch的简单实现，不支持/**/在中间的pattern
  public antPathRequestMatch(pathPattern, methodArray, realPath, realMethod) {
    if (methodArray.indexOf('*') === -1 && methodArray.indexOf(realMethod) === -1) {
      return false;
    }

    if (pathPattern === '/**') {
      return true;
    }

    // pathPattern.endWith("/**")
    if (/\/\*\*$/.test(pathPattern)) {
      const len = pathPattern.length;
      if (realPath === pathPattern.substring(0, len - 3) || realPath.indexOf(pathPattern.substring(0, len - 2)) === 0) {
        return true;
      }
    }

    return pathPattern === realPath;
  }

  // 将选中的api构造成权限表达式对象
  private genExpObj(nodes) {
    // type=="PATH"才是真的的api节点
    nodes = nodes.filter(function (t) {
      return t.type === 'PATH';
    });
    const expObj = {};
    nodes.forEach(node => {
      if (!expObj.hasOwnProperty(node.path)) {
        expObj[node.path] = [];
      }
      if (expObj[node.path].indexOf(node.method) === -1) {
        expObj[node.path].push(node.method);
      }
    });

    return expObj;
  }
}
