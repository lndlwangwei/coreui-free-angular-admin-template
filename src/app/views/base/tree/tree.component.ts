import { Component, OnInit } from '@angular/core';
import {KEYS, TREE_ACTIONS} from 'angular-tree-component';

@Component({
  selector: 'app-tree',
  // templateUrl: './tree.component.html',
  template: '<tree-root [nodes]="nodes" [options]="options"></tree-root>'
})
export class TreeComponent implements OnInit {

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) { TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event); }
        },
        click: (tree, node, $event) => {
          console.log(node.data.name);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

  private onclick() {
    console.log('asdfasdfasdf');
  }
}
