import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getSwaggerInfo(url) {
    return this.http.get(url);
  }

  private toPathNode(id, name, path, method, parentId, type, description) {
    const node: any = {};
    node.id = id;
    node.name = name;
    node.path = path;
    node.method = method;
    node.parentId = parentId;
    node.type = type;
    node.description = description;
    return node;
  }

  private resolvePathNodes(swaggerInfo) {
    const tags = swaggerInfo.tags.sort(function (a, b) {
      const aNo = parseInt(a.name);
      const bNo = parseInt(b.name);
      return aNo - bNo;
    });

    let id = 1;
    const tagNodes = [];
    // 根节点
    tagNodes.push(this.toPathNode(id++, swaggerInfo.info.title, null, null, null, 'ROOT',
      swaggerInfo.info.description.replace(/<br\s*\/?>/g, '\n')));
    for (let i = 0; i < tags.length; i++) {
      const t = tags[i];
      tagNodes.push(this.toPathNode(id++, t.name, null, null, 1, 'TAG', t.description.replace(/<br\s*\/?>/g, '\n')));
    }

    // 解析json格式："paths":
    // {
    //   "/applications":
    //   {
    //      "get":  { "tags": ["14-应用"], "summary": "getApplications", "description": "获取应用列表"},
    //      "post": {}
    //   }
    // }
    const pathNodes = [];
    for (const pathKey in swaggerInfo.paths) {
      const pathValue = swaggerInfo.paths[pathKey];
      for (const httpMethodKey in pathValue) {
        const httpMethodValue = pathValue[httpMethodKey];
        for (let k = 0; k < httpMethodValue.tags.length; k++) {
          const parent = tagNodes.find(function (iTagNode) {
            return iTagNode.name === httpMethodValue.tags[k];
          });
          pathNodes.push(this.toPathNode(id++, httpMethodValue.summary, pathKey, httpMethodKey.toUpperCase(), parent.id, 'PATH',
            httpMethodValue.description.replace(/<br\s*\/?>/g, '\n')));
        }
      }
    }
    // 把tag名称前面的序号去掉，比如 "1-应用"
    tagNodes.forEach(item => {
      item.name = item.name.substring(item.name.indexOf('-') + 1);
    });

    return tagNodes.concat(pathNodes);
  }

  public getApiInfo(url: string): Observable<any> {
    return this.http.get(url).pipe(map(swaggerInfo => this.resolvePathNodes(swaggerInfo)));
  }
}
