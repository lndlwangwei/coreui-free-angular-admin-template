import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApiService} from '../../../common/service/api.service';
import {ZtreeComponent} from '../../../common/ztree/ztree.component';
import {$} from 'protractor';
import {DEBUG} from '@angular/compiler-cli/ngcc/src/logging/console_logger';
import {AppPermissionUtils} from '../../../common/utils/AppPermissionUtils';
import {AlertService} from '../../../common/alert/alert.service';
import {ApiGroupService} from '../../../common/service/api-group.service';

@Component({
  selector: 'app-permission-manage',
  templateUrl: './permission-manage.component.html',
})
export class PermissionManageComponent implements OnInit {

  constructor(public modalRef: BsModalRef, public apiService: ApiService,
            public apiGroupService: ApiGroupService, public alertService: AlertService) { }

  apiGroup: any;

  public isConfirmed = false;

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
    this.apiService.getApiInfo(`${this.apiGroup.url}/documentation`).subscribe(response => {
      console.log(response);
      response.forEach(node => {
        node.open = true;
      });
      this.znodes = response;
    });
  }

  private onCheckHandler(event, treeId, treeNode) {
    const ztree = this.permTree.ztree;
    const checkedNodes = ztree.getCheckedNodes(true);
    const expObj = AppPermissionUtils.genExpObj(checkedNodes);
    setTimeout(() => {
      this.expStr = AppPermissionUtils.expObjToString(expObj);
    });
  }

  private checkNodesByExp(exp) {
    const ztree = this.permTree.ztree;
    if (!ztree) {
      return;
    }
    this.treeId = ztree.treeId;

    ztree.checkAllNodes(false);
    const expObj = typeof exp === 'object' ? exp : AppPermissionUtils.parseExpObj(exp);
    if (!expObj) {
      return;
    }

    const allNodes = ztree.transformToArray(ztree.getNodes());
    const allPathNodes = allNodes.filter(function (t) {
      return t.type === 'PATH';
    });
    for (const path in expObj) {
      const pathNodes = allPathNodes.filter(t => AppPermissionUtils.antPathRequestMatch(path, expObj[path], t.path, t.method));
      pathNodes.forEach(node => {
        ztree.checkNode(node, true, true);
      });
    }
  }

  public onInitialized() {
    this.apiGroupService.getAppPermission(this.apiGroup.id).subscribe(response => {
      if (response) {
        this.expStr = response.map(p => p.permission).join('\n');
        this.checkNodesByExp(this.expStr);
      }
    });
  }

  public save() {
    this.apiGroupService.updateAppPermission(this.apiGroup.id, this.expStr.split('\n')).subscribe(response => {
      this.alertService.alertInfo('保存成功！');
      this.isConfirmed = true;
      this.modalRef.hide();
    });
  }
}
