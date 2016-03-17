/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,r,t,n){var o,c=arguments.length,s=3>c?r:null===n?n=Object.getOwnPropertyDescriptor(r,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,r,t,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>c?o(s):c>3?o(r,t,s):o(r,t))||s);return c>3&&s&&Object.defineProperty(r,t,s),s},__param=this&&this.__param||function(e,r){return function(t,n){r(t,n,e)}};define("vs/workbench/parts/output/common/outputWorker",["require","exports","vs/base/common/winjs.base","vs/platform/markers/common/markers","vs/editor/common/services/resourceService","vs/base/common/strings","vs/base/common/arrays","vs/base/common/paths","vs/editor/common/core/range","vs/platform/workspace/common/workspace"],function(e,r,t,n,o,c,s,a,i,u){"use strict";var p=function(){function e(r,t,n,o,c){this._modeId=r,this.resourceService=n,this.markerService=o,this._contextService=c;var s=this._contextService.getWorkspace();this.patterns=s?e.createPatterns(s):[]}return Object.defineProperty(e.prototype,"contextService",{get:function(){return this._contextService},enumerable:!0,configurable:!0}),e.prototype.computeLinks=function(r){var n=[];if(!this.patterns.length)return t.TPromise.as(n);for(var o=this.resourceService.get(r),c=1,s=o.getLineCount();s>=c;c++)n.push.apply(n,e.detectLinks(o.getLineContent(c),c,this.patterns,this._contextService));return t.TPromise.as(n)},e.createPatterns=function(e){var r=[],t=s.distinct([a.normalize(e.resource.fsPath,!0),a.normalize(e.resource.fsPath,!1)]);return t.forEach(function(e){r.push(new RegExp(c.escapeRegExpCharacters(e)+"(\\S*) on line ((\\d+)(, column (\\d+))?)","gi")),r.push(new RegExp(c.escapeRegExpCharacters(e)+"(\\S*):line ((\\d+)(, column (\\d+))?)","gi")),r.push(new RegExp(c.escapeRegExpCharacters(e)+"([^\\s\\(\\)]*)(\\s?\\((\\d+)(,(\\d+))?)\\)","gi")),r.push(new RegExp(c.escapeRegExpCharacters(e)+"([^:\\s\\(\\)<>'\"\\[\\]]*)(:(\\d+))?(:(\\d+))?","gi"))}),r},e.detectLinks=function(e,r,t,n){var o=[];return t.forEach(function(t){t.lastIndex=0;for(var s,a=0;null!==(s=t.exec(e));){var u=c.replaceAll(c.rtrim(s[1],"."),"\\","/"),p=void 0;try{p=n.toResource(u).toString()}catch(m){continue}if(s[3]){var f=s[3];if(s[5]){var h=s[5];p=c.format("{0}#{1},{2}",p,f,h)}else p=c.format("{0}#{1}",p,f)}var v=c.rtrim(s[0],"."),g=e.indexOf(v,a);a+=g+v.length;var l={startColumn:g+1,startLineNumber:r,endColumn:g+1+v.length,endLineNumber:r};if(o.some(function(e){return i.Range.areIntersectingOrTouching(e.range,l)}))return;o.push({range:l,url:p})}}),o},e=__decorate([__param(2,o.IResourceService),__param(3,n.IMarkerService),__param(4,u.IWorkspaceContextService)],e)}();r.OutputWorker=p});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f291f4ad600767626b24a4b15816b04bee9a3049/vs\workbench\parts\output\common\outputWorker.js.map
