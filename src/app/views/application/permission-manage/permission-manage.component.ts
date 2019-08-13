import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApiService} from '../../../common/service/api.service';
import {ZtreeComponent} from '../../../common/ztree/ztree.component';
import {$} from 'protractor';
import {DEBUG} from '@angular/compiler-cli/ngcc/src/logging/console_logger';

@Component({
  selector: 'app-permission-manage',
  templateUrl: './permission-manage.component.html',
})
export class PermissionManageComponent implements OnInit {

  constructor(public modalRef: BsModalRef, public apiService: ApiService) { }

  znodes = [];
  expStr = '';
  @ViewChild('permTree', {static: false})
  private permTree: ZtreeComponent;
  private treeId: string;

  zsetting = {
    data: {
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'parentId'
      },
      key: {
        title: 'description'
      }
    },
    check: {
      enable: true
    },
    callback: {
      onCheck: (event, treeId, treeNode) => {
        this.onCheckHandler(event, treeId, treeNode);
      }
    }
  };

  ngOnInit() {
    this.apiService.getApiInfo('http://api.xkw.com/master/v1/documentation').subscribe(response => {
      console.log(response);
      response.forEach(node => {
        node.open = true;
      });
      this.znodes = response;
    });
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

  private onCheckHandler(event, treeId, treeNode) {
    const ztree = this.permTree.ztree;
    const checkedNodes = ztree.getCheckedNodes(true);
    const expObj = this.genExpObj(checkedNodes);
    setTimeout(() => {
      this.expStr = this.expObjToString(expObj);
    });
  }

  private expObjToString(expObj) {
    let expStr = '';
    Object.keys(expObj).forEach(key => {
      expStr += key + ':' + expObj[key].join(',') + '\n';
    });
    return expStr;
  }

  private checkNodesByExp(exp) {
    const ztree = this.permTree.ztree;
    if (!ztree) {
      return;
    }
    this.treeId = ztree.treeId;

    ztree.checkAllNodes(false);
    const expObj = typeof exp === 'object' ? exp : this.parseExpObj(exp);
    if (!expObj) {
      return;
    }

    const allNodes = ztree.transformToArray(ztree.getNodes());
    const allPathNodes = allNodes.filter(function (t) {
      return t.type === 'PATH';
    });
    for (const path in expObj) {
      const pathNodes = allPathNodes.filter(t => this.antPathRequestMatch(path, expObj[path], t.path, t.method));
      pathNodes.forEach(node => {
        ztree.checkNode(node, true, true);
      });
    }
  }

  // 将权限表示式解析成obj，比如：{"/courses":["GET","POST"],"/courses/{id}":["GET"]}
  private parseExpObj(expStr) {
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
  private antPathRequestMatch(pathPattern, methodArray, realPath, realMethod) {
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

  public onInitialized() {
    this.checkNodesByExp('/areas/**:*');
  }
}
