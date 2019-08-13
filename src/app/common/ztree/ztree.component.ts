import {
  Component, ElementRef, Input, Output,
  EventEmitter, OnInit
} from '@angular/core';
declare var $: any;
import 'ztree';
import 'ztree/js/jquery.ztree.exhide.min.js';
import set = Reflect.set;

@Component({
    selector: 'app-ztree',
    template: '<ul class="ztree"></ul>'
})
export class ZtreeComponent implements OnInit {

    constructor(public el: ElementRef) {
    }

    public ztree: any = null;
    public ztreeId: string;
    private _zNodes: any;
    // 默认配置
    private _setting: any;

    @Input('zNodes')
    set zNodes(zNodes: any) {
        this._zNodes = zNodes;
        this.initTree();
    }

    get zNodes() {
        return this._zNodes;
    }

    @Input('setting')
    set setting(setting: any) {
      this._setting = setting;
    }

    @Output()
    onInitialized = new EventEmitter<boolean>();

    ngOnInit(): void {
      this.initTree();
    }

    initTree() {
        const $tree = $(this.el.nativeElement.firstElementChild);
        this.ztreeId = 'rbm_tree_' + Math.floor(Math.random() * 1000000);
        $tree.attr('id', this.ztreeId);
        this.ztree = $.fn.zTree.init($tree, this._setting, this.zNodes);
        if (this.ztree.getNodes().length > 0) {
            this.onInitialized.emit(true);
        }
    }

}
